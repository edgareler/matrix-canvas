var canvas, context, screenWidth, screenHeight, animationSetInterval, fpsSetInterval, traceWidth,
        traceHeight, traceScreenWidth, traceScreenHeight, traceScreenTopX, traceScreenTopY;

var phrases = Array("Do you believe in everything that you hear?",
        "Do you believe that this is reality?",
        "Do you think that I'm real?",
        "I'm a Canvas experiment.",
        "You can trust me.",
        "Or not.",
        "It's your choice.",
        "So rethink your life.",
        "Know your destiny.",
        "Get in touch with God."
        );

var phraseIndex = 0;

var frameRate = 60;

var interval = parseInt(1000 / frameRate);

var blinker = {x: 30, y: 30, w: 24, h: 30};

var blinkerCount = 0;

var text = {x: 30, y: 30};

var letterWidth = 16;

var letterHeight = 30;

var letterRate = 25;

var letterInterval = parseInt(1000 / letterRate);

var letterCounter = 0;

var typing = false;

var typeTime = 2;

var waitingTime = 2;

var tmpTime = -1;

var blank = {x: 10, y: 10, w: (phrases[phraseIndex].length * letterWidth) + 40, h: 80};

var timer = 0;

var partialCounter = 0;

var totalCounter = 0;

var frames = 0;

var counter = 0;

var trace = Array();

var traceAux = Array();

var traceLight = Array();

var traceAuxIndex = 0;

var traceEraseTime = 2;

var traceErrorTime = 6;

var traceScale = 1;

var traceScaleIncrease = 0.0001;

var failure = {x: 0, y: 0, w: 246, h: 50};

var qtyColsToRemove = 0;

var qtyRowsToRemove = 0;

var courier26 = 'bold 26px "Courier New"';

var courier30 = 'bold 30px "Courier New"';

//var japanese26 = 'bold 36px JapanEast';

var japanese26 = 'bold 30px JapanGothic';

var rainMatrix = Array();

function resetSizes() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.setAttribute("width", screenWidth);
    canvas.setAttribute("height", screenHeight);

    traceScreenWidth = parseInt(screenWidth * 1);
    traceScreenHeight = parseInt(screenHeight * 1);

    traceScreenTopX = parseInt((screenWidth - traceScreenWidth));
    traceScreenTopY = parseInt((screenHeight - traceScreenHeight));

    traceWidth = traceScreenWidth / (letterWidth + 24);
    traceHeight = traceScreenHeight / 32;

    trace = createRandomMatrix(traceHeight, traceWidth);
    traceAux = createRandomMatrix(traceHeight, traceWidth);

    failure.x = parseInt((screenWidth - failure.w) / 2);
    failure.y = parseInt((screenHeight - failure.h) / 2);
}

