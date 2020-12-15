const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
// const uuid = require("uuid/v4");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const app = express();
const s3 = new aws.S3({
  /* ... */
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING" });
    },
    // key: function (req, file, cb) {
    //   cb(null, uuidv4() + path.extname(file.originalname));
    // },
    key: (req, file, callback) => {
      callback(null, uuidv4() + path.extname(file.originalname));
    },
  }),
});

module.exports = upload;
