const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chat-controller");
// send text
// recieve text
router.post("/send", ChatController.sendText);
router.post("/get-chats", ChatController.getChats);

module.exports = router;
