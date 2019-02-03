// section 11.86
// These functions can be used generically across a number of
// different applications/games so they are seperated into a
// different file

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