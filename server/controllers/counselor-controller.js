const { v4: uuidv4 } = require("uuid");
const {
  Case,
  Student,
  Appointment,
  Posts,
  User,
  Counselor,
  HUStudent,
} = require("../models/schema");

module.exports = {
  async addCase(req, res) {
    try {
      req.body.CounselorId = req.user.Id;
      const studCase = await Case.create(req.body);

      res.send({
        success: true,
        message: studCase,
      });
    } catch (err) {
      console.log(err);
      res.send({
        success: false,
        message: "error",
      });
    }
  },

  async getStudents(req, res) {
    try {
      const student = await Student.findAll({
        where: {
          CounselorId: req.user.Id,
        },
      });

      res.send(student);
    } catch (err) {
      console.log(err);
      res.send("err");
    }
  },
  async getUser(req, res) {
    try {
      const user = await User.findAll();

      res.send(user);
    } catch (err) {
      console.log(err);
      res.send("err");
    }
  },

  async postDocument(req, res) {
    try {
      const filename = `${uuidv4()}.${req.files.image.mimetype.split("/")[1]}`;

      req.files.image.mv("public/" + filename, function (err) {
        if (err) {
          return res.send(err);
        }
      });
      req.body.image = filename;
      const post = await Posts.create(req.body);

      res.send(post);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },

  async viewAppointment(req, res) {
    try {
      const appointment = await Appointment.findAll({
        where: {
          Counselorid: req.params.id,
        },
        include: [HUStudent],
      });

      res.send(appointment);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },
  //////////////////////////////////////
  async getProfile(req, res) {
    try {
      const counselor = await Counselor.findOne({
        where: {
          id: req.user.Id,
        },
      });

      res.send(counselor);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },

  //////////////////////////////////////
  async editProfile(req, res) {
    try {
      const counselor = await Counselor.update(req.body, {
        where: {
          id: req.user.Id,
        },
      });

      res.send({ success: true });
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },

  async getPosts(req, res) {
    try {
      const posts = await Posts.findAll({
        where: {
          CounselorId: req.params.id,
          //approved: true,
        },
      });

      res.send(posts);
    } catch (err) {
      console.log(err);
      res.send("err");
    }
  },
  async getMyStudents(req, res) {
    const students = await HUStudent.findAll({
      where: {
        CounselorId: req.params.id,
      },
    });

    res.send({
      success: true,
      students,
    });
  },
};
