const express = require("express");
const router = express.Router();
const multer = require("multer")

const upload = require("./file-upload");

const singleUpload = upload.single("image");

router.post("/image-upload", (req, res) => {
  singleUpload(req, res, function (err) {
    return res.json({
      imageUrl: req.file.location,
      Data: req.file,
    });
  });
});

const multiupload = upload.array('images', 10);

router.post('/images-upload', (req,res) => {
  multiupload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
     let uploadedFiles = [];
     let debugbucket=[]
     for(let item of req.files) {
       uploadedFiles.push({filename: item.originalname})
       debugbucket.push({item}) // debugging data
     }
     res.json({progress: 100, files: uploadedFiles, Data: debugbucket})
     // debugging test
     
   } )
})

module.exports = router;
