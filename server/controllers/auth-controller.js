const { HUStudent, Counselor, Admin, Student } = require("../models/schema");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const key = "key";

module.exports = {
  async login(req, res) {
    try {
      const student = await HUStudent.findOne({
        where: {
          // studentId: req.body.studentId,
          id: req.body.studentId,
        },
        include: [Counselor],
      });
      console.log(student);

      if (!student) {
        res.status(200).send({
          success: false,
          message: "No student have this ID!",
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          student.password
        );

        if (passwordMatch) {
          const token = await jwt.sign({ student }, process.env.SECRET_KEY);

          const user = { ...student.dataValues, token: token, role: "student" };

          res.status(200).send({
            success: true,
            user,
          });
        } else {
          res.send({
            success: false,
            message: "Please enter correct password!",
          });
        }
      }
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  },
  async counselorLogin(req, res) {
    const body = req.body;
    const counselor = await Counselor.findAll({
      raw: true,
      where: {
        email: body.email,
      },
      include: [HUStudent],
    });

    const c = await Counselor.findOne({
      where: {
        email: body.email,
      },
      include: [HUStudent],
    });

    console.log(c);

    if (!counselor.length)
      return res.status(400).send({
        success: "false",
        message: "Invalid Email or password.",
      });
    const validPassword = await bcrypt.compare(
      body.password,
      counselor[0].password
    );
    if (!validPassword)
      return res.status(400).send({
        success: "false",
        message: "Invalid Email or password.",
      });

    const token = jwt.sign(
      { Id: counselor[0].id, Name: counselor[0].fullName, role: "True" },
      key
    );

    const user = {
      ...counselor[0],
      token: token,
      role: "counselor",
    };

    console.log(counselor[0]);

    console.log(user);
    res.send({
      success: true,
      user: user,
    });
  },
  ///////////////////////////////////////////
  async adminLogin(req, res) {
    const body = req.body;
    const admin = await Admin.findAll({
      raw: true,
      where: {
        email: body.email,
      },
    });

    if (!admin.length)
      return res.status(400).send({
        success: "false",
        message: "Invalid Email or password.",
      });
    console.log(body.password);
    const validPassword = await bcrypt.compare(
      body.password,
      admin[0].password
    );
    if (!validPassword)
      return res.status(400).send({
        success: "false",
        message: "Invalid Email or password.",
      });

    const token = jwt.sign(
      { Id: admin[0].id, Name: admin[0].fullName, role: "True" },
      key
    );

    const user = { ...admin[0], token: token, role: "admin" };
    console.log(admin[0]);

    res.send({
      success: true,
      user: user,
    });
  },
  ///////////////////
  async studentRegister(req, res) {
    // all requests on req.body
    try {
      const body = req.body;

      const Email = await Student.findAll({
        raw: true,
        where: {
          email: body.email,
        },
      });

      if (Email.length) return res.status(400).send("Email already taken");

      const PhoneNumber = await Student.findAll({
        raw: true,
        where: {
          phone: body.phone,
        },
      });

      if (PhoneNumber.length)
        return res.status(400).send("Phone Number already taken");

      try {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);

        const student = await Student.create(body);

        return res.status(200).send({
          success: true,
          user: _.pick(student.dataValues, [
            "id",
            "fullName",
            "email",
            "createdAt",
          ]),
        });
      } catch (err) {
        // console.log(err);
        return res.status(200).send("error");
      }
    } catch (err) {
      // console.log(err);
      return res.status(200).send("error");
    }
  },
  ///////////////////////////////////
  async counselorRegister(req, res) {
    try {
      const body = req.body;
      const Email = await Counselor.findAll({
        raw: true,
        where: {
          email: body.email,
        },
      });
      if (Email.length) return res.status(400).send("Email already taken");

      const PhoneNumber = await Counselor.findAll({
        raw: true,
        where: {
          phone: body.phone,
        },
      });
      if (PhoneNumber.length)
        return res.status(400).send("PhoneNumber already taken");

      try {
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        const buyer = await Counselor.create(body);
        return res
          .status(200)
          .send(
            _.pick(buyer.dataValues, ["id", "fullName", "email", "createdAt"])
          );
      } catch (err) {
        console.log(err);
        return res.status(200).send("error");
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("error");
    }
  },
};
