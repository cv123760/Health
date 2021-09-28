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
let port = 5000;


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
    username: String,
    password: String, 
    googleId: String,
    email: String,
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
    callbackURL: "http://localhost:5000/auth/google/health",
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
        res.sendFile(__dirname+"/public/mealplan/mealplan.html")
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
        res.sendFile(__dirname+"/public/mealplan/mealplan.html", {list: foundList})
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
    const Foods = {
        Protein:[
            '1% Lean Ground Turkey',
            'Chicken Breast',
            'Egg Whites',
            'Lean Beef', 
            'Turkey Breasts',
            'White Fish'
        ],
    
        Carb:[
            'Acai Berries',
            'Black Berries',
            'Black Rice',
            'Blue Berries',
            'Brown Rice',
            'Cous Cous',
            'Mango',
            'Oatmeal **',
            'Pineapple',
            'Quinoa',
            'Red Berries',
            'Starfruit',
            'Sweet Potato'
        ],
        Veggie:[
            'Asparragus',
            'Broccoli',
            'Brussel Sprouts',
            'Cucumber',
            'Kale',
            'Spinach',
            'Spring Mix'
        ]
    }
    console.log("requested")
    res.send(JSON.stringify(Foods))
})

app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/")
})


// ----post routes----
app.post("/getFoods", (req,res)=>{
    // save list to a constant
    const list = req.body.Foods

    // find user by id
    User.findById(req.user.id, (err, foundUser)=>{
        console.log("this is userID", req.user.id)

        if (err) { 
            console.log(err)
        } else {
            if (foundUser) {
                foundUser.lists = list // remenber to add lists key to User schema

                foundUser.save()
                res.redirect("mealPlan")
            }
        }
    });

    
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

if (port == null || port == "") {
  port = 8000;
}

app.listen(port);