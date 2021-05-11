const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("https");
const mongoose = require("mongoose");
const { link } = require("fs");
const { getMaxListeners } = require("process");


// link to mongoDB
mongoose.connect('mongodb+srv://cv123760:egbdf777@cluster0.xlmyt.mongodb.net/usersDB', {useNewUrlParser: true})

// create a new user schema 
const newUserschema = {
    name: String, 
    email: String, 
    password: String
}

// create a users collection
const User = mongoose.model("User", newUserschema)

// use public folder for static files
app.use(express.static("public"))


app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});



// javascript files and css photos
app.get("/diet", function(req, res){
    res.sendFile(__dirname+"/diet.js")
});
app.get("/food", function(req, res){
    res.sendFile(__dirname+"/food.js")
});
app.get("/prep", function(req, res){
    res.sendFile(__dirname+"/prep.js")
});
app.get("/intervals", function(req, res){
    res.sendFile(__dirname+"/intervals.js")
});
app.get("/register", function(req, res){
    res.sendFile(__dirname+"/public/register.html")
});


// Login POST 
app.post("/", function(req, res){

    // get user input info
    const email = String(req.body.email)
    const password = req.body.password

    // find user info in database
    const currentUser = User.findOne({ email: email },function(err, currentUser){
        
        // check username and password
        if (!currentUser){
            res.redirect("/register")
        }else if (email === currentUser.email && password === currentUser.password) {
        
            res.sendFile(__dirname+"/public/main.html")
        }else {
            console.log("invalid log in")
            res.redirect("/")
        }
    });
});

// register
app.post("/register", function (req, res){
        const newEmail = String(req.body.email)
        const newPassword = req.body.password
        const retypePassword = req.body.retypePassword
        const newName = req.body.name


    // create new user 
    if (newPassword == retypePassword){
        const newUser = new User({
            name: newName, 
            email: newEmail, 
            password: newPassword
        });
        newUser.save()

    } else {
        res.redirect("/")
    }

    

    res.sendFile(__dirname+"/public/main.html")
});



// port numnber
app.listen(process.env.PORT || '3000', function(){
    console.log("server is running")
});
