// 10.76: Constants for the arrow keys
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;     
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

/*
// moved to car.js
var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;
*/

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
	blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

// 16.121: finally consolidating/replacing the keycode stuff
function keySet(keyEvent, whichCar, setTo) {

	if(keyEvent.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_TurnLeft = setTo;
		
	}

	if (keyEvent.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_TurnRight = setTo;
	}

	if (keyEvent.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Gas = setTo;
	}

	if (keyEvent.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Reverse = setTo;
	}


/*

    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;


*/

}

// 10.75: code for grabbing key codes for press/release
// this could be converted to a switch/case, right?
// seems to capture all keystrokes, like f8
function keyPressed(evt) {
	// This console log still works for capturig key codes ( sect 16.121 )
	//console.log("Key pressed: "+evt.keyCode);

	keySet(evt, greenCar, true);
	keySet(evt, blueCar, true);


/*	 if(evt.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = true;
		
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = true;
		
	}
	if(evt.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = true;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse = true;
    }
    
*/

/**
 * keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;
 */

	evt.preventDefault();
}

function keyReleased(evt) {
    // console.log("Key pressed: "+evt.keyCode);
	keySet(evt, greenCar, false);
	keySet(evt, blueCar, false);


    /*
    if(evt.keyCode == KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = false;
		
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = false;
		
	}
	if(evt.keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = false;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
        keyHeld_Reverse = false;
    }
    */
}
