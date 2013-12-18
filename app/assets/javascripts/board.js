var puzzleArray

function getPuzzle(){
	urlToUse = "/json/puzzles/9/getboard" //" + 9 "
	$.ajax({
		url: urlToUse,
		type: "GET",
		success: getArray
	});
};

function getArray(serverResponse){
	puzzleArray = serverResponse[0];
}

window.onload = function(){
	getPuzzle();
}