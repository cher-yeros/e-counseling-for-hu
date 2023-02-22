const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth-controller");

router.post("/login/student", AuthController.login); // http://localhost:5000/v1/api/login/student
router.post("/login/counselor", AuthController.counselorLogin);
router.post("/login/admin", AuthController.adminLogin);

router.post("/register/student", AuthController.studentRegister); // http://localhost:5000/v1/api/register/student
router.post("/register/counselor", AuthController.counselorRegister);

module.exports = router;
