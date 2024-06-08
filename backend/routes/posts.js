const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
// const verifyToken = require("../verifyToken");

// CREATE
router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(res.body);
    const savedPost = await newPost.save();
    res.status(200).json(savesPost);
  } catch (err) {
    res.status(200).json(err);
  }
});
