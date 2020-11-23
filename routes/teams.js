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
		}
	}
	
	try{
		const team = await Team.create(newTeam);
		console.log(team);
		res.redirect("/teams/" + team._id);
	}catch(err){
		console.log(err);
		res.send("you broke it .... /index");
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
		const team = await Team.findByIdAndUpdate(req.params.id, updatedTeam, {new: true}).exec()
		res.redirect(`/teams/${req.params.id}`)
	}catch(err){
		console.log(err);
		res.send("you broke it .... /teams/:id PUT")
	}
})

router.delete("/:id", checkTeamOwner, async (req, res)=>{
	
	try{
		const deletedTeam = await Team.findByIdAndDelete(req.params.id).exec()
		console.log("Deleted: ", deletedTeam);
		res.redirect("/teams");
	}catch(err){
		console.log(err);
		res.send("you broke it .... /teams/:id DELETE");
	}
})



module.exports = router;