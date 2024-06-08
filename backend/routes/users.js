const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");
// const verifyToken = require("../verifyToken");

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      // decode password to compare
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // send user_doc bang json
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // delete user
    await User.findByIdAndDelete(req.params.id);
    // delete all user's post
    await Post.deleteMany({ userId: req.params.id });
    // delete all user's comment
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // hide password
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
