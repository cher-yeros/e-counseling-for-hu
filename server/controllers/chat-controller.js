const { Chat } = require("../models/schema");

module.exports = {
  async sendText(req, res) {
    const send = await Chat.create(req.body);
  },
  async getChats(req, res) {
    const chats = await Chat.findAll({
      where: {
        CounselorId: req.body.cId,
        HUStudentId: req.body.sId,
      },
    });

    res.send({
      success: true,
      chats,
    });
  },
};
