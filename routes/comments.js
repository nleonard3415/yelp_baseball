const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Team = require('../models/team');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner= require('../utils/checkCommentOwner');

//new comment - show form
router.get("/comments/new", isLoggedIn, (req, res) =>{
	res.render("comments_new", {teamId: req.params.id})
})

//Create comment - Actually update DB
router.post("/comments", isLoggedIn, async (req, res) =>{
	//create comments
	try{
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		teamId: req.body.teamId
		});
		console.log(comment);
		res.redirect(`/teams/${req.body.teamId}`);
	}catch(err){
		console.log(err)
		res.send("broken again.... POST comments")
	}
})

//edit comment
router.get("/comments/:commentId/edit", checkCommentOwner, async (req, res)=>{
	try{
		const team = await Team.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("team: ", team);
		console.log("comment: ", comment);
		res.render("comments_edit", {team, comment});
	}catch(err){
		console.log(err);
		res.send("broke again.... Comment Edit GET")
	}
})

//Update
router.put("/comments/:commentId", checkCommentOwner, async (req, res)=>{
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		console.log(comment)
		res.redirect(`/teams/${req.params.id}`);
	}catch(err){
		console.log(err)
		res.send("broke comment PUT")
	}
})

//Delete
router.delete("/comments/:commentId", checkCommentOwner, async (req, res)=>{
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/teams/${req.params.id}`);
	}catch(err){
		console.log(err)
		res.send("broken comment DELETE")
	}
})




module.exports = router;