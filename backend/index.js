const express = require("express");
const app = express();
const mongoose = require("mongoose");
// save confidential data with dotenv
const dotenv = require("dotenv");

// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected!!!");
  } catch (err) {
    console.log(err);
  }
};

dotenv.config();

app.listen(process.env.PORT, () => {
  //call
  connectDB();
  console.log(`app is running on port ${process.env.PORT}`);
});
