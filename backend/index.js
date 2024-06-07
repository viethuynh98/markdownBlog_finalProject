const express = require("express");
const app = express();
const mongoose = require("mongoose");

// database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://huynhviet98:Ymieu431811998!@clusterv98.mlflbal.mongodb.net/blog?retryWrites=true&w=majority"
    );
    console.log("database is connected!!!");
  } catch (err) {
    console.log(err);
  }
};

app.listen(500, () => {
  //call
  connectDB();
  console.log("app is running on port 5000");
});
