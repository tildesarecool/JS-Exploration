var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();


window.onload = function() {
	canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    colorRect(0,0, canvas.width,canvas.height, 'black'); // shows as loading, could display message/loading/whatever
    colorText("LOADING IMAGES...", canvas.width/2, canvas.height/2, 'white');

    loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	loadLevel(levelOne);
}
 
function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice();
    greenCar.reset(otherCarPic, "Green Machine");
    blueCar.reset(carPic, "Blue Storm");

    //this can be used to set random part of gride map array 
    //  to a tile type like a flag or tree
    //levelOne[30] = 4;
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
    
    // these calls to be replaced/consolidated in car.js
    // carTrackHandling(greenCar);
	// carTrackHandling(blueCar);
}

// clear screen no longer needed (12.93)
/*
function clearScreen() {
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
}
*/
function drawAll() {
    
    //clearScreen();
    drawTracks();
    greenCar.draw();
   // blueCar.draw();
    
    
}
