const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
const sequelize = require("./utils/database");
const Files = require("./models/files");
const cp = require("child_process");
const cors = require("cors");

app.use(cors());

const PORT = 5000;

sequelize.sync();

let FileName;
const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      FileName = file.originalname;
      console.log(FileName);
      cb(null, file.fieldname);
    },
  }),
});

app.get("/file/:name", (req, res) => {
  const { name } = req.params;
  res.sendFile(__dirname + `/uploads/${name}`);
});

app.post("/upload", uploadFile.single("pdf_file"), async (req, res) => {
  try {
    if (req.file == undefined) {
      res.send("You must select a file");
    }
    var stats = fs.statSync(__dirname + "/uploads/pdf_file");
    var fileSizeInBytes = stats.size;
    var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    const fileSize = fileSizeInMegabytes.toString();

    if(fileSizeInMegabytes>6)
    {
    cp.exec(
      `./shrinkpdf.sh -o ${__dirname + "/uploads/" + FileName} ${
        __dirname + "/uploads/pdf_file"
      } `,
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      }
    );
  }

    Files.create({
      name: FileName,
      size: fileSize,
    });
    res.send("File Uploaded Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, "localhost", () => {
  console.log(`Server running on port ${PORT}`);
});
