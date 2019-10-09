const express = require("express");
const router = express.Router();
const pool = require("./connection");


router.get("/getProfilesForDashboard", (req, res) => {
    let sql = `select id, businessName, profile_approved, paid_to_date from client_profiles order by businessName`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          res.json(result);
        }
      });
      connection.release();
    });
  });
  
  router.get("/getProfileForAdmin/:profileID", (req, res) => {
    let id = req.params.profileID;
    let sql = `select * from client_profiles where id = ${id}`;
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