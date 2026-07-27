const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/home/:id", homeController.home);

router.get("/add", homeController.getAbout);

router.get("/about", homeController.getAbout);

router.get("/", homeController.getHome);

module.exports = router;
