const express = require("express");
const router = express.Router();

const CounselorController = require("../controllers/counselor-controller");
const auth = require("../middlewares/auth-controller");
//addCase
//viewUser
//postDocument
//viewAppointment

router.post("/addCase", CounselorController.addCase);
router.get("/get-students", CounselorController.getStudents);
router.get("/get-user", CounselorController.getUser);
router.get("/view-appointment/:id", CounselorController.viewAppointment);
router.get("/get-profile", CounselorController.getProfile);
router.post("/post-document", CounselorController.postDocument);
router.post("/edit-profile", CounselorController.editProfile);
router.get("/get-posts/:id", CounselorController.getPosts);
router.get("/my-students/:id", CounselorController.getMyStudents);
// router.get("/viewUser",auth, CounselorController.ViewUser);
// router.post("/postDocument",auth, CounselorController.PostDocument);
// router.get("/viewAppointment",auth, CounselorController.ViewAppointment);

module.exports = router;
