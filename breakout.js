var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 5;

// 1/20/2019
// section 4
// since re-factoring is happening I split into separate file
// which git is upposed to make unnecessary but i did it anyway

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;



var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);



///////////////////////////////////////////////////

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;
}

function brickReset() {
    for ( var i = -1; i < BRICK_COLS * BRICK_ROWS; i++) {
            // this is supposed to help later for vertical grid
         
                brickGrid[i] = true;
           
           // brickGrid[i] = true;
    } // end for-loop for bricks
    // just a little confirming
    // brickGrid[16] = false;
}   // end function 


window.onload = function() {
    //var ballX = 0;
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

// part of re-factoring in section 4

function ballMove() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
 
     if (ballX  < 0 ) {  // left
         ballSpeedX *= -1;
     }
 
     if (ballX > canvas.width) { // right
         ballSpeedX *= -1;
     } 
 
     if (ballY < 0 ) {   // top
         ballSpeedY *= -1;
     }
 
     if (ballY > canvas.height) { // bottom
         ballReset();
     }
}

function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_W);
    var ballBrickRow = Math.floor(ballY / BRICK_H);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
   // colorText(ballBrickCol+","+ballBrickRow+":"+brickIndexUnderBall, mouseX, mouseY, 'yellow');
  
   if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
       ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

        if (brickGrid[brickIndexUnderBall]) {
            brickGrid[brickIndexUnderBall] = false;
            ballSpeedY *= -1;
        } // end of brick found
   } // end of valid col and row

} // end of ballBrickHandling function

function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;

    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

    if ( ballY > paddleTopEdgeY &&  // below the top of paddle
         ballY < paddleBottomEdgeY &&   //  above bottom of paddle
         ballX > paddleLeftEdgeX &&   //  right of the left side of paddle
         ballX < paddleRightEdgeX ) {  //  left of the right side of paddle

         ballSpeedY *= -1;

         var centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
         var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
         ballSpeedX = ballDistFromPaddleCenterX * 0.35;

         }

}


function moveAll() {
   
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}


function drawBricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for ( var eachCol = 0; eachCol < BRICK_COLS; eachCol++ ) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if ( brickGrid[arrayIndex]) { 
                colorRect(BRICK_W * eachCol,BRICK_H*eachRow, BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP, 'blue');
            }
               
        }
    }
}


function drawAll() {
    
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

	colorCircle(ballX,ballY, 10, 'white'); // draw ball

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
                PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
                
    drawBricks();


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