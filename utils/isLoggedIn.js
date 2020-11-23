
const isLoggedIn=(req,res,next)=> {
	if(req.isAuthenticated()){
		return next();
	}else{
		req.flash("error", "Hey you must be loggin in to that G");
		res.redirect("/login");
	};
};

module.exports = isLoggedIn