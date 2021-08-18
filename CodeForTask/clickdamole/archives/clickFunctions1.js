var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var Qform = document.getElementById('Qform');

var context = canvas.getContext('2d');
context.fillStyle = fillcolor;
context.lineWidth = linewidth;
context.strokeStyle = strokestyle;
context.fillStyle = fontcolor;
context.textAlign = textalign;
context.font = fonttype;

var context2 = canvas2.getContext('2d');
context2.fillStyle = fillcolor;
context2.lineWidth = linewidth;
context2.strokeStyle = strokestyle;
context2.fillStyle = fontcolor;
context2.textAlign = textalign;
context2.font = fonttype;

var context3 = canvas3.getContext('2d');
context3.fillStyle = fillcolor;
context3.lineWidth = linewidth;
context3.strokeStyle = strokestyle;
context3.fillStyle = fontcolor;
context3.textAlign = textalign;
context3.font = fonttype;


// Flat array of all rectangles.  Their position and visibility changes during the game.
var rects = [];
var circleIndices = [];
var usedIndices = [];
var n_back = 2;

var length = 100;
var width = 100;
var fillcolor = "green";
var linewidth = 20;
var strokestyle = "#003300";
var fontcolor = "white";
var textalign = "center";
var fonttype = "bold 32px Arial";
var circle;
var difficultylevel = 3;
var consent = false;
var h = 1;
var clickedCircles = 1;
var stage;
var playing = true;
var mousecordsX = [];
var mousecordsY = [];
var leveltheyreon = [];
var fname = "mydata.txt"
var circletimer;

function startCircleTimer(x) {
	console.log("newtimer");
	console.log(circletimer);
    circletimer = setTimeout(placeCircle(), x);
    console.log(circletimer);
}

function myStopFunction() {
	console.log("clearingtimer");
    clearTimeout(circletimer);
    circletimer = null;
    console.log("clearedtimer");
}


var introduction = function() {
    Qform.style.display='none';
    context3.font = "30px Arial";
    context3.strokeText("click the rectangle to begin", 400, 400);
    context3.strokeRect(300, 600, 100, 100);
    context3.fillText("continue", 300, 600)
    console.log("intro");
};

var checkfun = function() {
    Qform.style.display='initial';
    stage = "checkingfun";
    context3.strokeText("click the square to continue", 400, 500);
    context3.strokeRect(300, 600, 100, 100);
    console.log("checkfun");
};

var play = function(h, lvl) {
    Qform.style.display='none';
    //clear canvases
    drawrectangles(lvl);
    placeCircle();
    console.log("play");
};

var thatsgame = function() {
    //clear canvases
    console.log("thats game");
    context3.strokeText("game ova!", 400, 400);
    saveToFile(mousecordsX);
    console.log("game ovah");
};

var drawrectangles = function(lvl) {
    for (j = 0; j < lvl; j++) {
        //i = j * 700;
        angle = 15 * j;
        a = 75;
        b = 2.7;
        r = a + (b * angle);
        x = r * Math.cos(angle);
        x = Math.round(x) + 400;
        y = r * Math.sin(angle);
        y = Math.round(y) + 400;
        h++;
        label = h.toString();
        drawRect(x, y, "Box" + label);
    }
    circleIndices = range(rects.length);
};

var Circle = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};

var draw = function(x, y, filltext) {

    context.strokeRect(x, y, 100, 100);
    context.fillText(filltext, x, y);
};

var Rect = function(x, y, length, width) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + length;
};

var drawRect = function(x, y, filltext) {
    draw(x, y, filltext);
    var rect = new Rect(x, y, length, width);
    rects.push(rect);
};

canvas4.addEventListener('click', function(e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;

    if (stage == "intro") {
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 600 && clickedY <= 700) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            consent = true;
            stage = "playing";
            play(h, difficultylevel);
        }
    } else if (stage == "playing") {
        if ((Math.abs(clickedX - circle.x) < circle.r) && (Math.abs(clickedY - circle.y) < circle.r)) {
            context2.clearRect(0, 0, canvas3.width, canvas3.height);
            if (clickedCircles == 5) {
            	clickedCircles++;
                advanceLevel();
            }
            clickedCircles++;
            myStopFunction();
            drawCircle(circle.x, circle.y, true, "green");
            
            startCircleTimer(2000);
            
        }

    } else if (stage == "checkingfun") {
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 600 && clickedY <= 700) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            stage = "playing";
            play(h, difficultylevel);
        }
    }
});

// function checkIntersection(Rect1, Rect2)

function advanceLevel() {
	console.log("advancinglevel");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context.clearRect(0, 0, canvas3.width, canvas3.height);
    clickedCircles = 1;
    circleIndices = range(rects.length);
    rects = [];
    h = 1;
    ++difficultylevel;
    if(difficultylevel > 7) {
        thatsgame();
    } else {
        checkfun();
    }
    
}

/*
Everytime the player advances a level the difficulty variable increases. 
when that happens one more box will appear on screen and the length of the used circles array will increase by one
this essentially increases the number of places that circle will cycle through.
The length of the used circles array is always 2 less than the number of rectangles
thus the number of times the circle will appear before it can appear in a box again is always numberofboxes - 2
increasing the number of boxes and corresponfing length of used circles increases the number of locations a plauyer must hold in working memory to maximize guessing

*/


var placeCircle = function() {
	console.log("placing circle");
	
    n_back = difficultylevel - 2;

    var usedIndicesRemoved = circleIndices.filter(function(remove) {
        return usedIndices.indexOf(remove) < 0;
    });

    var index = usedIndicesRemoved[getRandomInt(0, usedIndicesRemoved.length)];
    usedIndices.push(index);

    circle = new Circle(rects[index].left + 50, rects[index].top + 50, 50);

    if (usedIndices.length > n_back) {
        usedIndices.shift();
    }

    myStopFunction();
    drawCircle(rects[index].left + 50, rects[index].top + 50, false);
	startCircleTimer(1000);	
}

var drawCircle = function(x, y, fill, color) {
	console.log("draw circle");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.beginPath();
    context2.arc(x, y, 50, 0, 2 * Math.PI);
    if(fill == true){
    	console.log("filling");
    	context.fillStyle = color;
    	context2.fill();
    } else {
    	console.log("stroking");
    	context2.stroke();
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//
// Returns an array of integers between 0 and i
// 
function range(i) { return i ? range(i - 1).concat(i - 1) : [] }
//^this is some interesting syntax


canvas4.addEventListener('mousemove', function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
        if(stage == "playing"){
            if(checktime() % 2 == 0) {
                mousecordsX.push(mouseX);
                mousecordsY.push(mouseY);
                leveltheyreon.push(difficultylevel);
                //console.log(mouseX);
                //console.log(mouseY);
            }
        }
});

var checktime = function() {
	//context2.clearRect(0, 0, canvas2.width, canvas2.height);
    var d = new Date();
    return d.getTime();
}

function saveToFile(data) {
        jsonString = JSON.stringify(data);
        $.ajax({
            url: 'save.php',
            data: { 'jsonString': jsonString, 'fname': fname },
            type: 'POST'
        });
    }

