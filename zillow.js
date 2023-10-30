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

// set up a get request for zestimate
// requests will be in the form sqft=2000&bed=3&bath=4
// output should be in the form {zestimate: Number }
app.get("/v1/zillow/zestimate", function (req, res) {
	if (
		req.query.sqft == undefined ||
		req.query.bed == undefined ||
		req.query.bath == undefined
	) {
		res.status(404).send("sqft, bed and bath must be defined");
	} else {
		console.log(req.query.bath);
		var val = req.query.sqft * req.query.bed * req.query.bath * 10;
		console.log(val);
		var output = "{zestimate: " + val + " }";
		console.log(output);
		res.status(200).send(output);
	}
});

// set up get request for houses
// requests have a parameter city
// output will be a list of house prices for the city specified
app.get("/v1/zillow/houses", function (req, res) {
	var output = [];
	database.forEach(function (entry) {
		if (entry.city == req.query.city) {
			output.push(entry);
		}
	});
	console.log(output);
	res.status(200).send(output);
	// if (req.query.city)
});

// set up get request for prices of houses in the database
// requests have a parameter price
// output will be a list of houses under the price provided
app.get("/v1/zillow/prices", function (req, res) {
	if (req.query.usd == undefined) {
		res.status(404).send("usd must be defined");
	} else {
		var output = [];
		database.forEach(function (entry) {
			if (req.query.usd >= entry.price) {
				output.push(entry);
			}
		});
		res.status(200).send(output);
	}
});

// set the server to listening
console.log("server is up");
app.listen(3000);
