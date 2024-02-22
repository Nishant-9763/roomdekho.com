const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    propertyType: { type: String },
    availableFor: { type: String },
    acAvailable: { type: Boolean, default: false },
    fanAvailable: { type: Boolean, default: false },
    geyserAvailable: { type: Boolean, default: false },
    description: { type: String },
    selectedImages: [String],
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ownerData = mongoose.model("ownerData", ownerSchema);

module.exports = ownerData;
