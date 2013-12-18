var puzzleArray

function getPuzzle(){
	var currentUrl = document.location.href;
	var currentPuzzle = currentUrl.substring(currentUrl.indexOf("s/")+2);
	var puzzleId = parseInt(currentPuzzle);

	var urlToUse = "/json/puzzles/" + puzzleId + "/getboard" //" + 9 "
	$.ajax({
		url: urlToUse,
		type: "GET",
		success: getArray
	});
};

function getArray(serverResponse){
	puzzleArray = serverResponse[0];

	var xi = 0;
	_.each(puzzleArray, function(r){
		var partialId = "x" + xi + "y";
		var yi = 0;

		_.each(r, function(c){
			var selectorId = partialId + yi;
			var x = xi;
			var y = yi;
			
			$("#" + selectorId).click(function(){
				// console.log(selectorId)
				checkCell(x, y, selectorId);
			});
			yi ++;
		});

		xi ++
	});
};

function checkCell(x, y, cellId){
	console.log(x, y);
	var cellValue = puzzleArray[y][x]
	if (cellValue === 1) {
		$("#" + cellId).css("background-color", "white")
	} else if (cellValue === 0) {
		$("#" + cellId).css("background-color", "red")
	}

};

window.onload = function(){
	getPuzzle();
};