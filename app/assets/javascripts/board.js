var puzzleArray;
var lives = 5;
var shiftFlag = false;

function getPuzzle(){
	var currentUrl = document.location.href;
	var currentPuzzle = currentUrl.substring(currentUrl.indexOf("s/")+2);
	var puzzleId = parseInt(currentPuzzle);

	var urlToUse = "/json/puzzles/" + puzzleId + "/getboard" 
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
			
			$("#" + selectorId).mousedown(function(){
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
		$("#" + cellId).css("background-color", "#D5F7FF")
	} else if (cellValue === 0) {
		$("#" + cellId).css("background-color", "firebrick");
		lives = lives - 1;
		setLives(lives);
		unbindListener(cellId);
	}

};

function unbindListener(cellId){
	$("#" + cellId).unbind();
}

function setLives(n){
	lives = n
	$('#lives').text(n);
	if (lives === 0) {
		$('div').unbind();
	}
}

function setShiftListen(){
	$(document).keydown(function(e) {
    	if(e.which == 16) {
        	shiftFlag = true;
        	console.log(shiftFlag);
    	}
	});

	$(document).keyup(function(e) {
    	if(e.which == 16) {
        	shiftFlag = true;
        	console.log(shiftFlag);
    	}
	});
}

window.onload = function(){
	getPuzzle();
	setLives(5);
};


// keypress to work with 13 = enter
// $(document).keypress(function(e) {
//     if(e.which == 16) {
//         alert('You pressed enter!');
//     }
// });