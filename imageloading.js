var carPic = document.createElement("img");
var carPicLoaded = false;

var roadPic = document.createElement("img");
var wallPic = document.createElement("img");


function carImageLoad() {
    carPic.onload = function() {
        carPicLoaded = true;
    }
    carPic.src = "img/player1car.png"
}

function trackLoadImages() {
    roadPic.src = "img/track_road.png";
    wallPic.src = "img/track_wall.png";
}

function loadImages() {
    carImageLoad();
    trackLoadImages();
    
}