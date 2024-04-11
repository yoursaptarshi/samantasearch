const express = require("express");

const router = express.Router();
const {crawler} = require("../controllers/crawler");
const {searchresults} =require("../controllers/searchresults")
router.route("/crawl").post(crawler);
router.route("/search").post(searchresults);
module.exports = router;