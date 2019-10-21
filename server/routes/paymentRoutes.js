const express = require("express");
const router = express.Router();
const pool = require("./connection");
// const fs = require("fs");
// const axios = require("axios");
// const multer = require("multer");
// const Joi = require("joi");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
// const moment = require("moment");
const nodemailer = require("nodemailer");

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
  console.log("DECRYPTED STRING", decryptedString);

  const id = decryptedString.split("|")[2];
  const amount = decryptedString.split("|")[1];
  // const typePmt = decryptedString.split("|")[0];
  // console.log(typePmt)
  // if (typePmt == true) {
  //   typePmt = "Monthly"
  // } else {
  //   typePamt = "Annual"
  // }

  console.log("ID", id);
  let sql = `select id, first_name,email,  businessName, payment_expires from client_profiles where id = ${id}`;
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
        console.log("R$$$$$$@@@@@@@@@@@@@@@@@", result);

        let firstNameA = `Lisa & Nicole`;
        let emailA = `lisa@suburbsdirectory.co.za`;
        //   let expiryDateA = el.payment_expires;
        let businessNameA = `Suburbs Directory`;
        let messageA = `  You have received a <strong>Payment</strong><br>
                            For: ${result[0].businessName} <br>
                            email: ${result[0].email}<br>
                            Amount: R${amount}<br>
                            Client Name: ${result[0].first_name} 

                            `;
        console.log(messageA);
        let subjectA = `Suburbs Directory Payment Received`;
        paymentNotification(firstNameA, emailA, messageA, subjectA);
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
        res.json(result[1]);
      }
    });
    connection.release();
  });
});

let paymentNotification = function(firstNameA, emailA, messageA, subjectA) {
  let response = {
    success: "Your Email has been sent!",
    failure: "There was a problem, please try again later"
  };
  let firstName = firstNameA;
  console.log(firstName);
  // let expiryDate = expiryDateA;
  // let businessName = businessNameA
  let email = emailA;
  let message = messageA;
  let subject = subjectA;
  const output = `
 
  <h3>Details</h3>
  <ul>
    <li>First Name: Dear ${firstName}</li><br>
    <li>Email: ${email}</li><br>
  </ul><br>
  <h3>Message</h3><br>
  <p>${message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 465, //587
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "Suburbs Directory Admin<lisa@suburbsdirectory.co.za>",
    to: `${email}`,
    cc: `nicole@suburbsdirectory.co.za, lisa@suburbsdirectory.co.za, waynebruton@icloud.com`,
    subject: `${subject}`,
    text: "Hello world?",
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      var messageResult = response.failure;
      console.log("Error", error, messageResult);
      // res.json({error: "Error"})
    }
    console.log("AWESOME");
    var messageResult = response.success;
    console.log("Success", info, messageResult);
  });
};

module.exports = router;
