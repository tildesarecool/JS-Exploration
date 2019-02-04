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

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = fileName;
}

function loadImages() {
    beginLoadingImage(carPic, "img/player1car.png");
    beginLoadingImage(roadPic, "img/track_road.png")
    beginLoadingImage(wallPic, "img/track_wall.png");
}