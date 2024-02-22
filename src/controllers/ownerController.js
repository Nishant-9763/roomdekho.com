const ownerModel = require("../models/ownerModel");
const cloudinary = require("cloudinary").v2;
// const axios = require("axios");

// sms service //
// const apiKey = process.env.API_KEY_FAST2SMS;
// const sendOtpUrl = process.env.OTPURL;
// Configuration  of "Cloudinary" //
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storeOwner = async function (req, res) {
  try {
    const cloudinaryUploadPromises = req.files.map(async (file) => {
      if (!file) {
        return null;
      }

      const cloudinaryUploadResult = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
          folder: "roomDekho/owners/property/photos",
          public_id: `propertyImg_${Date.now()}`,
        }
      );

      return cloudinaryUploadResult;
    });

    const cloudinaryResponses = await Promise.all(cloudinaryUploadPromises);
    // console.log("Cloudinary responses:", cloudinaryResponses);

    const cloudinaryUrls = cloudinaryResponses.map(
      (response) => response.secure_url
    );

    const userData = req.body;
    userData.selectedImages = cloudinaryUrls;
    const savedData = await ownerModel.create(userData);

    res.status(201).send({ status: true, data: savedData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

const getOwners = async function (req, res) {
  try {
    let findData = await ownerModel.find();
    if (findData.length == 0) {
      return res.status(404).send({ status: false, error: "No data found" });
    }
    return res.status(200).send({ status: true, data: findData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const getOwner = async function (req, res) {
  try {
    let findData = await ownerModel.findOne({ _id: req.params.id });
    if (Object.keys(findData).length === 0) {
      return res.status(404).send({ status: false, error: "No data found" });
    }
    return res.status(200).send({ status: true, data: findData });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};



module.exports.storeOwner = storeOwner;
module.exports.getOwners = getOwners;
module.exports.getOwner = getOwner;
