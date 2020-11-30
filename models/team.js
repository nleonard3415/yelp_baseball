const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	title: String,
	description: String,
	owner: String,
	manager: String,
	date: String,
	wins: Number,
	league: String,
	good: Boolean,
	image_link: String,
	creator: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	upvotes: [String],
	downvotes: [String]
});

teamSchema.index({
	'$**': 'text'
})

module.exports = mongoose.model("team", teamSchema);