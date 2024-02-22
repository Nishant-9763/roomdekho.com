const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const ownerController = require("../controllers/ownerController");

// router.post("/loginUser", ownerController.loginUser);
// router.post("/requestOtp", ownerController.requestOtp);
// router.post("/verifyOtp", ownerController.verifyOtp);

router.get("/owners/:id", ownerController.getOwner);
router.post("/owners",upload.any(), ownerController.storeOwner);
router.get("/owners", ownerController.getOwners);
// router.patch("/onwers/:id", ownerController.updateOwner);

module.exports = router;
