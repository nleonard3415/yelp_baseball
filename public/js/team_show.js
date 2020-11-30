//=======================
//select elements
//=======================
const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");


//=======================
//hgelper function
//=======================
const sendVote = async (voteType) =>{
	const options = {
		method: "POST",
		headers: {
			'Content-type': 'application/json'
		}
	}
	
	if(voteType === "up"){
		options.body = JSON.stringify({
			voteType: "up",
			teamId
		});
	}else if (voteType === "down"){
		options.body = JSON.stringify({
			voteType: "down",
			teamId
		});
	}else{
		throw "voteType must be 'up' or 'down'"
	}
	await fetch("/teams/vote", options)
	.then(data=>{
		return data.json()
	})
	.then(res =>{
		console.log(res)
	})
	.catch(err =>{
		console.log(err)
	})
}

//=======================
//add event listeners
//=======================
upvoteBtn.addEventListener("click", async function() {
	sendVote("up")
})

downvoteBtn.addEventListener("click", async function() {
	sendVote("down")
})