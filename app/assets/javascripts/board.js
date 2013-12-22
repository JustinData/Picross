var puzzleArray;
var lives = 5;
var shiftFlag = false;
var filledCount = 0
var filledThisGame = 0
var puzzleId = 0

function getPuzzleId(){
	var currentUrl = document.location.href;
	var currentPuzzle = currentUrl.substring(currentUrl.indexOf("s/")+2);
	puzzleId = parseInt(currentPuzzle);
}

function getPuzzle(){
	getPuzzleId();

	var getBoardUrl = "/json/puzzles/" + puzzleId + "/getboard" 
	$.ajax({
		url: getBoardUrl,
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
				checkCell(x, y, selectorId);
			});
			yi ++;
		});

		xi ++
	});
};

function checkCell(x, y, selectorId){
	// console.log(x, y);
	var cellValue = puzzleArray[y][x]
	if (cellValue === 1) {
		$("#" + selectorId).css("background-color", "#D5F7FF")
		filledThisGame ++;
		checkVictory();
	} else if (cellValue === 0) {
		$("#" + selectorId).css("background-color", "firebrick");
		lives = lives - 1;
		setLives(lives);
	}
	unbindListener(selectorId);
};

function unbindListener(selectorId){
	$("#" + selectorId).unbind();
}

function setVictory(){
	var getFilledUrl = 	 "/json/puzzles/" + puzzleId + "/getfilled"

	$.ajax({
		url:getFilledUrl,
		type: "GET",
		success: function(theResponse) {
			filledCount = theResponse[0];
		}
	});	
};

function setLives(n){
	$('#lives').text(n);
	checkDefeat(n)
}

function checkVictory() {
	if (filledThisGame === filledCount) {
		$('div').unbind();	
		showVictory();
	};
};

function checkDefeat(n) {
	if (n === 0) {
		$('div').unbind();
		showDefeat();
	}
};

function showVictory() {
	var xi = 0;
	_.each(puzzleArray, function(r){
		var partialId = "x" + xi + "y";
		var yi = 0;

		_.each(r, function(c){
			var selectorId = partialId + yi;
			var x = xi;
			var y = yi;
			
			var cellValue = puzzleArray[y][x]
			if (cellValue === 1) {
				$("#" + selectorId).css("background-color", "#D5F7FF");
			} else if (cellValue === 0) {
				$("#" + selectorId).css("background-color", "#071626");
			};
			$("#" + selectorId).css("border", "none");

			yi ++;
		});

		xi ++
	});
};

function showDefeat() {
	console.log("defeat");
};

// REFACTOR BOARD ITERATOR (getBoard, showVicotry, showDefeat)
// function applyEachCell(){}

// SHIFT LISTENER FOR MARKING CELLS NOT YET WORKING

// function setShiftListen(){
// 	$(document).keydown(function(e) {
//     	if(e.which == 16) {
//         	shiftFlag = true;
//         	console.log(shiftFlag);
//     	}
// 	});

// 	$(document).keyup(function(e) {
//     	if(e.which == 16) {
//         	shiftFlag = true;
//         	console.log(shiftFlag);
//     	}
// 	});
// }

window.onload = function(){
	getPuzzle();
	setLives(5);
	setVictory();
};


// keypress to work with 13 = enter
// $(document).keypress(function(e) {
//     if(e.which == 16) {
//         alert('You pressed enter!');
//     }
// });