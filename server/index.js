const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const csv = require("csvtojson");
const studentmodel = require("./models/student");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

mongoose
  .connect("mongodb://localhost:27017/csvuploads")
  .then((response) => {
    console.log("Database connected Successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database: " + err.message);
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("I am in Test Page");
});

app.post("/api/uploadcsv", upload.single("csvFile"), async (req, res) => {
  try {
    const up = await csv().fromFile(req.file.path);
    await studentmodel.insertMany(up);
    console.log("Added to Database");
    return res.send("Added to Database Successfully");
  } catch (error) {
    console.error("Error adding data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/viewdata", (req, res) => {
  studentmodel
    .find()
    .lean()
    .then((students) => res.json(students))
    .catch((error) => res.json(error));
});
