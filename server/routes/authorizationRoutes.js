const express = require("express");
const router = express.Router();
const pool = require("./connection");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

router.put("/login", (req, res) => {
  let user_password = req.body.user_password;
  let hashedPassword = "";
//   bcrypt.hash(user_password, saltRounds, function(err, hash) {
//       if (err) {console.log("Hashing Err", err)}
//     hashedPassword = hash;
//   });
  console.log(hashedPassword);
  //   res.json({Awesome: "It works!!"})
  let mysql = `select * from client_profiles where email = '${req.body.email}'`;
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      res.json({ error: "Error with connection. Are you online?" });
    }
    connection.query(mysql, function(error, result) {
      if (error) {
        res.json({ error: "No such user" });
      } else {
        if (!result.length) {
          res.json({
            error: `No user registered under "${
              req.body.email
            }", try signup and register as a user.`
          });
        } else {
          let hash = result[0].password;
          console.log(result)
          let userJson = {
            id: result[0].id,
            email: result[0].email
          };
          bcrypt.compare(user_password, hash, function(err, response) {
            if (response) {
              res.json({
                user: userJson,
                username: result[0].first_name,
                token: jwtSignUser(userJson)
              });
            } else {
              res.json({
                error: "Password is incorrect. Please try again"
              });
            }
          });
        }
      }
    });
    connection.release();
  });
});

router.put("/resetPasswordLink", (req, res) => {
    // console.log(req.body.email)

    // res.send({body: req.body.email})
    let mysql = `select email from client_profiles where email = '${req.body.email}'`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection"); 
      }
      connection.query(mysql, function(error, result) {
        if (error) {
          res.send({ error: "There is an error, try again later" })
        };
        if (!result.length) {
          return res.send({error: 'No such email on our database.'})
        }
        let resetEmail = cryptr.encrypt(JSON.stringify(req.body.email))
        // console.log(resetEmail)
        let resetURL = `${process.env.RESET_URL}/${resetEmail}`
        //SEND EMAIL TO CLIENT 

        let response = {
          success: "A reset Email has been sent to you!",
          failure: "There was a problem, please try again later"
        };
        // res.send(response.success)
    
        // let firstname = req.body.firstname;
        // let lastname = req.body.lastname;
        let email = req.body.email;
        // let message = req.body.message;
        const output = `
          
        
          <h3>RESET EMAIL</h3>
           <h4>Email Address: ${email}</h4><br>
           <p>To reset your email click the following link
           <a href="${resetURL}">RESET</a></p><br>
           <p>or copy ${resetURL} into your browser</p><br>
           <p>If you did not try to reset your password, please ignore this email</P>
          <br><br>
          <p></strong>The Suburbs Directory Team</strong></P>`;
       console.log(output)
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
          to: email,
          // to: "waynebruton@icloud.com, lisa@suburbsdirectory.co.za, nicole@suburbsdirectory.co.za",
          subject: `Suburbs Directory Reset Password Form`,
          text: "Hello world?",
          html: output
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.send(response.failure)
          } else {
            res.send(response.success)
          } 
        });
      });
      connection.release();
    });
  });

  router.get("/resetPasswordStart/:uri", (req, res) => {
    let uri = req.params.uri
    uri = JSON.parse(cryptr.decrypt(uri))
    res.send({uri: uri})
  });
  
  router.put("/resetPassword", (req, res) => {
    let user_password = req.body.password
    if (req.body.password !== req.body.passwordRepeat) {
      return res.send({issues: "Passwords do not match"})
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      let mysql = `update client_profiles set password = '${hash}' where email = '${req.body.email}'`
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");
        }
        connection.query(mysql, function(error, result) {
          if (error) {
            res.send({error: "There was a connection error"})
          };
          res.json(result);
        });
        connection.release();
      });
    })
    // res.send({itWorks: "AWESOME"})
  });

  router.put("/checkEmail", function(req, res) {
    let email = req.body.email;
    console.log(email);
    var sql = `select email from client_profiles where email = '${email}'`;
    const schema = {
      email: Joi.string().email()
    };
    const { error, value } = Joi.validate(req.body, schema);
    if (error) {
      console.log("ERROR IS:", error.details[0].context.key);
      switch (error.details[0].context.key) {
        case "email":
          res.json({
            error: "You must provide a valid email address"
          });
          break;
        default:
          res.json({
            error: "Invalid email information"
          });
      }
    } else {
      pool.getConnection(function(err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");
        }
        connection.query(sql, function(error, result) {
          if (error) throw error;
          if (result.length) {
            res.json({
              error: "This email already exists, rather log in"
            });
          } else {
            res.json(result);
          }
        });
        connection.release();
      });
    }
  });


module.exports = router;
