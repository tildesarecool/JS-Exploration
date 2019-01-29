// code for player1car.png - section 7.66
var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 2;

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
	carPic.src = "img/player1car.png";

	carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function carReset() {
	for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == 2) {
				trackGrid[arrayIndex] = 0;
				carX = eachCol * TRACK_W + TRACK_W/2;
				carY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
}

// part of re-factoring in section 4

function carMove() {
    // carX += carSpeedX;
    // carY += carSpeedY;

    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;


    carAng += 0.02;
 
     if (carX  < 0 && carSpeedX < 0.0 ) {  // left -- modified in section 5.52
         carSpeedX *= -1;
     }
 
     if (carX > canvas.width && carSpeedX > 0.0 ) { // right -- modified in section 5.52
         carSpeedX *= -1;
     } 
 
     if (carY < 0 && carSpeedY < 0.0 ) {   // top -- modified in section 5.52
         carSpeedY *= -1;
     }
 
     if (carY > canvas.height) { // bottom
         carReset();
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

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
  
   if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
       carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isTrackAtColRow(carTrackCol, carTrackRow)) {

            var prevCarX = carX - carSpeedX;
            var prevCarY = carY - carSpeedY;
            var prevTrackCol = Math.floor(prevCarX / TRACK_W);
            var prevTrackRow = Math.floor(prevCarY / TRACK_H);
            
            var bothTestsFailed = true;

            if (prevTrackCol != carTrackCol) {
                if (isTrackAtColRow(prevTrackCol, carTrackRow) == false)
                {
                    carSpeedX *= -1
                    bothTestsFailed = false;
                }
                
                
            }

            if (prevTrackRow != carTrackRow) {
                if (isTrackAtColRow(carTrackCol, prevTrackRow) == false) {
                    carSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if (bothTestsFailed) { // "armpit case" - passes through corner with no bouncing (section 44, around 5min30 in)
                carSpeedX *= -1;
                carSpeedY *= -1;
            }
        } // end of track found
   } // end of valid col and row

} // end of carTrackHandling function




function moveAll() {
	 carMove();
	
	carTrackHandling();
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

    // colorCircle(carX,carY, 10, 'white'); // draw car
    
    if (carPicLoaded) {
        drawBitmapCenteredWithRotation(carPic, carX, carY);
    }

    drawTracks();
}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    // section 8.69: car spinning in place
    // this wasn't explained in detail, only the basics
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(carAng); // rotate on center of image
    canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2); //center image relative to self
    canvasContext.restore(); // forgets things since last save

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