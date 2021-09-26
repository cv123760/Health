require('dotenv').config()
const bodyParser = require("body-parser")
const express = require("express");
const mongoose = require ("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate")

const app = express();

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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0.v19qs.mongodb.net/users", { useNewUrlParser: true  });

const userSchema = new mongoose.Schema ({ 
    username: String,
    password: String, 
    googleID: String
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
    callbackURL: "http://localhost:3001/auth/google/health",
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
        res.sendFile(__dirname+"/public/home.html")
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

app.get("/mealplan", (req,res)=>{
    if (req.isAuthenticated()){
        console.log("authenticated user")
        res.sendFile(__dirname+"/public/mealplan/mealplan.html")
    }else{
        res.redirect("/login")
    } 
});

app.get("/strength", (req,res)=>{
    if (req.isAuthenticated()){
        console.log("authenticated user")
        res.sendFile(__dirname+"/public/underConstruction.html")
    }else{
        res.redirect("/login")
    } 
});

app.get("/cardio", (req,res)=>{
    if (req.isAuthenticated()){
        console.log("authenticated user")
        res.sendFile(__dirname+"/public/underConstruction.html")
    }else{
        res.redirect("/login")
    } 

});

app.get("/logout", (req,res)=>{
    req.logout();
    console.log("loged out")
    res.redirect("/")
})



// ----post routes----
app.post("/foods", (req,res)=>{
    console.log(req)
});


app.post("/register", (req, res)=>{

    console.log(req.body.username)

    User.register({username: req.body.username}, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.redirect("/register")
        }else{
            passport.authenticate("local")(req,res, ()=>{
            res.redirect("/")
            })
        }
    })

});

app.post("/login", (req,res)=>{

    const user = new User({
        username: req.body.username,
        password: req.body.password
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


app.listen(process.env.PORT|| "3001")