const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.put("/contactform", function(req, res) {
  console.log(req.body);
  let response = {
    success: "Your Email has been sent!",
    failure: "There was a problem, please try again later"
  };
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let email = req.body.email;
  let message = req.body.message;
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>First Name: ${firstName}</li><br>
  
    <li>Last  Name: ${lastName}</li><br>
  
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
    from: "Suburbs Directory Contact Form <lisa@suburbsdirectory.co.za>",
    to:
      "nicole@suburbsdirectory.co.za, lisa@suburbsdirectory.co.za, waynebruton@icloud.com",
    subject: `Suburbs Directory Contact`,
    text: "Hello world?",
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      var message = response.failure;
      res.json({ error: "Error" });
    } else {
        console.log("AWESOME");
    var message = response.success;
    res.json({ error: "No Error" });
    }
    
  });
});

module.exports = router;
