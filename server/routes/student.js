const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth-controller");
const studentController = require("../controllers/student-controller");
// setAppointment
//chat
//chooseCounselor
//chooseCounselor
router.post(
  "/chooseCounselor/:counselorId",
  auth,
  studentController.chooseCounselor
);
router.post("/setAppointment", studentController.setAppointment);
// router.post("/chat", auth, setAppointment.chat);
router.post("/select-Type", studentController.selectType);
router.get("/my-counselor/:sId", studentController.getMyCounselor);
router.get("/approved-posts", studentController.getApprovedPosts);

module.exports = router;
