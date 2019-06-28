const express = require("express");
const router = express.Router();
const pool = require("./connection");

const IMG_URL = process.env.IMG_URL;

// console.log("Testing")

router.get("/areas", (req, res) => {
  // console.log("Testing")
  // res.json({response: "Fucking A!!"})

  let mysql1 =
    "select * from areas where isActive = true order by area_description";
    let mysql2 = "select * from categories where isActive = true order by category_description"
    let mysql = `${mysql1};${mysql2}`
  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
      console.log(err)
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      result[1].forEach(el => {
        el.image_url = `${process.env.IMG_URL}${el.image_url}`
      });
      res.json(result);
      // console.log(result)
    });
    connection.release();
  });
});

router.get("/categories/:areaId", (req, res) => {
  // console.log("Testing")
  let area = req.params.areaId
  // res.json({response: `Fucking A!!:: ${area}`})
  let mysql = `SELECT
    c.id, c.category_description, c.image_url, 
    COUNT(p.id) as count
    FROM
        categories c
    LEFT JOIN
    client_profiles p
      ON  JSON_CONTAINS(p.areas,      '${area}',                    '$')
      AND JSON_CONTAINS(p.catarea, CAST(c.id AS CHAR(32)), '$') and p.paid_to_date = true 
    GROUP BY c.id
    ORDER BY c.category_description`

  // let mysql =
  //   "select * from areas where isActive = true order by area_description";

  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
      console.log(err)
    }
    connection.query(mysql, function(error, result) {
      if (error) throw error;
      result.forEach(el => {
        el.image_url = `${process.env.IMG_URL}${el.image_url}`
      });
      res.json(result);
      // console.log(result)
    });
    connection.release();
  });
});
 

router.put("/profiles", (req, res) => {
  let bod = req.body
  let area = req.body.area
  let category = req.body.category
  // console.log("Testing")
  // res.json(bod)

  let sql = `select id, businessName, profile_description, profile_image
        from client_profiles
        where JSON_CONTAINS(areas, '${area}',"$") and JSON_CONTAINS(catarea, '${category}',"$") and profile_approved = true and paid_to_date = true order by businessName`

  pool.getConnection(function(err, connection) {
    if (err) {
      connection.release();
      resizeBy.send("Error with connection");
      console.log(err)
    }
    connection.query(sql, function(error, result) {
      if (error) throw error;
      result.forEach(el => {
        el.profile_image = `${process.env.IMG_URL}${el.profile_image}`
        el.profile_description = el.profile_description.substring(0, 160) + '...'
      });
      res.json(result);
      console.log(result)
    });
    connection.release();
  });
});


//AM HERE


// let sql = `SELECT
//     c.id, c.category_description, c.image_url
//     COUNT(p.id) as count
//     FROM
//         categories c
//     LEFT JOIN
//     client_profiles p
//       ON  JSON_CONTAINS(p.areas,      '${areaCode}',                    '$')
//       AND JSON_CONTAINS(p.catarea, CAST(c.id AS CHAR(32)), '$') and p.paid_to_date = true 
//     GROUP BY c.id
//     ORDER BY c.category_description`


//AM HERE ^



// router.get("/product/:id", (req, res) => {
//   let id = req.params.id;
//   let mysql = `select * from products where id = ${id}`;
//   pool.getConnection(function(err, connection) {
//     if (err) {
//       connection.release();
//       resizeBy.send("Error with connection");
//     }
//     connection.query(mysql, function(error, result) {
//       if (error) throw error;
//       result.forEach(el => {
//         el.product_image = `${IMG_URL}${el.product_image}`;
//         el.price = el.price.toFixed(2);
//       });
//       res.json(result);
//     });
//     connection.release();
//   });
// });

// router.post("/productViews", (req, res) => {
//   console.log(req.body);
//   let id = req.body.id;
//   let views = req.body.views;
//   let mysql = `update products set views = ${views} where id = ${id}`;
//   if (id !== undefined) {
//     pool.getConnection(function(err, connection) {
//       if (err) {
//         connection.release();
//         resizeBy.send("Error with connection");
//       }
//       connection.query(mysql, function(error, result) {
//         if (error) throw error;
//         res.json(result);
//       });
//       connection.release();
//     });
//   }
// });

module.exports = router;
