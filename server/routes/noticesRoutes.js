const express = require("express");
const router = express.Router();
const pool = require("./connection");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
    dest: "./public/uploads/"
  });

router.post("/addNoticeImage", upload.single("image"), function(req, res) {
  console.log(req)
    let file = req.file;
    console.log(file)
    let filename = req.file.filename;
    let mimetype = req.file.mimetype.split("/");
    mimetype = mimetype[1];
    console.log(mimetype);
    let oldPath = `./public/uploads/${filename}`;
    let newPath = `public/images/notices/${filename}.${mimetype}`;
    let url = `${process.env.IMG_URL}/images/notices/${filename}.${mimetype}`;
    console.log(file);
    fs.rename(oldPath, newPath, () => {
      console.log("Moved");
      console.log(url); 
      res.json({ url: url });
    });
  });
  
  router.post("/postNotice", function(req, res) {
    let heading = req.body.heading;
    let notice_text = req.body.notice_text;
    // res.json({awesome: "It works!!!"})
    let sql = `insert into notices (heading, notice_text) values ("${heading}","${notice_text}")`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          res.json({ result: "Success!!" });
        }
        // res.json(result);
      });
      connection.release();
    });
  });
  
  router.get("/getNotices", (req, res) => {
    let sql = `select * from notices order by id desc`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          res.json(result);
        }
        // res.json(result);
      });
      connection.release();
    });
  });
  
  router.post("/deleteNotices", (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    let sql = `delete from notices where id = ${id}`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          res.json("success!!");
        }
        // res.json(result);
      });
      connection.release();
    });
  });
  
  
  module.exports = router;
  