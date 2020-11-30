//=======================
//select elements
//=======================
const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");




//=======================
//add event listeners
//=======================
upvoteBtn.addEventListener("click", async function() {
	const options = {
		method: "POST",
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({vote: "up"})
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
})