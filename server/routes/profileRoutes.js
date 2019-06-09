const express = require("express");
const router = express.Router();
const pool = require("./connection");
const multer = require("multer");
const fs = require("fs");
const Jimp = require("jimp");

const upload = multer({
  dest: "./public/uploads/"
});

//   router.post("/removeImageFileName", (req, res) => {
//     console.log("THIS IS THE FILENAME", req.body.fileName);
//     let fileName = req.body.fileName;
//     fs.unlink(`public/uploads/${fileName}`, err => {
//       console.log(err);
//       console.log("File Deleted");
//     });
//     res.send({ fileDeleted: fileName });
//   });

router.post("/insertPofileDraftImage", upload.single("file"), (req, res) => {
  console.log(req.file);
  // console.log(req.body);
  console.log("testing");
  let fileType = req.file.mimetype.split("image/")[1];
  // console.log(fileType);
  // res.json('Testing')

  try {
    let filePath = req.file.path.split("public/")[1];
    let imageUrl = `${process.env.IMG_URL}/${filePath}`;
    res.json({
      File: req.file,
      imageFile: imageUrl,
      fileType: fileType
    });
  } catch (err) {
    res.json({ error: "Could not upload at this time, please try later" });
  }
});

//   CROP ROUTES

router.put("/cropProfileImage", (req, res) => {
//   console.log("Awesome");
//   res.send("Awesome");
  console.log(req.body);

  var imageToCrop = "public/uploads/" + req.body.imageToCrop;
  let a = parseInt(Math.random() * 10000);
  console.log(a);
  let profileImageName = `newCrop${a}`;
  let imgWidth = parseInt(req.body.originalImageWidth);
  let imgHeight = parseInt(req.body.originalImageHeight);
  let divWidth = parseInt(req.body.divWidth);
  let divHeight = parseInt(req.body.divHeight);
  let cropperWidth = parseInt(req.body.cropperWidth);
  let cropperHeight = parseInt(req.body.cropperHeight);
  let x = parseInt(req.body.cropperX);
  let y = parseInt(req.body.cropperY);
  x = parseInt(x / divWidth * imgWidth)
  y = parseInt(y / divHeight * imgHeight)
  let w = parseInt(cropperWidth / divWidth * imgWidth)
  let h = parseInt(cropperHeight / divHeight * imgHeight)
  if (req.body.imageToDelete !== null) {
    let imageToDelete = req.body.imageToDelete
    imageToDelete = imageToDelete.split('3000')
    imageToDelete = imageToDelete[imageToDelete.length - 1]
    console.log(imageToDelete)
    fs.unlink("/uploads/newCrop8169.jpg", (err) => {
        console.log(err)
    })
  }
  

  // let x = parseInt(req.params.x);
  // let y = parseInt(req.params.y);
  // let w = parseInt(req.params.w);
  // let h = parseInt(req.params.h);
  // let pw = parseInt(req.params.pw);
  // let ph = parseInt(req.params.ph);
  // let newSize;
  // if (pw > ph) {
  //     newSize = pw;
  // } else {
  //     newSize = ph;
  // }

  Jimp.read(imageToCrop)
      .then(lenna => {
          return lenna
              // .resize(pw, ph) // resize
              .crop(x,y,w,h)
              // .resize(newSize, newSize) // resize
              .quality(100) // set JPEG quality
              // .greyscale() // set greyscale
              .write(`public/uploads/${profileImageName}.jpg`); // save
            //   .write(`public/images/profiles/${profileImageName}.jpg`); // save
      }).then(() => {
        res.send({data: `http://localhost:3000/uploads/${profileImageName}.jpg`})
        console.log("Done")

      })
      .catch(err => {
          console.log(err)
          res.send(err)
      });
});

module.exports = router;
