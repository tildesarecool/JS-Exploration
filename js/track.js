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
var trackGrid = 
   [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4
];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;


function isObstacleAtColRow(col, row) {
	if(col >= 0 && col < TRACK_COLS &&
		row >= 0 && row < TRACK_ROWS) {
		 var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		 return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
	} else {
		return false;
	}
}



    function carTrackHandling(whichCar) {
        var carTrackCol = Math.floor(whichCar.x / TRACK_W);
        var carTrackRow = Math.floor(whichCar.y / TRACK_H);
        var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
      
       if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
           carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    
            if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
                whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
                whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
                
                whichCar.speed *= -0.5; 
    
            } // end of track found
       } // end of valid col and row
    
    } // end of carTrackHandling function

function rowColToArrayIndex(col, row) {
        return col + TRACK_COLS * row;
    }

function drawTracks() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for ( var eachCol = 0; eachCol < TRACK_COLS; eachCol++ ) {
    
            
            var tileKindHere = trackGrid[arrayIndex];
            var useImg = trackPics[tileKindHere]; // one line replaces switch statement
            canvasContext.drawImage(useImg, drawTileX,drawTileY); 

            drawTileX += TRACK_W;


            arrayIndex++;
        } // end of each col
        drawTileY += TRACK_H;
        drawTileX = 0;
    } // end of each row
}
    

