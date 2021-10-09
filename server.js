require('dotenv').config()
const bodyParser = require("body-parser")
const express = require("express");
const mongoose = require ("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

const url = "http://localhost:5000"


app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }))

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0.v19qs.mongodb.net/users", { useNewUrlParser: true  });

const userSchema = new mongoose.Schema ({ 
    googleId: String,
    lists: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)


const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://"+url+"/auth/google/health",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// ----get routes----

app.get("/", (req, res)=>{
    if (req.isAuthenticated()){
        User.findById(req.user.id, (err, foundUser)=>{

            if (err){
                console.log(err);
            } else {
                const Foods = foundUser.lists
                res.redirect("meal-plan")
            };
        });
    }else{
        res.redirect("/login")
    }



})

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/health", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect("/");
    });
    
app.get("/login", (req,res)=>{
    res.sendFile(__dirname+"/public/login.html")
} );

app.get("/register", (req,res)=>{
    res.sendFile(__dirname+"/public/register.html")
} );

app.get("/meal-plan", (req,res)=>{
    if (req.isAuthenticated()){
        res.sendFile(__dirname+"/public/meal-plan/meal-plan.html")
    }else{
        res.redirect("/login")
    } 
});

app.get("/strength", (req,res)=>{
    if (req.isAuthenticated()){
        res.sendFile(__dirname+"/public/underConstruction.html")
    }else{
        res.redirect("/login")
    } 
});

app.get("/cardio", (req,res)=>{
    if (req.isAuthenticated()){
        res.sendFile(__dirname+"/public/underConstruction.html")
    }else{
        res.redirect("/login")
    } 

});

app.get("/getFoods", (req,res)=>{
    let list = {}

    // set list to guest list
    User.findById("6161cfed648a24edd23399a1", (err, foundUser)=>{
        if (err){
            console.log(err);
        } else {
            lists = foundUser.lists
        };
    });

    User.findById(req.user.id, (err, foundUser)=>{
        if (err){
            console.log(err);
        } else {

            // if user has save data set list to user list
            if (foundUser.lists){lists = foundUser.lists}
            res.send(lists)
        };
    });
});




app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/")
})









// ----post routes----
app.post("/getFoods", (req,res)=>{
    // save list to a constant

    const list = req.body.data
    console.log (list)

    // find user by id

    User.findById(req.user.id, (err, foundUser)=>{
         if (err) { 
            console.log(err)
        } else {
            if (foundUser) {
                foundUser.lists = list // remenber to add lists key to User schema

                foundUser.save()
                res.redirect("meal-plan")
            }
        }
    });

    
});


app.post("/login", (req,res)=>{
    console.log (req.body.user)


    const user = new User({
        username: req.body.username,
        password: req.body.password, 
    });

    req.login(user, err=>{
        if (err){
            console.log(err);
        }else{
            passport.authenticate("local")(req,res, ()=>{
                res.redirect("/")
                })
            }
    });

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port);