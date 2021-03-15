const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("https")

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});


app.post("/", function(req, res){
    let name = req.body.password;
    console.log(name)

    const api = "https://jsonplaceholder.typicode.com/users";

    https.get(api, function(response){
        
    });
})


app.listen("3000", function(){
    console.log("server is running")
});