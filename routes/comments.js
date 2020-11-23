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
		req.flash("success", "Comment created")
		res.redirect(`/teams/${req.body.teamId}`);
	}catch(err){
		req.flash("error", "error creating comment")
		res.redirect("/teams")
	}
})

//edit comment
router.get("/comments/:commentId/edit", checkCommentOwner, async (req, res)=>{
	try{
		const team = await Team.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		
		res.render("comments_edit", {team, comment});
	}catch(err){
		res.redirect("/teams")
	}
})

//Update
router.put("/comments/:commentId", checkCommentOwner, async (req, res)=>{
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		req.flash("success", "Edited comment");
		res.redirect(`/teams/${req.params.id}`);
	}catch(err){
		console.log(err)
		req.flash("error", "Error editing comment")
		res.redirect("/teams")
	}
})

//Delete
router.delete("/comments/:commentId", checkCommentOwner, async (req, res)=>{
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success", "comment deleted")
		res.redirect(`/teams/${req.params.id}`);
	}catch(err){
		req.flash("error", "error deleting comment")
		res.redirect("/teams")
	}
})




module.exports = router;