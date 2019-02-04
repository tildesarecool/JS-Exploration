var carPic = document.createElement("img");
//var carPicLoaded = false;
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

var picsToLoad = 3; // 3 images to load above

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    console.log("value of picsToLoad is "+picsToLoad);
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }

}

function carImageLoad() {
    carPic.onload = countLoadedImagesAndLaunchIfReady;
    carPic.src = "img/player1car.png"
}

function trackLoadImages() {
    roadPic.onload = countLoadedImagesAndLaunchIfReady;
    wallPic.onload = countLoadedImagesAndLaunchIfReady;
    roadPic.src = "img/track_road.png";
    wallPic.src = "img/track_wall.png";
}

function loadImages() {
    carImageLoad();
    trackLoadImages();

}