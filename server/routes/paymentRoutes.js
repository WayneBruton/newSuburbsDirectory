const express = require("express");
const router = express.Router();
const pool = require("./connection");
const fs = require("fs");
const axios = require("axios");
const multer = require("multer");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const moment = require("moment");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

router.put("/payurl", (req, res) => {
  console.log(req.body);
  let credentials = `${req.body.monthly}|${req.body.amount}|${req.body.profileID}|${req.body.dateNow}`;

  const encryptedString = cryptr.encrypt(credentials);
  const decryptedString = cryptr.decrypt(encryptedString);

  console.log(encryptedString);
  console.log(decryptedString);

  res.send(encryptedString);
});

router.put("/paymentsuccess/:credentials", (req, res) => {
  console.log(req.params.credentials);
  let credentials = req.params.credentials;
  const decryptedString = cryptr.decrypt(credentials);
  console.log(decryptedString);

  const id = decryptedString.split("|")[2];
  console.log("ID", id);
  let sql = `select payment_expires from client_profiles where id = ${id}`;
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
        res.json({
          result: result,
          decryptedString: decryptedString
        });
      } 
    });
    connection.release();
  });
});

router.put("/processPayment", (req, res) => {
  console.log(req.body);
  let expirydate = req.body.expiryDate;
  let id = req.body.profileID;
  console.log("The Date IS@@@@@@@", expirydate);
  let sql1 = `Update client_profiles set profile_approved = true, paid_to_date = true, payment_expires =  '${expirydate}'  where id = ${id}`;
  let sql2 = `select first_name, email, businessName from client_profiles  where id = ${id}`;
  let sql = `${sql1};${sql2}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(sql, function(error, result) {
      if (error) {
        console.log("EEERRROOORRR", error);
      } else {
        console.log(result);
        res.json(result[1]);
      }
    });
    connection.release();
  });
});

// router.post("/v1/checkouts", function(req, res) {
//   let data = JSON.stringify(req.body);
//   console.log("##############################");

//   console.log("This is my DATA: ", data);
//   var path = "/v1/checkouts";
//   let options = {
//     port: 443,
//     // host: "https://test.oppwa.com/",
//     path: path,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Content-Length": data.length,
//       Authorization:
//         "Bearer OGFjN2E0Y2E2YmIxNWE4MzAxNmJiMWY0NTI1OTAyYTJ8V1NEclpKeTlhNQ=="
//     }
//   };

//   console.log("##############################");
//   axios.post("https://test.oppwa.com/", options).then(res => {
//     console.log(res); //RESULT IS 200

//     // pool.getConnection(function(err, connection) {
//     //   if (err) {
//     //     connection.release();
//     //     resizeBy.send("Error with connection");
//     //   }
//     //   connection.query(sql, function(error, result) {
//     //     if (error) throw error;

//     //     res.json(result);
//     //   });
//     //   connection.release();
//   });
// });

module.exports = router;
