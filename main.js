var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 5;

// This is 2.19 in series (1/11/2019) 
// this part will be replaced with arrays version later

// 1/18/2019 - made it to 2.26
// 1/18/2019 - made it to 3.28: separated the HTML file from the JS file even though the instructor hadn't suggested it
// some how just makes it feel better this way.




const BRICK_W = 100;
const BRICK_H = 50;
const BRICK_GAP = 2;
const BRICK_COUNT = 8;
const BRICK_ROWS = 4;


// replacing this line with a "new Array()" line to auto-generate bricks
//var brickGrid = [ true, true, true, true ];
// shorthand for the varialbes version, can do brickgrid[0] = false

// Also function brickReset is new with this below
var brickGrid = new Array(BRICK_COUNT);



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
    for ( var i = 0; i < BRICK_COUNT; i++) {
            // this is supposed to help later for vertical grid
            /*if ( Math.random() < 0.5) {
                brickGrid[i] = true;
            } else {
                brickGrid[i] = false;
            } */ // end else
            brickGrid[i] = true;
    } // end for-loop for bricks
    // just a little confirming
    //brickGrid[5] = false;
} // end function 


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

function moveAll() {
   ballX += ballSpeedX;
   ballY += ballSpeedY;

    if (ballX  < 0 ) {  // left
        ballSpeedX *= -1;
    }

    if (ballX > canvas.width) { // right
        ballSpeedX *= -1;
    }


///////////////////////////////////////////////////////////////


    if (ballY < 0 ) {   // top
        ballSpeedY *= -1;
    }

    if (ballY > canvas.height) { // bottom
        ballReset();
    }

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

   console.log("X is " + ballX);
   console.log(" while Y is " + ballY);
}

function drawBricks() {
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for ( var i = 0; i < BRICK_COUNT; i++ ) {
            if ( brickGrid[i]) { 
                colorRect(BRICK_W * i,BRICK_H*eachRow, BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP, 'blue');
            }
               
        }
    }
}
/*    for (var i = 0; i < BRICK_COUNT; i++) {
        if ( brickGrid[i]) {
            colorRect(BRICK_W * i,BRICK_H, BRICK_W-BRICK_GAP,BRICK_H - BRICK_GAP, 'blue');
        }
    }*/


function drawAll() {
    
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen

	colorCircle(ballX,ballY, 10, 'white'); // draw ball

	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE,
                PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
                
    drawBricks();

    // Added at 3.37 - two variables and modifed the colorText call; 
    // apparently this is related to the text that shows next to the mouse cursor
    var mouseBrickCol = mouseX / BRICK_W;
    var mouseBrickRow = mouseY / BRICK_H;
	colorText(mouseBrickCol+","+mouseBrickRow, mouseX, mouseY, 'yellow');
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