const express = require("express");
const app = express();
const mongoose = require("mongoose");
// save confidential data with dotenv
const dotenv = require("dotenv");
const cors = require("cors");
//image upload
const multer = require("multer");
const path = require("path")
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const userProfileRoute = require("./routes/userProfiles");

// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected!!!");
  } catch (err) {
    console.log(err);
  }
};

// middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/userProfile", userProfileRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, "image1.jpg") // test
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

app.listen(process.env.PORT, () => {
  //call
  connectDB();
  console.log(`app is running on port ${process.env.PORT}`);
});
