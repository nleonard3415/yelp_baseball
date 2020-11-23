//===========================================================
//Imports
//============================================================
//npm imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//config imports
try{
	var config = require('./config');
}catch(e){
	console.log("could not import config");
	console.log(e);
}


//route imports
const teamRoutes = require('./routes/teams');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

//Model Imports
const Team = require('./models/team');
const Comment = require('./models/comment');
const User = require('./models/user');

const mongoose = require('mongoose');
//========================================================
//Development
//====================================================
//morgan
app.use(morgan('tiny'));

//seed to DB
// const seed = require("./utils/seed");
// seed();


//========================================================
//Config
//====================================================

//Connect to DB
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}catch(e){
	console.log("could not connect using config.This probably means you are not working locally");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}


//Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

//Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

//Body Parder
app.use(bodyParser.urlencoded({extended: true}));

//Method override
app.use(methodOverride('_method'));

//connect flash
app.use(flash());

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//State config
app.use((req, res, next)=>{
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

//Use routes config 
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/teams",teamRoutes);
app.use("/teams/:id", commentRoutes);

//========================================================
//Listen
//====================================================
app.listen(process.env.PORT || 3000, () =>{
	console.log("yelp_baseball is running...");
});