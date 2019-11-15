const express = require("express");
const router = express.Router();
const pool = require("./connection");
const multer = require("multer");
const fs = require("fs");
// const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Cryptr = require("cryptr");
// const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
const moment = require("moment");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

function jwtSignUser(user) {
  const SIX_HOURS = 60 * 60 * 6;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: SIX_HOURS
  });
}

const upload = multer({
  dest: "./public/uploads/",
  limits: {
    fieldSize: 100 * 1024 * 1024
  }
});

// SET/USE TOKEN
// let userJson = {
//   id: result[0].id,
//   username: result[0].first_name,
//   email: result[0].email
// };
// res.header("Authorization", "Bearer" + jwtSignUser(userJson));
// res.json({
//   user: userJson,
//   token: jwtSignUser(userJson),
//   hash: hash
// });

// CHECK TOKEN

//   let checktoken = (req, res, next) => {
//     // console.log(req.body)
//   let token = req.body.token;
//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       res.json({
//         success: false,
//         message: "Token is not valid"
//       });
//       next();
//     } else {
//       return res.send({
//         success: true,
//         message: "Token is valid"
//       });
//     }
//   });
// };

// router.put("/authenticateAdmin", checktoken, (req, res) => {});

router.get("/getProfile/:id", function(req, res) {
  console.log(req.params.id);
  // res.json({Awesome: req.params.id})
  var sql = `select * from client_profiles where id = ${req.params.id}`;
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

router.post("/addProfile", upload.array(), function(req, res) {
  var base64Data = req.body.file;
  let base64Image = base64Data.split(";base64,").pop();
  var base64Data1 = req.body.file1;
  let base64Image1 = base64Data1.split(";base64,").pop();
  var base64Data2 = req.body.file2;
  let base64Image2 = base64Data2.split(";base64,").pop();
  var base64Data3 = req.body.file3;
  let base64Image3 = base64Data3.split(";base64,").pop();

  let initArray = req.body.areas.split(",");
  let areas = [];
  let catarea = [];
  let extra_packages = [];
  for (i = 0; i < initArray.length; i++) {
    areas.push(parseInt(initArray[i]));
  }
  initArray = req.body.catarea.split(",");
  for (i = 0; i < initArray.length; i++) {
    catarea.push(parseInt(initArray[i]));
  }

  if (req.body.extra_packages !== "") {
    initArray = req.body.extra_packages.split(",");
    for (i = 0; i < initArray.length; i++) {
      extra_packages.push(parseInt(initArray[i]));
    }
  } else {
    extra_packages = [];
  }
  let id = 0;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    let sql1 = ` INSERT INTO client_profiles (businessName,first_name,last_name,mob_no,email,website,facebook,instagram,
    areas,selectedOption,catarea,profile_description, extra_packages,password,   profile_approved, paid_to_date
) values (
'${req.body.businessName}','${req.body.firstName}','${req.body.lastName}','${req.body.contactNumber}','${req.body.email}','${req.body.website}','${req.body.facebook}','${req.body.instagram}',
"[${areas}]",${req.body.selectedOption},"[${catarea}]","${req.body.profile_description}", "[${extra_packages}]","${hash}", false, false
)`;
    let sql2 = `select id from client_profiles where email like '${req.body.email}' and businessName like '${req.body.businessName}' `;
    let sql = `${sql1};${sql2}`;
    pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(sql, function(error, result) {
        if (error) throw error;
        id = result[1][0].id;

        ////////////////////////

        fs.writeFile(
          `public/images/profiles/${id}ProfilePic.png`,
          base64Image,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(`public/images/profiles/${id}ProfilePic.png`, function(
              err,
              data
            ) {});
          }
        );
        fs.writeFile(
          `public/images/profiles/${id}Business1Pic.png`,
          base64Image1,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business1Pic.png`,
              function(err, data) {}
            );
          }
        );
        fs.writeFile(
          `public/images/profiles/${id}Business2Pic.png`,
          base64Image2,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business2Pic.png`,
              function(err, data) {}
            );
          }
        );
        fs.writeFile(
          `public/images/profiles/${id}Business3Pic.png`,
          base64Image3,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business3Pic.png`,
              function(err, data) {}
            );
          }
        );

        //////////////////////////////

        let sql3 = `update client_profiles set profile_image = '/images/profiles/${id}ProfilePic.png', business_image1 = '/images/profiles/${id}Business1Pic.png', business_image2 = '/images/profiles/${id}Business2Pic.png', business_image3 = '/images/profiles/${id}Business3Pic.png' 
       where id = ${id}`;
        console.log(sql3);
        connection.query(sql3, function(error, result) {
          if (error) throw error;
          console.log(result);
          console.log(id);
          console.log(req.body.firstName);
          console.log(req.body.email);
          let userJson = {
            id: id,
            username: req.body.firstName,
            email: req.body.email
          };
          res.header("Authorization", "Bearer" + jwtSignUser(userJson));
          res.json({
            user: userJson,
            token: jwtSignUser(userJson)
          });
        });
      });
      connection.release();
    });
  });
});

router.post("/editProfile", upload.array(), function(req, res) {
  console.log(req.body);
  var base64Data = req.body.file;
  let extra_packages = [];
  // console.log("Main Image",base64Data)
  let base64Image = null;
  let base64Image1 = null;
  let base64Image2 = null;
  let base64Image3 = null;
  if (base64Data !== "") {
    base64Image = base64Data.split(";base64,").pop();
  }

  var base64Data1 = req.body.file1;
  if (base64Data1 !== "") {
    base64Image1 = base64Data1.split(";base64,").pop();
  }
  // let base64Image1 = base64Data1.split(";base64,").pop();
  var base64Data2 = req.body.file2;
  if (base64Data2 !== "") {
    base64Image2 = base64Data2.split(";base64,").pop();
  }
  // let base64Image2 = base64Data2.split(";base64,").pop();
  var base64Data3 = req.body.file3;
  if (base64Data3 !== "") {
    base64Image3 = base64Data3.split(";base64,").pop();
  }
  console.log("EEEXTRAAA!!!!", req.body.extra_packages);
  let initPackagesArray = [];
  if (req.body.extra_packages !== NaN) {
    initPackagesArray = req.body.extra_packages.split(",");
    for (i = 0; i < initPackagesArray.length; i++) {
      extra_packages.push(parseInt(initPackagesArray[i]));
    }
  } else {
    extra_packages = [0];
  }

  let areas = [];
  let initAreasArray = [];
  if (req.body.areas !== "") {
    initAreasArray = req.body.areas.split(",");
    for (i = 0; i < initAreasArray.length; i++) {
      areas.push(parseInt(initAreasArray[i]));
    }
  } else {
    areas = [];
  }
  let catarea = [];

  let initArray = req.body.catarea.split(",");
  for (i = 0; i < initArray.length; i++) {
    catarea.push(parseInt(initArray[i]));
  }
  console.log("CatArea", catarea);

  let id = req.body.id;
  let payment_expires = moment(req.body.payment_expires).format(
    "YYYY-MM-DD HH:mm"
  );

  console.log(payment_expires);

  let sql = `update client_profiles set businessName = "${req.body.businessName}",first_name = "${req.body.firstName}",last_name = "${req.body.lastName}", 
      mob_no = "${req.body.contactNumber}",email = "${req.body.email}", website = "${req.body.website}",facebook = "${req.body.facebook}",instagram = "${req.body.instagram}",
      catarea = "[${catarea}]" ,profile_description = "${req.body.profile_description}", extra_packages = "[${extra_packages}]", areas = "[${areas}]", selectedOption = ${req.body.selectedOption}, profile_approved = ${req.body.profile_approved}, paid_to_date = ${req.body.paid_to_date}, payment_expires = '${payment_expires}' where id = ${id}`;

  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
    }
    connection.query(sql, function(error, result) {
      if (error) throw error;

      ////////////////////////
      if (base64Image !== null) {
        console.log("AWESOME THEN");
        fs.writeFile(
          `public/images/profiles/${id}ProfilePic.png`,
          base64Image,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(`public/images/profiles/${id}ProfilePic.png`, function(
              err,
              data
            ) {});
          }
        );
      }
      if (base64Image1 !== null) {
        fs.writeFile(
          `public/images/profiles/${id}Business1Pic.png`,
          base64Image1,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business1Pic.png`,
              function(err, data) {}
            );
          }
        );
      }
      if (base64Image2 !== null) {
        fs.writeFile(
          `public/images/profiles/${id}Business2Pic.png`,
          base64Image2,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business2Pic.png`,
              function(err, data) {}
            );
          }
        );
      }
      if (base64Image3 !== null) {
        fs.writeFile(
          `public/images/profiles/${id}Business3Pic.png`,
          base64Image3,
          { encoding: "base64" },
          function(err) {
            if (err) console.log(err);
            fs.readFile(
              `public/images/profiles/${id}Business3Pic.png`,
              function(err, data) {}
            );
          }
        );
      }
      let sql3 = `update client_profiles set profile_image = '/images/profiles/${id}ProfilePic.png', business_image1 = '/images/profiles/${id}Business1Pic.png', business_image2 = '/images/profiles/${id}Business2Pic.png', business_image3 = '/images/profiles/${id}Business3Pic.png'
         where id = ${id}`;
      console.log(sql3);
      connection.query(sql3, function(error, result) {
        if (error) throw error;
        res.json({
          result: "Congratulations, you have updarted your profile"
        });
      });
    });
    connection.release();
  });
});

router.get("/getSearchedCategory/:category", function(req, res) {
  console.log(req.params.category);
  let category_chosen = req.params.category;
  var sql = `SELECT id, businessName, profile_image 
  FROM client_profiles
  WHERE JSON_CONTAINS(catarea, '${category_chosen}')  and profile_approved = true and paid_to_date = true;`;
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
