const express = require("express")
const {createMembership,allMemberships, buyMembership, check_membership_level, updateMembership} = require("../controllers/memberships")
const {isAuthenticated,isAdmin}=require("../middleware/auth")
const cors = require('cors');
const router =express.Router();

router.route("/create-memberships").post(isAdmin,createMembership)
router.route("/all-memberships").get(isAuthenticated,allMemberships)

router.route("/buy-membership").post(isAuthenticated,buyMembership)
router.route("/check-membership-level").get(isAuthenticated,check_membership_level)
router.route("/update-membership").post(updateMembership)
module.exports = router