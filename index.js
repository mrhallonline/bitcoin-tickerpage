//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
// console.log(req.body.crypto);
var ticker= (req.body.crypto);
var currency = (req.body.fiat);
request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+ticker+currency, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.last;
    
    var currentDate = data.display_timestamp;
    
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>The current price of " + ticker + " is " + price + currency + "</h1>");
    res.send();
});
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});