const express = require("express");
const router = express.Router();
const pool = require("./connection");


router.post("/addFAQ", function(req, res) {
    let title = req.body.title;
    let faq_description = req.body.description;
    // console.log(title)
    // console.log(description)
    // res.json({awesome: "It works!!!"})
    let sql = `insert into faq (title, faq_description) values ("${title}","${faq_description}")`;
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
  
  router.get("/getFAQ", (req, res) => {
    let sql = `select * from faq order by title`;
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
  
  router.post("/deleteFAQ", (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    let sql = `delete from faq where id = ${id}`;
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
      });
      connection.release();
    });
  });
  
  
  module.exports = router;
  