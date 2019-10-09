const express = require("express");
const router = express.Router();
const pool = require("./connection");
const cron = require("node-cron");
const moment = require("moment");
const nodemailer = require("nodemailer");

cron.schedule(
  "0 3 * * *",
  () => {
    console.log("Running a job at 09:12 at Africa/Johannesburg timezone");
    checkExpiryDates()
  },
  {
    scheduled: true,
    timezone: "Africa/Johannesburg"
  }
);

cron.schedule(
  "15 3 * * *",
  () => {
    console.log("Running a job at 09:12 at Africa/Johannesburg timezone");
    checkExpiredProfiles()
  },
  {
    scheduled: true,
    timezone: "Africa/Johannesburg"
  }
);

cron.schedule(
  "15 3 * * *",
  () => {
    console.log("Running a job at 09:12 at Africa/Johannesburg timezone");
    checkStatistics()
  },
  {
    scheduled: true,
    timezone: "Africa/Johannesburg"
  }
);

let checkExpiryDates = function() {
  let nowDatePlus6 = moment()
    .add(6, "days")
    .format("YYYY-MM-DD");
  let nowDatePlus7 = moment()
    .add(7, "days")
    .format("YYYY-MM-DD");
  let sql = `select id, email, payment_expires, businessName, first_name from client_profiles where payment_expires >= '${nowDatePlus6}' and payment_expires < '${nowDatePlus7}'`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(sql, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        result.forEach(el => {
          let firstNameA = el.first_name;
          let emailA = el.email;
          let expiryDateA = el.payment_expires;
          let businessNameA = el.businessName;
          let messageA = `Your subscription on suburbs directory for your business "${businessNameA}" expires on ${expiryDateA}. To renew before it expires, please log into your profile and effect payment.`;
          let subjectA = `Suburbs Directory subscription expiring soon`;
          processSchedule(firstNameA, emailA, messageA, subjectA);
        });
      }
    });
    connection.release();
  });
};

let checkExpiredProfiles = function() {
  let nowDate = moment().format("YYYY-MM-DD");
  let sql1 = `select id, email, payment_expires, businessName, first_name from client_profiles where payment_expires < '${nowDate}' and paid_to_date = true`;
  let sql2 = `update client_profiles set paid_to_date = false where payment_expires < '${nowDate}'`;
  let sql = `${sql1};${sql2}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(sql, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log("This is the result", result[0]);
        let expiredProfiles = result[0];
        expiredProfiles.forEach(el => {
          let firstNameA = el.first_name;
          let emailA = el.email;
        //   let expiryDateA = el.payment_expires;
          let businessNameA = el.businessName;
          let messageA = `Your subscription on suburbs directory for your business "${businessNameA}" has expired. If you wish to resubscribe, please log into your profile and effect payment. Otherwise, we are sorry to see you go. `;
          let subjectA = `Suburbs Directory subscription Expired`;
          processSchedule(firstNameA, emailA,messageA, subjectA)
        });
      }
    });
    connection.release();
  });
};

let checkStatistics = function() {
  let nowDate = moment().format("YYYY-MM-DD");

  let sql1 = `select count(*) as TotalProfiles from client_profiles`
  let sql2 = `select count(*) as PaidProfiles from client_profiles where paid_to_date = true and profile_approved = true`
  let sql3 = `select count(*) as PaidNotApprovedProfiles from client_profiles where profile_approved = false and  paid_to_date = true`
  let sql4 = `select count(*) as approvedNotPaidProfiles from client_profiles where profile_approved = true and  paid_to_date = false`
  let sql5 = `select count(*) as approvedNorPaidProfiles from client_profiles where profile_approved = false and  paid_to_date = false`
  let sql6 = `select count(*) as approvedLast30 from client_profiles where created_at > '2019-09-08'`
  let sql7 = `select count(*) as expiringNext7 from client_profiles where payment_expires > '2019-10-08' and payment_expires < '2019-10-15'`
  let sql = `${sql1};${sql2};${sql3};${sql4};${sql5};${sql6};${sql7}`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(sql, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log("This is the result", result[0]);
        console.log(result)

      
          let firstNameA = `Lisa & Nicole`;
          let emailA = `lisa@suburbsdirectory.co.za`;
        //   let expiryDateA = el.payment_expires;
          let businessNameA = `Suburbs Directory`;
          let messageA = `  Total profiles on the system: ${result[0][0].TotalProfiles}<br>
                            Total paid profiles: ${result[1][0].PaidProfiles}<br>
                            Total paid but NOT approved profiles: ${result[2][0].PaidNotApprovedProfiles}<br>
                            Total approved but NOT paid profiles: ${result[3][0].approvedNotPaidProfiles}<br>
                            Total NOT paid Nor approved profiles: ${result[4][0].approvedNorPaidProfiles}<br>
                            Profiles approved in the last 30 days: ${result[5][0].approvedLast30}<br>
                            Profiles expiring in the next 7 days: ${result[6][0].expiringNext7}
                            `;
          let subjectA = `Suburbs Directory Statistics`;
          processSchedule(firstNameA, emailA,messageA, subjectA)
      }
    });
    connection.release();
  });
};


let processSchedule = function(firstNameA, emailA, messageA, subjectA) {
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
