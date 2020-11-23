const Team = require('../models/team');
const Comment = require('../models/comment')

//Delete all Current Teams

//Create 3 new teams

//create new comment

const team_seeds=[
	{	
	title:"Red Sox",
	description: "American League MLB team based out of Boston, Mass.",
	owner:"John Henry",
	manager:"Ron Roenicke",
	date:"1901-08-15",
	wins:24,
	league:"american league",
	good:true,
	image_link:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Boston_Red_Sox_cap_logo.svg/1200px-Boston_Red_Sox_cap_logo.svg.png"
	},
	{	
	title:"Yankees",
	description: "American League MLB team based out of New York City",
	owner:"Harold Steinbrenner",
	manager:"Aaron Boone",
	date:"1903-01-09",
	wins:37,
	league:"american league",
	good:true,
	image_link:"https://upload.wikimedia.org/wikipedia/en/2/25/NewYorkYankees_PrimaryLogo.svg"
	},
	{	
	title:"Dodgers",
	description: "Natioal League MLB team based out of Los Angeles, Cali.",
	owner:"Guggenheim Baseball Management",
	manager:"Dave Roberts",
	date:"1883-02-15",
	wins:43,
	league:"national league",
	good:true,
	image_link:"https://thumbor.forbes.com/thumbor/fit-in/0x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fi.forbesimg.com%2Fmedia%2Flists%2Fteams%2Flos-angeles-dodgers_416x416.jpg"
	}
]
const seed = async () =>{
	//Delete all Current Teams
	await Team.deleteMany();
	console.log("deleted All the teams")
	//Create 3 new teams
	await Comment.deleteMany();
	console.log("deleted all the comments")
	//create new comment
	// for (const team_seed of team_seeds) {
	// 	let team = await Team.create(team_seed);
	// 	console.log("Created a new team" , team.title)
	// 	await Comment.create({
	// 		text: "I love this team",
	// 		user: "MLB fan",
	// 		teamId: team._id
	// 	})
	// 	console.log("created a new comment")
	// }
}

module.exports = seed;