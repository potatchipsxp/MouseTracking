

var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas2');
var canvas4 = document.getElementById('canvas2');


//alert("exectued");

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

// Flat array of all rectangles.  Their position and visibility changes during the game.
var rects = [];

var length = 100;
var width = 100;
var fillcolor = "green";
var linewidth = 20;
var strokestyle = "#003300";
var fontcolor = "white";
var textalign = "center";
var fonttype = "bold 32px Arial";
var circle;
var usedcircles = [];
var difficultylevel = 7;

var Circle = function (x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
};

var draw = function (x, y, filltext) {
    //context.beginPath();
   // context.arc(x, y, radius, 0, 2 * Math.PI, false);
    // context.fill();
    // context.stroke();

    context.strokeRect(x, y, 100, 100);   
    context.fillText(filltext, x, y);    
};

var Rect = function(x, y, length, width) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + length;
};

var drawRect = function (x, y, filltext) {
    draw(x, y, filltext);
    var rect = new Rect(x, y, length, width);
    rects.push(rect); 
    //return rect; 
};

canvas2.addEventListener('click', function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
    
/*    for(var i = 0; i < rects.length; i++) {
        if (clickedX < rects [i].right && clickedX > rects[i].left && clickedY > rects[i].top && clickedY < rects[i].bottom) {
        console.log('clicked number ' + (i + 1));
        }
    }
*/

    if (((clickedX - circle.x < circle.r )|| (clickedX - circle.x > -1 * circle.r )) && ((clickedY - circle.y < circle.r )|| (clickedY - circle.y > -1 * circle.r ))) {
        placeCircle();
    }
});

function turn() {
    pickNewNumber();
    var guess = document.getElementById("playerguess").value;
    if (checkCorrectGuess(guess) == true) {
        alert("you got it!");
        ++hits;
        if (hits > 9) {
            alert("you win");
        }
    } else if (checkAlreadyUsed(guess) == true) {
        alert("bad guess, my number was..." + mynum);
    } else {
        alert("good guess but no, the number was " + mynum);
    }
    console.log("made it tall the way to the end");
    //alert("made it tall the way to the end");
    
};

var intro = function () {

};

var drawCircle = function (x, y) {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.beginPath();
    context2.arc(x, y, 50,0,2*Math.PI);
    context2.stroke();
    circle = new Circle(x, y, 50);
    usedcircles.push(circle);
    if (usedcircles.length > difficultylevel) {
        usedcircles.shift();
    }
    console.log(usedcircles);
    //return circle;
};

var placeCircle = function () {
    console.log("enteredplacecircle");
    var okcircle = false;
    while (okcircle == false) {
        console.log("enteredplacecirclewhileloop");
        var i = getRandomInt(0,difficultylevel);
        circle = new Circle(rects[i].left, rects[i].top, 50);
        for (var i = usedcircles.length - 1; i >= 0; i--) {
            console.log("enteredplacecircleforfloop");
            if (circle.x == usedcircles[i].x && circle.y == usedcircles[i].y) {
                okcircle =false;
                console.log("enteredplacecircleifstatement");
            } 
        }
        okcircle = true;
        drawCircle(circle.x + 50, circle.y + 50);
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

