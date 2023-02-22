const { Op, EmptyResultError } = require("sequelize");
const {
  Counselor,
  Case,
  Posts,
  HUStudent,
  HUCounselor,
} = require("../models/schema");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports = {
  async getCounselors(req, res) {
    try {
      const counselors = await Counselor.findAll({
        include: [HUStudent, Posts],
      });

      res.send(counselors);
    } catch (err) {
      console.log(err);
      res.send("error");
    }
  },
  async addCounselor(req, res) {
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
            _.pick(buyer.dataValues, [
              "counselorId",
              "fullName",
              "email",
              "createdAt",
            ])
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
  async deleteCounselor(req, res) {
    console.log(2, "di");
    const deleted = await Counselor.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({ success: true });
  },
  async updateCouselor(req, res) {
    const updated = await Counselor.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  },
  async approveCase(req, res) {
    const approved = await Case.update(
      { approved: true },
      {
        where: {
          id: req.body.caseId,
        },
      }
    );

    res.send({
      success: true,
    });
  },
  async approvePost(req, res) {
    const { id, action } = req.body;

    const approved = await Posts.update(
      { approved: true },
      {
        where: {
          id: req.body.postId,
        },
      }
    );

    res.send({
      success: true,
    });
  },
  async getPosts(req, res) {
    try {
      const posts = await Posts.findAll({
        include: [Counselor],
      });

      res.send(posts);
    } catch (err) {
      console.log(err);
      res.send("err");
    }
  },
  async assignCounselor(req, res) {
    const noOfStudent = await HUStudent.count({
      where: {
        CounselorId: req.body.cId,
      },
    });

    if (noOfStudent > 10) {
      res.send({
        success: false,
        message: "Please Choose another counselor the number is full!",
      });
    } else {
      const assigned = await HUStudent.update(
        { CounselorId: req.body.cId },
        {
          where: {
            id: req.body.sId,
          },
        }
      );

      const counselor = await Counselor.findOne({
        where: {
          id: req.body.cId,
        },
      });

      res.send({
        success: assigned[0],
        counselor,
      });
    }
  },
  async getCounts(req, res) {
    const approvedPosts = await Posts.count({
      where: {
        approved: true,
      },
    });

    const unApprovedPosts = await Posts.count({
      where: {
        approved: false,
      },
    });

    const counselors = await Counselor.count();

    const students = await HUStudent.count({
      where: {
        CounselorId: {
          [Op.not]: null,
        },
      },
    });

    res.send({
      approvedPosts,
      unApprovedPosts,
      counselors,
      students,
    });
  },
};
