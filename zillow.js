// Import express
var express = require("express");
var app = express();
// Database
var database = [
	{ price: 240000, city: "baltimore" },
	{ price: 300000, city: "austin" },
	{ price: 400000, city: "austin" },
	{ price: 1000000, city: "seattle" },
	{ price: 325000, city: "baltimore" },
	{ price: 550000, city: "seattle" },
	{ price: 250000, city: "boston" },
];

// set up a get request
// requests will be in the form sqft=2000&bed=3&bath=4
// output should be in the form {zestimate: Number }
app.get("/v1/zillow/zestimate", function (req, res) {
	var val = req.query.sqft * req.query.bed * req.query.bath * 10;
	console.log(val);
	var output = "{zestimate: " + val + " }";
	console.log(output);
	res.status(200).send(output);
});

// set the server to listening
console.log("server is up");
app.listen(3000);