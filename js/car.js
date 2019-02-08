// code for player1car.png - section 7.66
// start section 9: 1/28/2019

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.05;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
// sect 16.115: converting to class
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;




    this.reset = function() {

        for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
                if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    carAng = -Math.PI / 2;
                    carX = eachCol * TRACK_W + TRACK_W/2;
                    carY = eachRow * TRACK_H + TRACK_H/2;
                } //end of playert start if
            } // end of col for 
        } // end of row for
    } // end of carReset func


    this.move = function  () {

        carSpeed *= GROUNDSPEED_DECAY_MULT;

        if (keyHeld_Gas) {
            carSpeed += DRIVE_POWER;
        }
        if (keyHeld_Reverse) {
            carSpeed -= REVERSE_POWER;
        }

        if (Math.abs(carSpeed) > MIN_SPEED_TO_TURN ) {

            if (keyHeld_TurnLeft) {
                carAng -= TURN_RATE;
            }

            if (keyHeld_TurnRight) {
                carAng += TURN_RATE;
            }
        }
    // sect 8.71 and 72: something something trigonometry?
        carX += Math.cos(carAng) * carSpeed;
        carY += Math.sin(carAng) * carSpeed;
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }
}