function draw() {
    context.clearRect(0, 0, screenWidth, screenHeight);

    /*
     if(timer === typeTime){
     typing = true;
     }
     
     if(typing === true){
     letterCounter += interval;
     
     if(letterCounter >= letterInterval && blank.w > 20){
     if(blank.x === 10){
     blank.x = 30;
     blank.w -= 30;
     }
     
     blank.x += letterWidth;
     blank.w -= letterWidth;
     
     blinker.x += letterWidth;
     
     letterCounter = 0;
     } else if(blank.w <= 20){
     typing = false;
     tmpTime = timer;
     }
     } else if(tmpTime !== -1 && (timer - tmpTime) > waitingTime){
     if(phrases.length > phraseIndex + 1){
     phraseIndex++;
     typeTime = timer + 0;
     
     tmpTime = -1;
     
     blank.x = 10;
     blank.y = 10;
     blank.w = (phrases[phraseIndex].length * letterWidth) + 40;
     blinker.x = 30;
     }
     }
     
     //Text
     context.save();
     
     context.translate(text.x, text.y);
     
     context.shadowColor = "#35E161";
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
     context.shadowBlur = 30;
     context.fillStyle = "#CDFCD5";
     context.font = "bold 26px Courier New";
     context.textBaseline = "top";
     
     context.fillText(phrases[phraseIndex], 0, 0);
     
     context.restore();
     
     //Blank
     context.save();
     
     context.translate(blank.x, blank.y);
     
     context.fillRect(0, 0, blank.w, blank.h);
     
     context.restore();
     
     //Blinker
     if(blinkerCount < 300 || typing === true){
     context.save();
     
     context.translate(blinker.x, blinker.y);
     
     context.shadowColor = "#35E161";
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
     context.shadowBlur = 30;
     
     context.fillStyle = "#CDFCD5";
     context.fillRect(0, 0, blinker.w, blinker.h);
     
     context.restore();
     
     blinkerCount += interval;
     } else {
     blinkerCount += interval;
     
     if(blinkerCount >= 600) {
     blinkerCount = 0;
     }
     }
     */

    /*
     //Tracing
     if(timer < traceErrorTime) {
     trace.pop();
     
     if(traceAuxIndex + 1 >= traceAux.length){
     traceAuxIndex = 0;
     } else {
     traceAuxIndex++;
     }
     
     trace.unshift(traceAux[traceAuxIndex]);
     
     traceLight = Array();
     
     traceLight = createZeroMatrix(traceHeight,traceWidth);
     }
     
     context.save();
     
     if(timer > traceErrorTime + 1) {
     traceScale += traceScaleIncrease;
     
     traceScaleIncrease += 0.0001;
     
     //var novoX = traceScreenTopX - (((traceScreenWidth * traceScale) - traceScreenWidth) / 2);
     var novoX = parseInt((((screenWidth * traceScale) - screenWidth) / 2) * (-1));
     //var novoY = traceScreenTopY - (((traceScreenHeight * traceScale) - traceScreenHeight) / 2);
     var novoY = parseInt((((screenHeight * traceScale) - screenHeight) / 2) * (-1));
     
     context.translate(novoX, novoY);
     
     context.scale(traceScale,traceScale);
     
     if(novoX * (-1) % parseInt(letterWidth * traceScale) === 0) {
     qtyColsToRemove++;
     }
     
     if(novoY * (-1) % parseInt(letterHeight * traceScale) === 0) {
     qtyRowsToRemove++;
     }
     
     //console.log("x: " + novoX + ", y: " + novoY + ", s: " + traceScale);
     } else {
     context.translate(0, 0);
     }
     
     for(var i = 0; i < traceHeight; i++){
     for(var j = 0; j < traceWidth; j++){
     if(timer <= traceEraseTime || (timer > traceEraseTime && j !== 0 && j % 10 !== 0)){
     context.save();
     
     context.translate(j * (letterWidth + 24), i * 32);
     
     context.shadowColor = "#35E161";
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
     context.shadowBlur = 30;
     context.fillStyle = "#CDFCD5";
     
     context.font = courier26;
     context.textBaseline = "top";
     
     context.fillText(trace[i][j], 0, 0);
     
     context.restore();
     
     context.save();
     
     context.translate(j * (letterWidth + 24), i * 32);
     
     context.fillStyle = "#E8FDEB";
     context.shadowColor = "#E2FCE6";
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
     context.shadowBlur = 10;
     
     context.font = courier26;
     context.textBaseline = "top";
     
     if(timer < traceErrorTime) {
     var randColor = getRandomInt(0,100);
     
     if(randColor % 30 === 0){
     var randNum = getRandomInt(0,9);
     
     context.fillText(randNum, 0, 0);
     
     traceLight[i][j] = {i: 1, n: [randNum]};
     } else if(randColor % 47 === 0){
     var randNum1 = getRandomInt(0,9);
     var randNum2 = getRandomInt(0,9);
     
     context.fillText(randNum1, 0, 0);
     context.fillText(randNum2, 0, 0);
     
     traceLight[i][j] = 2;
     traceLight[i][j] = {i: 2, n: [randNum1,randNum2]};
     } else if(randColor === 73){
     var randNum1 = getRandomInt(0,9);
     var randNum2 = getRandomInt(0,9);
     var randNum3 = getRandomInt(0,9);
     
     context.fillText(randNum1, 0, 0);
     context.fillText(randNum2, 0, 0);
     context.fillText(randNum3, 0, 0);
     
     traceLight[i][j] = 3;
     traceLight[i][j] = {i: 3, n: [randNum1,randNum2, randNum3]};
     } else {
     traceLight[i][j] = 0;
     }
     } else {
     if(i >= qtyRowsToRemove && i <= (traceHeight - 1 - qtyRowsToRemove) && j >= qtyColsToRemove && j <= (traceWidth - 1 - qtyColsToRemove) && traceLight[i][j] !== 0){
     if(traceLight[i][j].i === 1) {
     context.fillText(traceLight[i][j].n[0], 0, 0);
     } else if(traceLight[i][j].i === 2) {
     context.fillText(traceLight[i][j].n[0], 0, 0);
     context.fillText(traceLight[i][j].n[1], 0, 0);
     } else if(traceLight[i][j].i === 3) {
     context.fillText(traceLight[i][j].n[0], 0, 0);
     context.fillText(traceLight[i][j].n[1], 0, 0);
     context.fillText(traceLight[i][j].n[2], 0, 0);
     }
     }
     }
     
     context.restore();
     }
     }
     }
     
     //System Failure
     if(timer > traceErrorTime) {
     context.save();
     
     context.translate(failure.x, failure.y);
     
     context.save();
     context.strokeStyle = "white";
     context.lineWidth = "4";
     context.strokeRect(0,0,failure.w, failure.h);
     context.fillStyle = "black";
     context.fillRect(0,0,failure.w, failure.h);
     context.restore();
     
     context.save();
     context.translate(10, 10);
     
     context.shadowColor = "#35E161";
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
     context.shadowBlur = 30;
     context.fillStyle = "#CDFCD5";
     
     context.font = courier26;
     context.textBaseline = "top";
     
     context.fillText("SYSTEM FAILURE", 0, 0);
     context.restore();
     
     context.restore();
     }
     
     context.restore();
     
     */

    //Rain    
    //context.save();


    //context.translate(0, rainMatrix[m].y);

    var rainMatrixLength = rainMatrix.length;

    for (var m = 0; m < rainMatrixLength; m++) {
        if (totalCounter >= rainMatrix[m].startDelay) {

            context.save();

            if (partialCounter >= 60) {
                rainMatrix[m].data = randomModifyArray(rainMatrix[m].data);
                //partialCounter = 0;
            }

            if (rainMatrix[m].timer >= rainMatrix[m].timeSpeed) {
                rainMatrix[m].data = setArray(rainMatrix[m].data);

                rainMatrix[m].y += 34;
                rainMatrix[m].timer = 0;
            }

            context.globalAlpha = rainMatrix[m].alpha;

            context.scale(rainMatrix[m].scale, rainMatrix[m].scale);

            context.translate(rainMatrix[m].x, rainMatrix[m].y);

            for (var r = 0; r < rainMatrix[m].data.length; r++) {
                context.save();

                context.translate(0, r * 34);

                if (r === 0) {
                    context.globalAlpha = 0.1 * rainMatrix[m].alpha;
                } else if (r === 1) {
                    context.globalAlpha = 0.25 * rainMatrix[m].alpha;
                } else if (r === 2) {
                    context.globalAlpha = 0.5 * rainMatrix[m].alpha;
                } else if (r === 3) {
                    context.globalAlpha = 0.75 * rainMatrix[m].alpha;
                }

                context.shadowColor = "#35E161";
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 30;
                //context.fillStyle = "#CDFCD5";
                //context.fillStyle = "#70F579";
                context.fillStyle = "#70F579";

                context.font = japanese26;
                context.textBaseline = "top";

                context.fillText(rainMatrix[m].data[r], 0, 0);
                //context.fillText(rainMatrix[m].data[r], 0, 0);

                if (r === rainMatrix[m].data.length - 1) {
                    context.fillStyle = "#CDFCD5";
                    context.fillText(rainMatrix[m].data[r], 0, 0);
                    context.fillText(rainMatrix[m].data[r], 0, 0);
                    context.fillText(rainMatrix[m].data[r], 0, 0);
                } else if (r === rainMatrix[m].data.length - 2) {
                    context.fillStyle = "#9BF9AB";
                    context.fillText(rainMatrix[m].data[r], 0, 0);
                    context.fillText(rainMatrix[m].data[r], 0, 0);
                }

                context.restore();
            }

            rainMatrix[m].timer += interval;

            context.restore();
        }
    }

    if (partialCounter >= 60) {
        partialCounter = 0;
    }

    counter += interval;
    partialCounter += interval;

    totalCounter += interval;

    frames++;

    if (counter >= 1000) {
        timer++;
        counter = 0;
    }

    //context.restore();
}

