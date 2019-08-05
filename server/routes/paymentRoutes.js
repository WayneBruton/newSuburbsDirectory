const express = require("express");
const router = express.Router();
const pool = require("./connection");
const fs = require("fs");
const axios = require("axios");

// var request = require("request")

// const request = require("request");

// function request(callback) {
// 	var path='/v1/checkouts';
// 	var data = querystring.stringify( {
// 		'entityId':'8ac7a4ca6bb15a83016bb1f5503e02a4',
// 		'amount':'92.00',
// 		'currency':'ZAR',
// 		'paymentType':'DB'
// 	});
// 	var options = {
// 		port: 443,
// 		host: 'https://test.oppwa.com/',
// 		path: path,
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 			'Content-Length': data.length,
// 			'Authorization':'OGFjN2E0Y2E2YmIxNWE4MzAxNmJiMWY0NTI1OTAyYTJ8V1NEclpKeTlhNQ=='
// 		}
// 	};
// 	var postRequest = https.request(options, function(res) {
// 		res.setEncoding('utf8');
// 		res.on('data', function (chunk) {
// 			jsonRes = JSON.parse(chunk);
// 			return callback(jsonRes);
// 		});
// 	});
// 	postRequest.write(data);
// 	postRequest.end();
// }

// request(function(responseData) {
// 	console.log("HELLO???",responseData);
// });

router.post("/v1/checkouts", function(req, res) {
  let data = JSON.stringify(req.body);
  console.log("##############################");

  console.log("This is my DATA: ", data);
  var path = "/v1/checkouts";
  let options = {
    port: 443,
    // host: "https://test.oppwa.com/",
    path: path,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": data.length,
      Authorization:
        "Bearer OGFjN2E0Y2E2YmIxNWE4MzAxNmJiMWY0NTI1OTAyYTJ8V1NEclpKeTlhNQ=="
    }
  };

  console.log("##############################");
  axios.post("https://test.oppwa.com/", options).then(res => {
    console.log(res); //RESULT IS 200

    // pool.getConnection(function(err, connection) {
    //   if (err) {
    //     connection.release();
    //     resizeBy.send("Error with connection");
    //   }
    //   connection.query(sql, function(error, result) {
    //     if (error) throw error;

    //     res.json(result);
    //   });
    //   connection.release();
  });
});

module.exports = router;
