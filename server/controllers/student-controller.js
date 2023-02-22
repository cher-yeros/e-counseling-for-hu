const models = require("../models/schema");

module.exports = {
  async chooseCounselor(req, res) {
    try {
      await models.Student.update(
        {
          CounselorId: req.params.counselorId,
        },
        {
          where: {
            id: req.user.Id,
          },
        }
      );
      return res.status(200).send({
        success: true,
        message: "counselor selected",
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: "error",
      });
    }
  },
  async selectType(req, res) {},
  async setAppointment(req, res) {
    try {
      const Appointment = await models.Appointment.create(req.body);

      return res.status(200).send({
        success: true,
        message: Appointment,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        success: false,
        message: "error",
      });
    }
  },

  async getMyCounselor(req, res) {
    const student = await models.HUStudent.findOne({
      where: {
        id: req.params.sId,
      },
    });

    if (!student.CounselorId) {
      res.send({
        success: false,
        message: "Please Select Counselor First!",
      });
    } else {
      const counselor = await models.Counselor.findOne({
        where: {
          id: student.CounselorId,
        },
      });
      res.send({ success: true, counselor });
    }
  },
  async getApprovedPosts(req, res) {
    const posts = await models.Posts.findAll({
      where: {
        approved: true,
      },
    });

    res.send(posts);
  },
};
