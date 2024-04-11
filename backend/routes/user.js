const express = require("express");
const {register,login,me,logout,allusers,updateName,updateUsername,uploadPhoto} = require ("../controllers/user");

const {isAuthenticated,isAdmin}=require("../middleware/auth")

const router = express.Router();

router.route("/register").post(register);
router.route("/signin").post(login);
router.route("/me").get(isAuthenticated,me);
router.route("/logout").get(isAuthenticated,logout);
router.route("/update/name").post(isAuthenticated,updateName);
router.route("/update/username").post(isAuthenticated,updateUsername);
router.route("/upload").post(isAuthenticated,uploadPhoto);
//admin routes
router.route("/allusers").get(isAdmin,allusers);

module.exports = router;