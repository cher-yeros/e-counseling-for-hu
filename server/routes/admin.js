const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth-controller");
const AdminController = require("../controllers/admin-controller");

//manage counselor
//approve-post
//approve case
//
router.post("/add-counselor", AdminController.addCounselor);
router.get("/counselors", AdminController.getCounselors);
router.get("/get-posts", AdminController.getPosts);
router.post("/delete-counselor/:id", AdminController.deleteCounselor);
router.put("/update-counselor", AdminController.updateCouselor);
router.get("/counselors", AdminController.getCounselors);
router.post("/approve-post", AdminController.approvePost);
router.post("/assign-counselor", AdminController.assignCounselor);
router.get("/counts", AdminController.getCounts);

module.exports = router;
