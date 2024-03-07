// Backend server using Express.js
const express = require("express");
const multer = require("multer");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const pathName = "uploads/";
    cb(null, pathName);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

var bodyString = "";
var audioUrl = "";

app.use(express.json());
// add cors
const cors = require("cors");
app.use(cors());

// Endpoint to handle incoming POST requests
// where the pipeline sends the msg
app.post("/", upload.single("audioFile"), (req, res) => {
  console.log("Received HTTP request:", req.body);
  res.status(200).send("Request received successfully");
  bodyString = req.body.transcript;
  audioFile = req.file;
  audioUrl = req.file.path.split("/")[-1];
  console.log("audioFile:: ", audioFile);
});

// sending to the react app
app.post("/log", (req, res) => {
  console.log("Received HTTP request Log:", bodyString);

  responseData = {
    transcript: bodyString,
    audioUrl: audioUrl,
  };

  res.json(responseData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
