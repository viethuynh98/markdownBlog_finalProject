const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const UserProfile = require("../models/UserProfile");

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newUserProfile = new UserProfile(req.body);
    const savedUserProfile = await newUserProfile.save();
    res.status(200).json(savedUserProfile);
  } catch (err) {
    res.status(200).json(err);
  }
});

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await UserProfile.findByIdAndDelete(req.params.id);
    res.status(200).json("Profile has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER POSTS
router.get("/:userId", async (req, res) => {
  try {
    const userProfile = await UserProfile.find({ userId: req.params.userId });
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
