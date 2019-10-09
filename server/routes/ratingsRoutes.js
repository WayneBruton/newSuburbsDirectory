const express = require("express");
const router = express.Router();
const pool = require("./connection");

router.put("/getRatings", function(req, res) {
    console.log("GetRatings", req.body.id);
    let id = req.body.id;
    let sql = `select * from profile_ratings where profile_number = ${id} order by id desc`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) throw error;
  
        res.json(result);
      });
      connection.release();
    });
  });
  
  router.post("/updateRatings", function(req, res) {
    console.log(req.body);
    let profile_number = req.body.id;
    let rating = req.body.rating;
    let narrative = req.body.comments;
  
    let sql = `insert into profile_ratings (profile_number, rating, narrative) values (
      ${profile_number},
      ${rating},
      "${narrative}"
    )`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) throw error;
  
        res.json(result);
      });
      connection.release();
    });
  });

  module.exports = router;