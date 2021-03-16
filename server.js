const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("https");

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
    res.sendFile(__dirname+"/public/main.html")
});

app.get("/diet", function(req, res){
    res.sendFile(__dirname+"/diet.js")
});

app.get("/renderdiet")


app.listen(process.env.PORT || "3000", function(){
    console.log("server is running")
});