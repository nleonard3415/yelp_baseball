const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkTeamOwner= require('../utils/checkTeamOwner');


router.get("/", async(req, res)=>{
	console.log(req.user);
	try{
		const teams = await Team.find().exec();
		res.render("teams", {teams});
	}catch(err) {
		console.log(err);
		res.send("you broke it.... /index")
	}
	
})

router.post("/", isLoggedIn, async (req, res)=>{
	//console.log(req.body);
	const league = req.body.league.toLowerCase();
	const newTeam = {
		title: req.body.title,
		description: req.body.description,
		owner: req.body.owner,
		manager: req.body.manager,
		date: req.body.date,
		wins: req.body.wins,
		league,
		good: !!req.body.good,
		image_link: req.body.image_link,
		creator: {
			id: req.user._id,
			username: req.user.username
		},
		upvotes: [req.user.username],
		downvotes: []
	}
	
	try{
		const team = await Team.create(newTeam);
		req.flash("success", "Team Created");
		res.redirect("/teams/" + team._id);
	}catch(err){
		req.flash("error", "error creating flash");
		res.redirect("/teams");
	}
})

router.get("/new",isLoggedIn, (req, res)=> {
	res.render("teams_new")
});

router.get("/search", async (req, res)=>{
	try{
		const teams = await Team.find({
		$text: {
			$search: req.query.term
		}
	})
		res.render("teams", {teams});
	}catch(err){
		console.log(err)
		res.send("broken search")
	}
})

//League
router.get("/league/:league", async (req,res)=>{
	const validLeagues = ["american league","national league"];
	if(validLeagues.includes(req.params.league.toLowerCase())) {
		const teams = await Team.find({league: req.params.league}).exec();
		res.render("teams", {teams});
	}else{
		res.send("please enter a valid league")
	}
});

router.post("/vote", isLoggedIn, (req,res)=>{
	console.log(req.body);
	res.json({
		message:"voted!"
	})
})

router.get("/:id", async (req,res) =>{
	try{
		const team = await Team.findById(req.params.id).exec();
		const comments = await Comment.find({teamId: req.params.id}).exec();
		res.render("teams_show", {team, comments});
	}catch(err){
		console.log(err);
		res.send("you broke it .... /teams/:id");
	}
	
})

router.get("/:id/edit", checkTeamOwner, async (req, res) =>{
		const team = await Team.findById(req.params.id).exec();
})

router.put("/:id", checkTeamOwner, async (req, res)=>{
	const league = req.body.league.toLowerCase();
	const updatedTeam = {
		title: req.body.title,
		description: req.body.description,
		owner: req.body.owner,
		manager: req.body.manager,
		date: req.body.date,
		wins: req.body.wins,
		league,
		good: !!req.body.good,
		image_link: req.body.image_link
	}
	try{
		const team = await Team.findByIdAndUpdate(req.params.id, updatedTeam, {new: true}).exec();
		req.flash("succes", "Team updated")
		res.redirect(`/teams/${req.params.id}`)
	}catch(err){
		req.flash("error", "error updating team")
		res.redirect("/teams")
	}
})

router.delete("/:id", checkTeamOwner, async (req, res)=>{
	
	try{
		const deletedTeam = await Team.findByIdAndDelete(req.params.id).exec()
		req.flash("success", "Team Deleted");
		res.redirect("/teams");
	}catch(err){
		req.flash("error", "Error deleting team")
		res.redirect("back")
	}
})



module.exports = router;