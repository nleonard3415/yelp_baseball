const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//sign up -New
router.get('/signup', (req,res)=>{
	res.render('signup');
});

//sign up-Create
router.post('/signup', async (req,res)=>{
	try{
		const newUser = await User.register(new User(
			{
			username: req.body.username,
			email:req.body.email
			}
		),
		req.body.password);
		
		console.log(newUser);
		
		passport.authenticate('local')(req,res, ()=>{
			res.redirect('/teams');
		})
	}catch(err){
		console.log(err);
		res.send(err);
	}
});

//Login-Show
router.get("/login", (req,res)=>{
	res.render('login');
})

//Login
router.post("/login", passport.authenticate('local', {
	successRedirect: '/teams',
	failureRedirect: '/login'
}));

///Logout
router.get("/logout",(req,res)=>{
	req.logout();
	res.redirect('/teams');
})

module.exports = router;