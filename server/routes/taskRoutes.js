const express = require("express");
const router = express.Router();
const pool = require("./connection");




router.get("/getTasks", (req, res) => {
    let sql = `select * from tasks order by created_at desc`;
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
      });
      connection.release();
    });
  });


  router.post("/addTask", (req, res) => {
  
   
    let sql = `insert into tasks (headline, title, subtitle, done) values ("${req.body.headline}","${req.body.title}","${req.body.subtitle}", false)`;
    console.log(sql);
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
      });
      connection.release();
    });
  });
  router.delete("/deleteTask/:id", (req, res) => {
    let id = req.params.id;
    let sql = `delete from tasks where id = ${id}`;
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
  
  router.put("/editTask", (req, res) => {
    console.log(req.body);
    let sql = `Update tasks set done = ${req.body.done} where id = ${req.body.id}`;
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
      });
      connection.release();
    });
  });

  module.exports = router;