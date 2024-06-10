const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      required: false,
    },
    skills: {
      type: Array,
      required: false,
    },
    interests: {
      type: Array,
      required: false,
    },
    educations: {
      type: Array,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
