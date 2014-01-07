var puzzleArray;
var lives = 5;
var shiftFlag = false;
var filledCount = 0;
var filledThisGame = 0;
var puzzleId = 0;

//  Gets he puzzle ID for the current puzzle from the current URL
//  Game ID will be used in the AJAX request to get the puzzle key
function getPuzzleId(){
	var currentUrl = document.location.href;
	var currentPuzzle = currentUrl.substring(currentUrl.indexOf("s/")+2);
	puzzleId = parseInt(currentPuzzle);
}

// Makes AJAX request to get the puzzle key, sends the puzzle key to the getArray() function
function getPuzzle(){
	getPuzzleId();

	var getBoardUrl = "/json/puzzles/" + puzzleId + "/getboard" 
	$.ajax({
		url: getBoardUrl,
		type: "GET",
		success: getArray
	});
};

//  Takes the puzzle key and assigns it to a variable
//  Iterates over the puzzle key to add an even listener to each cell
//  Event listeners each call checkCell() function
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

//  Called in event listener on cell clicks
//  Checks the cell's coordinate against the puzzle key 
//  If the cell is a correct guess, the cell is marked, the filled cell count for the current game in incremented for victory checks, and the checkVictory() function is called.
//  If the cell is an incorrect guess, the cell is marked, the life total is decreased, and the setLives() function is called to show the new life total on the game board.
function checkCell(x, y, selectorId){
	var cellValue = puzzleArray[y][x];
	var $thisCell = $("#" + selectorId);
	var fontSize = Math.floor($thisCell.height());
	var divString = "<div class='wrong' style='font-size:" + fontSize*.9 + "px'>X</div>"

	if (cellValue === 1) {
		$thisCell.html("<div class='fill'></div>");   //css("background-color", "#D5F7FF")
		filledThisGame ++;
		checkVictory();
	} else if (cellValue === 0) {
		$thisCell.html(divString);	//css("background-color", "firebrick");  
		lives = lives - 1;
		setLives(lives);
	}
	unbindListener(selectorId);
};



//  Called to unbind the listener on a cell that has been clicked.  Used for correct and incorrect guesses.
function unbindListener(selectorId){
	$("#" + selectorId).unbind();
}


//  Makes AJAX call to set the number for filled cells in the completed puzzle
//  Filled cell count is the variable comapred to for checking for victory
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

//  Sets the lives on the gameboard to lives remaining and calls the check for loss function
function setLives(n){
	$('#lives').text(n);
	checkDefeat(n)
}


//  Checks to see if the game has been won.
//  If game has been won all event listeners are removed and showVicotry() is called to indicate a victory
function checkVictory() {
	if (filledThisGame === filledCount) {
		$('div').unbind();	
		showVictory();
	};
};


//  Checks to to see if all lives have been used
//  Removes event listeners to prevent the player from continuing
function checkDefeat(n) {
	if (n === 0) {
		$('div').unbind();
		showDefeat();
	}
};


//  Changes game grid to show the finished puzzle
//  Call when game has been won
//  Refactor to call boardInterator()
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
			$("#" + selectorId).html("");
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
// WHEN UNCOMMENTED THE VARIABLE DECLARATION ON LINE ONE RECIEVES AN ERROR
//		UNEXPECTED END OF INPUT

// function setShiftListen(){
// 	$(document).keydown(function(e) {
//     	if(e.which == 16) {
//         	shiftFlag = true;
//         	console.log(shiftFlag);
//     	}
// 	})

// 	$(document).keyup(function(e) {
//     	if(e.which == 16) {
//         	shiftFlag = false;
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