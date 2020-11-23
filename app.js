//===========================================================
//Imports
//============================================================
//npm imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

//config imports
const config = require('./config');

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
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

//Express Session Config
app.use(expressSession({
	secret: "jnvoqidjcowqicbsodincskdojcnsodicnowidjncaidwcnsdoaicjnasdoicjnsdoicjnasdoicjnsdaoic",
	resave: false,
	saveUninitialized: false
}));

//Body Parder
app.use(bodyParser.urlencoded({extended: true}));

//Method override
app.use(methodOverride('_method'));

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//Current User middleware config
app.use((req, res, next)=>{
	res.locals.user = req.user;
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
app.listen(3000, () =>{
	console.log("yelp_baseball is running...");
});