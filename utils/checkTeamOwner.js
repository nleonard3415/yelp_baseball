const Team = require('../models/team');

const checkTeamOwner = async (req,res,next) =>{
	if(req.isAuthenticated()){
		const team = await Team.findById(req.params.id).exec();
		
		if(team.creator.id.equals(req.user._id)){
			next();
		}else{
			res.redirect("back");
		}
	}else{
		res.redirect("/login");
	}
}

module.exports = checkTeamOwner;