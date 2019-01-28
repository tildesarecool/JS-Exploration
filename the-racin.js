// code for player1car.png - section 7.66
var carPic = document.createElement("img");
var carPicLoaded = false;

var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 5;

// 1/20/2019
// section 4
// since re-factoring is happening I split into separate file
// which git is upposed to make unnecessary but i did it anyway

const TRACK_W = 40;
const TRACK_H = 40; 
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15; 


// 1 and 0s instead of true/false
// coulse also use other numbers for different assets like flags or trees
// so this is a semi-visual way to layout the track
var trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


var trackLeft = 0;

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);

	carPic.onload = function() {
		carPicLoaded = true;
	}
	carPic.src = "player1car.png";

	ballReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == 2) {
				trackGrid[arrayIndex] = 0;
				ballX = eachCol * TRACK_W + TRACK_W/2;
				ballY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
}

// part of re-factoring in section 4

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
 
     if (ballX  < 0 && ballSpeedX < 0.0 ) {  // left -- modified in section 5.52
         ballSpeedX *= -1;
     }
 
     if (ballX > canvas.width && ballSpeedX > 0.0 ) { // right -- modified in section 5.52
         ballSpeedX *= -1;
     } 
 
     if (ballY < 0 && ballSpeedY < 0.0 ) {   // top -- modified in section 5.52
         ballSpeedY *= -1;
     }
 
     if (ballY > canvas.height) { // bottom
         ballReset();
       //  trackReset(); // added section 5.49
     }
}

function isTrackAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROWS) {

        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == 1);
        
    } else {
        return false;
    }
}

function ballTrackHandling() {
    var ballTrackCol = Math.floor(ballX / TRACK_W);
    var ballTrackRow = Math.floor(ballY / TRACK_H);
    var trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);
  
   if (ballTrackCol >= 0 && ballTrackCol < TRACK_COLS &&
       ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS) {

        if (isTrackAtColRow(ballTrackCol, ballTrackRow)) {

            var prevBallX = ballX - ballSpeedX;
            var prevBallY = ballY - ballSpeedY;
            var prevTrackCol = Math.floor(prevBallX / TRACK_W);
            var prevTrackRow = Math.floor(prevBallY / TRACK_H);
            
            var bothTestsFailed = true;

            if (prevTrackCol != ballTrackCol) {
                if (isTrackAtColRow(prevTrackCol, ballTrackRow) == false)
                {
                    ballSpeedX *= -1
                    bothTestsFailed = false;
                }
                
                
            }

            if (prevTrackRow != ballTrackRow) {
                if (isTrackAtColRow(ballTrackCol, prevTrackRow) == false) {
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if (bothTestsFailed) { // "armpit case" - passes through corner with no bouncing (section 44, around 5min30 in)
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        } // end of track found
   } // end of valid col and row

} // end of ballTrackHandling function




function moveAll() {
	 ballMove();
	
	ballTrackHandling();
}

function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}


function drawTracks() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for ( var eachCol = 0; eachCol < TRACK_COLS; eachCol++ ) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if ( trackGrid[arrayIndex] == 1 ) { 
                colorRect(TRACK_W * eachCol,TRACK_H*eachRow, TRACK_W-TRACK_GAP,TRACK_H - TRACK_GAP, 'blue');
            }
               
        }
    }
}


function drawAll() {
    
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

    // colorCircle(ballX,ballY, 10, 'white'); // draw ball
    
    if (carPicLoaded) {
        canvasContext.drawImage(carPic, 
            ballX - carPic.width / 2,
            ballY - carPic.height / 2);
    }

    drawTracks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle= fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}