var carPic = document.createElement("img");

var trackPics []; // could use = new Array instead

/*
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var goalPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");
*/

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}

function loadImages() {
	// next line is just an example, not using, will remove later
//	var dataSet = {varName: carPic, theFile: "img/player1car.png"};

	var imageList = [
		{varName: carPic,  theFile: "img/player1car.png"},

		{trackType: TRACK_ROAD, theFile: "img/track_road.png"},
		{trackType: TRACK_WALL, theFile: "img/track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "img/track_goal.png"},
		{trackType: TRACK_TREE, theFile: "img/track_tree.png"},
		{trackType: TRACK_FLAG, theFile: "img/track_flag.png"}
		];



	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if (imageList[i].varName != undefined ) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode(  imageList[i].trackType, imageList[i].theFile );
		}
	}
}


/* 
var goalPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");
*/

		/*
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

		*/