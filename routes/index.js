const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

const upload = require("../middleware/upload");

router.get("/properties/newProperty", homeController.newPropertyForm);
router.post(
  "/properties/newProperty",
  upload.single("image"),
  homeController.createProperty
);

router.get("/about", homeController.getAbout);

router.get("/", homeController.getHome);
router.get("/properties", homeController.getHome);
router.get("/properties/home/:id", homeController.home);
router.post("/properties/:id/delete", homeController.deleteProperty);

router.get("/properties/:id/edit", homeController.editPropertyForm);

router.post("/properties/:id/edit", homeController.updateProperty);

router.post(
  "/properties/:id/replace-image",
  upload.single("image"),
  homeController.replaceImage
);

router.post("/properties/:id/delete-image", homeController.deleteImage);

module.exports = router;