window.onload = function() {
    canvas = document.getElementById("matrix");

    resetSizes();

    context = canvas.getContext("2d");

    //animationSetInterval = setInterval(draw, interval);

    fpsSetInterval = setInterval(setFps, 1000);

    for (var i = 0; i < 1000; i++) {
        var randScale = getRandomInt(7, 10) / 10;
        var randAlpha = randScale;
        var randSpeed = 60;
        var randX = getRandomInt(0, screenWidth - 40);
        var randY = getRandomInt(1, 100);

        rainMatrix.push({
            x: randX,
            y: 0,
            data: createRainArray(),
            scale: randScale,
            alpha: randAlpha,
            timeSpeed: randSpeed,
            timer: 0,
            startDelay: 200 * i
        });

        rainMatrix[i].y = ((-1) * (rainMatrix[i].data.length * 40)) - randY;
    }
    
    animate();
};

window.onresize = function() {
    resetSizes();
    animate();
};

function animate() {
    requestAnimFrame(animate);
    draw();
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray(size) {
    var resArray = Array();

    for (var i = 0; i < size; i++) {
        //resArray.push(getRandomInt(0,9));
        resArray.push(getRandomInt(0, 9));
    }

    return resArray;
}

function createRandomMatrix(rows, columns) {
    var resMatrix = Array();

    for (var i = 0; i < rows; i++) {
        resMatrix.push(createRandomArray(columns));
    }

    return resMatrix;
}

function createZeroMatrix(rows, columns) {
    var resMatrix = Array();

    for (var i = 0; i < rows; i++) {
        var rowMatrix = Array();

        for (var j = 0; j < columns; j++) {
            rowMatrix.push(0);
        }

        resMatrix.push(rowMatrix);
    }

    return resMatrix;
}

function createRainArray() {
    var res = Array();

    var rand = getRandomInt(4, 20);

    for (var i = 0; i < rand; i++) {
        //res.push(String.fromCharCode(getRandomInt(48,126)));

        res.push(String.fromCharCode(0x30A0 + Math.random() * (0x30FF - 0x30A0 + 1)));
    }

    return res;
}

function randomModifyArray(originalArray) {
    var resArray = originalArray;

    //var qtd = getRandomInt(1,resArray.length);
    //var qtd = 2;

    //for(var i = 0; i < qtd; i++){
    var idx = getRandomInt(0, resArray.length - 1);

    resArray[idx] = String.fromCharCode(0x30A0 + Math.random() * (0x30FF - 0x30A0 + 1));
    //}

    return resArray;
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function setFps() {
    document.getElementById("fps").innerHTML = frames + " fps";

    frames = 0;
}

function setArray(originalArray) {
    var resArray = originalArray;

    resArray.splice(0, 1);
    resArray.push(String.fromCharCode(0x30A0 + Math.random() * (0x30FF - 0x30A0 + 1)));

    return resArray;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();