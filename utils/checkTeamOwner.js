const Team = require('../models/team');

const checkTeamOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const team = await Team.findById(req.params.id).exec();
		
		if(team.creator.id.equals(req.user._id)){
			next();
		}else{
			req.flash("error", "you dont have permission to do that")
			res.redirect("back");
		}
	}else{
		req.flash("error", "you must be logged in to do that")
		res.redirect("/login");
	}
}

module.exports = checkTeamOwner;