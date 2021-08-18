/*
ToDo
create a way of varying mouse speed
max levels and number of levels, redundant?
*/









/*
Everytime the player advances a level the difficulty variable increases. 
when that happens one more box will appear on screen and the length of the used circles array will increase by one
this essentially increases the number of places that circle will cycle through.
The length of the used circles array is always 2 less than the number of rectangles
thus the number of times the circle will appear before it can appear in a box again is always numberofboxes - 2
increasing the number of boxes and corresponfing length of used circles increases the number of locations a plauyer must hold in working memory to maximize guessing
*/


var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var Qform = document.getElementById('Qform');
var demogForm = document.getElementById('demogQs');
var boring_instructions_text = document.getElementById('boring_instructions');
var gameover_text = document.getElementById('gameover');
var whackamole_inst = document.getElementById('whackainst');

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

var stimLocations = [];
var stimIndices = [];
var usedIndices = [];

var livemole = new Image();
livemole.src = 'images/mole.png'; 
var deadmole = new Image();
deadmole.src = 'images/mole-dead.png';

var fillcolor = "green";
var linewidth = 20;
var strokestyle = "#003300";
var fontcolor = "white";
var textalign = "center";
var fonttype = "bold 32px Arial";
var playing;
// var h = 1;

//var fname = "mydata.txt"

//game exectution variables
var neednewtimer = true;
var gamecomplete = false;
var showdemogform = true;
var clickedStims = 0;
var consent = false;
var p_randomStimList;
var numberoflevelscompleted = 0;
var maximumlevels = 1; //was 8
var maximumdifficultylevel = 15;

//game setting

var stim;
var stage;
var version;
var length = 100; //normally 100
var width = 100; //normally 100
var stimtimer;
var difficultylevel = 8;// Math.floor(Math.random()*12 + 3) normally 3
var typestimpattern = "list";
var typelevelselection = "everyother"; // everyother random incremental
var molespeedselection = "consistent"; // consistent, incremental, random


//preloadedvariables
molespeeds = [50,  400, 600, 800, 2000, 5000]; // could make these increments smaller should think more about it.

//list of mouse stim locations
//this is set intially during introduction
p_randomStimList3 = [0, 2, 1, 2, 0, 2, 1, 1, 1, 0, 2, 2, 1, 2, 2, 0, 1, 0, 1, 0, 0, 2, 0, 1, 2, 0, 2, 0, 1, 2, 2, 0, 0, 2, 1, 0, 2, 2, 1, 2, 2, 0, 1, 0, 2, 2, 2, 1, 0, 2, 0, 0, 1, 1, 2, 1, 2, 2, 0, 2, 2, 1, 2, 0, 0, 0, 2, 1, 2, 1, 0, 2, 2, 1, 2, 1, 1, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 1, 2, 2, 1, 0, 1, 1, 0, 0, 2, 1, 0, 0, 1, 0, 1, 2, 0, 1, 0, 2, 0, 2, 1, 0, 2, 2, 2, 0, 1, 0, 0, 1, 2, 2, 0, 1, 2, 0, 1, 1, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 1, 0, 1, 1, 0, 2, 2, 0, 0, 1, 0, 1, 2, 2, 1, 2, 0, 0, 2, 1, 1, 2, 2, 0, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2];
p_randomStimList4 = [0, 2, 2, 3, 1, 0, 0, 1, 0, 2, 3, 1, 3, 0, 3, 1, 0, 0, 2, 0, 2, 1, 2, 2, 2, 0, 3, 0, 2, 1, 2, 1, 2, 1, 1, 0, 2, 0, 0, 1, 1, 0, 2, 2, 3, 1, 1, 2, 0, 1, 3, 0, 1, 2, 3, 2, 1, 2, 2, 2, 2, 2, 3, 2, 2, 0, 1, 0, 2, 3, 0, 0, 1, 2, 0, 2, 0, 0, 0, 0, 2, 3, 3, 0, 2, 2, 1, 0, 3, 0, 1, 1, 1, 1, 3, 0, 1, 2, 1, 1, 2, 1, 1, 0, 2, 0, 0, 1, 2, 0, 3, 3, 1, 1, 0, 2, 2, 2, 0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 2, 3, 3, 3, 1, 0, 1, 2, 2, 1, 0, 1, 2, 1, 3, 3, 3, 3, 1, 3, 0, 0, 2, 3, 1, 3, 1, 0, 2, 1, 1, 2, 2, 1, 3, 2, 1, 3, 1, 1, 1, 1, 0, 1, 1, 3, 1, 3, 1, 3, 1, 3];
p_randomStimList5 = [0, 3, 0, 3, 0, 4, 0, 3, 2, 3, 1, 4, 4, 2, 1, 1, 3, 4, 1, 4, 4, 1, 2, 3, 1, 1, 0, 3, 1, 2, 0, 3, 1, 4, 4, 2, 0, 1, 2, 3, 0, 0, 4, 0, 0, 0, 0, 0, 3, 2, 1, 4, 4, 2, 3, 3, 3, 1, 1, 0, 1, 4, 4, 0, 0, 0, 4, 1, 2, 1, 0, 1, 2, 1, 3, 3, 1, 1, 0, 1, 3, 1, 4, 0, 1, 1, 0, 1, 3, 3, 2, 2, 2, 2, 4, 4, 1, 1, 2, 2, 3, 3, 0, 4, 3, 0, 1, 0, 0, 4, 1, 3, 0, 2, 3, 4, 1, 2, 3, 1, 1, 1, 3, 0, 0, 1, 1, 2, 2, 2, 1, 3, 0, 0, 3, 0, 4, 1, 3, 4, 1, 3, 4, 1, 1, 0, 1, 4, 2, 4, 2, 2, 4, 0, 1, 4, 4, 0, 3, 1, 4, 2, 3, 4, 2, 4, 2, 3, 3, 3, 4, 1, 3, 3, 1, 3, 0, 4, 2, 1];
p_randomStimList6 = [0, 2, 2, 1, 5, 0, 0, 4, 1, 1, 0, 5, 1, 3, 5, 0, 3, 3, 4, 5, 2, 2, 1, 3, 2, 2, 5, 0, 5, 5, 1, 3, 5, 2, 2, 5, 5, 4, 2, 3, 3, 5, 3, 3, 4, 1, 0, 1, 4, 2, 1, 0, 2, 3, 0, 4, 1, 3, 0, 3, 1, 1, 3, 0, 3, 3, 0, 0, 1, 2, 4, 4, 0, 5, 1, 0, 5, 3, 2, 2, 1, 5, 0, 2, 0, 5, 3, 4, 0, 1, 4, 5, 0, 4, 3, 3, 5, 2, 4, 2, 5, 2, 2, 5, 1, 0, 0, 1, 0, 1, 5, 3, 0, 3, 3, 4, 3, 1, 5, 3, 0, 5, 1, 3, 0, 0, 4, 2, 2, 3, 4, 3, 1, 5, 2, 3, 0, 0, 4, 0, 5, 0, 5, 3, 4, 2, 2, 3, 0, 2, 5, 1, 2, 4, 4, 4, 1, 1, 2, 1, 2, 1, 3, 0, 5, 5, 1, 4, 1, 3, 5, 4, 1, 0, 3, 4, 4, 2, 3, 4];
p_randomStimList7 = [4, 6, 6, 5, 5, 1, 5, 1, 4, 2, 3, 3, 0, 2, 6, 0, 5, 2, 6, 5, 5, 2, 0, 4, 6, 4, 1, 5, 1, 1, 1, 0, 4, 6, 6, 3, 4, 1, 4, 3, 1, 4, 5, 0, 6, 0, 3, 0, 5, 0, 6, 4, 6, 0, 5, 1, 1, 4, 4, 2, 6, 4, 3, 1, 2, 5, 6, 4, 2, 2, 3, 1, 5, 1, 1, 3, 3, 1, 5, 4, 4, 2, 5, 2, 5, 2, 5, 4, 3, 5, 2, 5, 1, 5, 5, 4, 6, 4, 5, 1, 5, 2, 4, 3, 0, 0, 0, 0, 2, 2, 1, 4, 4, 5, 1, 3, 1, 3, 2, 0, 6, 3, 2, 5, 4, 5, 0, 4, 6, 2, 4, 3, 0, 6, 2, 4, 0, 2, 6, 3, 2, 2, 5, 5, 0, 3, 3, 5, 0, 0, 3, 3, 2, 3, 1, 6, 4, 6, 0, 6, 4, 5, 6, 3, 2, 3, 5, 6, 4, 5, 5, 5, 4, 0, 2, 1, 2, 0, 6, 1];
p_randomStimList8 = [5, 6, 5, 0, 1, 4, 5, 5, 1, 6, 6, 0, 4, 7, 5, 1, 4, 4, 1, 6, 5, 6, 3, 1, 3, 6, 4, 2, 3, 3, 7, 4, 2, 6, 0, 0, 3, 4, 7, 3, 4, 3, 5, 0, 3, 6, 2, 4, 3, 2, 7, 4, 1, 2, 7, 4, 3, 0, 2, 2, 5, 6, 6, 7, 0, 2, 2, 3, 3, 0, 0, 1, 3, 2, 4, 7, 5, 5, 0, 1, 6, 2, 5, 1, 4, 2, 2, 1, 3, 0, 6, 3, 6, 0, 5, 0, 3, 4, 0, 4, 0, 6, 2, 2, 5, 7, 1, 5, 1, 1, 3, 3, 4, 0, 3, 7, 2, 1, 1, 2, 6, 1, 7, 0, 4, 0, 6, 7, 5, 7, 0, 2, 1, 3, 4, 3, 7, 2, 0, 2, 6, 3, 0, 7, 2, 5, 5, 7, 0, 0, 7, 7, 4, 7, 1, 5, 6, 5, 2, 1, 4, 4, 2, 5, 0, 5, 7, 1, 0, 5, 2, 5, 6, 5, 6, 4, 7, 7, 0, 0, 1, 6, 5, 5, 0, 3, 1, 6, 2, 1, 2, 7, 7, 4, 2, 6, 6, 2, 5, 1, 1, 2, 5, 7, 2, 3, 1, 6, 0, 1, 7, 0, 6, 0, 3, 4, 2, 1, 7, 1, 1, 1, 7, 7, 1, 7, 6, 2, 0, 0, 1, 4, 3, 1, 5, 4, 5, 5, 0, 5, 4, 1, 5, 1, 0, 7, 6, 0, 5, 7, 1, 4, 0, 0, 0, 0, 5, 0, 7, 2, 4, 4, 3, 1, 3, 5, 7, 0, 1, 0, 1, 4, 7, 1, 1, 5, 4, 1, 7, 2, 1, 1, 5, 4, 2, 2, 1, 7, 4, 2, 5, 5, 6, 4, 2, 7, 4, 0, 1, 1, 5, 4, 2, 7, 1, 2, 1, 3, 1, 2, 2, 0, 4, 0, 6, 1, 3, 6, 1, 0, 4, 6, 7, 7, 0, 6, 0, 7, 7, 3, 5, 4, 7, 6, 2, 7, 1, 1, 4, 0, 0, 7, 0, 5, 7, 6, 4, 5, 1, 3, 2, 7, 3, 7, 0, 7, 4, 7, 5, 4, 2, 5, 7, 1, 3, 7, 4, 1, 1, 2, 7, 7, 0, 1, 1, 7, 3, 2, 5, 3, 7, 1, 2, 6, 1, 6, 2, 3, 0, 2, 6, 5, 1, 6, 5, 6, 3, 6, 0, 6, 5, 4, 7, 6, 3, 4, 0, 3, 1, 4, 1, 7, 3, 6, 7, 2, 2, 5, 0, 1, 4, 6, 5, 3, 1, 5, 0, 2, 3, 7, 7, 5, 0, 2, 2, 2, 5, 0, 4, 4, 5, 2, 0, 3, 3, 3, 1, 7, 4, 2, 2, 7, 0, 1, 1, 7, 1, 6, 0, 7, 4, 5, 2, 3, 2, 5, 7, 3, 3, 2, 6, 3, 5, 4, 2, 0, 4, 1, 1, 2, 1, 0, 1, 5, 0, 6, 0, 0, 3, 5, 4, 3, 6, 7, 3, 6, 4, 4, 5, 2, 5, 4, 4, 5, 1, 0, 1, 4, 5, 3, 3, 3, 1, 7, 3, 0, 2, 1, 1, 0, 0, 3, 2, 6, 5, 0, 4, 0, 7, 7, 4, 2, 0, 7, 7, 6, 7, 5, 0, 7, 5, 1, 2, 2, 0, 4, 5, 2, 5, 6, 3, 2, 7, 0, 3, 4, 4, 3, 2, 4, 3, 5, 0, 3, 5, 5, 2, 3, 4, 4, 3, 7, 2, 6, 4, 5, 6, 4, 4, 1, 2, 6, 6, 1, 5, 2, 4, 3, 0, 7, 4, 2, 5, 3, 1, 0, 0, 1, 0, 7, 7, 2, 5, 2, 0, 0, 1, 2, 7, 4, 4, 5, 0, 0, 7, 6, 6, 0, 2, 7, 7, 2, 6, 0, 0, 6, 4, 5, 2, 0, 1, 5, 2, 7, 5, 5, 4, 6, 7, 6, 0, 0, 0, 5, 4, 4, 1, 7, 3, 3, 5, 2, 3, 7, 7, 4, 7, 5, 4, 3, 4, 4, 5, 1, 4, 3, 2, 1, 3, 1, 5, 6, 1, 0, 0, 0, 0, 4, 5, 7, 6, 6, 1, 5, 7, 6, 4, 5, 1, 0, 4, 3, 3, 7, 7, 7, 4, 7, 4, 7, 4, 1, 7, 3, 2, 7, 7, 5, 4, 1, 4, 6, 7, 1, 4, 3, 5, 5, 1, 1, 0, 4, 1, 6, 2, 4, 0, 0, 5, 2, 6, 3, 0, 1, 1, 5, 1, 6, 7, 1, 4, 3, 2, 2, 5, 4, 7, 2, 1, 2, 3, 7, 7, 0, 1, 6, 5, 1, 7, 5, 7, 1, 6, 3, 7, 5, 3, 1, 0, 2, 2, 4, 6, 2, 7, 0, 2, 0, 0, 1, 5, 5, 7, 0, 7, 2, 5, 6, 7, 0, 5, 7, 4, 7, 3, 1, 6, 2, 3, 1, 2, 6, 4, 7, 3, 5, 3, 0, 4, 1, 6, 3, 1, 3, 3, 7, 6, 0, 5, 3, 5, 3, 5, 7, 0, 3, 4, 0, 0, 2, 1, 5, 5, 4, 5, 4, 4, 2, 6, 7, 2, 5, 6, 0, 4, 0, 6, 1, 4, 7, 6, 7, 1, 4, 5, 0, 3, 2, 0, 4, 1, 4, 6, 5, 4, 0, 0, 0, 5, 6, 3, 3, 6, 7, 4, 1, 3, 0, 3, 6, 0, 3, 4, 7, 1, 1, 4, 0, 6, 0, 3, 4, 4, 1, 7, 3, 2, 6, 5, 7, 5, 6, 4, 0, 7, 4, 5, 1, 0, 2, 3, 1, 6, 5, 0, 1, 0, 7, 7, 6, 7, 1, 7, 2, 0, 6, 0, 4, 1, 3, 3, 1, 0, 0, 3, 6, 4, 6, 5, 5, 0, 4, 6, 1, 1, 6, 5, 7, 2, 1, 5, 0, 5, 4, 6, 4, 3, 5, 5, 4, 4, 5, 1, 0, 0, 5, 4, 3, 6, 4, 3, 1, 4, 6, 7, 3, 3, 2, 0, 2, 4, 2, 3, 1, 3, 6, 7, 7, 7, 6, 5, 1, 5, 3, 2, 1, 5, 3, 4, 3, 5, 5, 2, 4, 1, 2, 7, 2, 3, 1, 0, 7, 2, 4, 3, 3, 4, 3, 7, 7, 6, 4, 4, 5, 0, 3, 6, 2, 2, 1, 6, 0, 3, 4, 0, 4, 1, 6, 4, 5, 0, 5, 5, 0, 6, 4, 1, 4, 0, 3, 3, 6, 0, 0, 1, 6, 3, 1, 7, 6, 2, 7, 2, 7, 3, 7, 2, 4, 0, 2, 0, 5, 7, 2, 4, 1, 4, 5, 2, 0, 3, 2, 6, 6, 2, 3, 5, 4, 5, 6, 1, 0, 2, 3, 0, 3, 1, 2, 2, 5, 2, 3, 0, 0, 5, 5, 1, 3, 4, 4, 0, 0, 6, 1, 3, 0, 4, 1, 4, 7, 2, 4, 4, 0, 5, 6, 4, 2, 2, 6, 6, 2, 0, 3, 4, 3, 4, 7, 3, 0, 5, 1, 7, 6, 2, 7, 4, 7, 2, 7, 6, 6, 5, 3, 5, 0, 6, 4, 2, 3, 3, 0, 6, 4, 4, 7, 0, 2, 1, 3, 7, 1, 6, 5, 7, 0, 5, 4, 1, 0, 7, 4, 6, 5, 2, 1, 2, 4, 3, 4, 6, 6, 0, 3, 2, 3, 6, 3, 6, 3, 5, 4, 4, 6, 5, 0, 7, 0, 4, 5, 7, 6, 3, 2, 1, 6, 1, 3, 2, 6, 1, 2, 7, 3, 7, 0, 6, 5, 3, 1, 2, 0, 2, 4, 3, 2, 5, 4, 3, 0, 6, 1, 3, 7, 6, 5, 4, 2, 1, 5, 6, 6, 3, 4, 6, 2, 5, 6, 1, 3, 2, 7, 3, 2, 5, 1, 3, 2, 7, 6, 1, 3, 5, 5, 1, 3, 0, 6, 0, 1, 3, 5, 2, 0, 2, 1, 4, 2, 6, 6, 5, 4, 0, 7, 0, 3, 7, 5, 6, 4, 7, 0, 0, 4, 4, 0, 1, 2, 7, 3, 4, 0, 3, 2, 4, 3, 4, 4, 7, 0, 0, 6, 2, 7, 1, 4, 3, 6, 6, 1, 0, 5, 0, 6, 0, 3, 3, 2, 2, 5, 1, 6, 6, 2, 5, 4, 3, 2, 5, 5, 3, 5, 6, 0, 6, 5, 5, 6, 0, 2, 0, 2, 7, 1, 5, 4, 6, 6, 3, 1, 7, 3, 7, 1, 5, 7, 5, 0, 4, 2, 2, 0, 0, 3, 6, 1, 7, 5, 3, 4, 3, 6, 6, 2, 5, 1, 0, 0, 0, 6, 1, 5, 2, 4, 6, 4, 1, 2, 7, 5, 0, 5, 7, 7, 4, 6, 1, 2, 1, 6, 4, 3, 7, 3, 2, 5, 2, 6, 2, 6, 2, 6, 0, 3, 4, 6, 2, 3, 5, 3, 4, 0, 6, 7, 0, 3, 0, 5, 3, 4, 2, 4, 3, 2, 3, 0, 1, 0, 2, 5, 1, 5, 7, 6, 6, 7, 6, 4, 7, 0, 3, 6, 6, 0, 1, 3, 1, 4, 7, 7, 2, 6, 0, 2, 4, 7, 4, 1, 1, 0, 3, 2, 5, 3, 7, 4, 7, 1, 6, 4, 3, 0, 4, 5, 2, 7, 2, 7, 4, 6, 3, 2, 7, 6, 7, 6, 4, 4, 3, 0, 4, 3, 4, 5, 7, 7, 4, 6, 1, 4, 2, 1, 5, 5, 5, 0, 5, 7, 2, 0, 2, 3, 0, 1, 7, 6, 7, 6, 7, 5, 2, 4, 5, 2, 2, 7, 5, 0, 5, 1, 1, 3, 7, 6, 1, 3, 6, 3, 1, 3, 2, 5, 7, 3, 6, 1, 2, 3, 2, 6, 2, 0, 1, 0, 0, 3, 1, 0, 6, 1, 0, 6, 6, 3, 2, 3, 3, 6, 4, 4, 3, 6, 4, 0, 0, 4, 7, 5, 2, 2, 2, 4, 2, 5, 6, 2, 2, 4, 5, 4, 0, 7, 0, 6, 3, 0, 2, 3, 2, 6, 5, 0, 4, 2, 7, 5, 7, 2, 3, 7, 7, 1, 7, 1, 1, 3, 7, 6, 0, 3, 3, 5, 2, 0, 5, 6, 5, 3, 4, 6, 2, 7, 2, 3, 3, 7, 6, 2, 7, 4, 4, 2, 1, 6, 1, 4, 3, 0, 4, 7, 4, 6, 5, 0, 0, 6, 2, 1, 4, 4, 2, 5, 0, 2, 4, 6, 4, 2, 5, 2, 1, 5, 4, 0, 0, 6, 0, 3, 1, 5, 6, 1, 2, 4, 3, 1, 0, 7, 2, 4, 2, 4, 5, 5, 0, 3, 3, 6, 6, 6, 4, 3, 0, 1, 1, 6, 3, 6, 5, 2, 1, 0, 7, 4, 7, 4, 0, 6, 1, 1, 6, 4, 5, 2, 7, 4, 1, 0, 7, 2, 5, 1, 7, 3, 2, 0, 2, 7, 1, 0, 2, 2, 5, 4, 3, 1, 0, 4, 0, 1, 0, 3, 5, 1, 1, 1, 6, 2, 6, 5, 1, 2, 3, 2, 2, 3, 7, 5, 6, 6, 0, 4, 7, 6, 7, 5, 5, 7, 6, 3, 7, 6, 3, 4, 2, 1, 4, 3, 1, 5, 6, 7, 1, 5, 1, 7, 6, 0, 0, 7, 5, 7, 2, 7, 5, 6, 2, 3, 3, 7, 0, 6, 7, 7, 6, 3, 2, 3, 3, 1, 1, 4, 1, 0, 3, 0, 0, 2, 0, 5, 3, 7, 3, 4, 6, 4, 0, 4, 1, 4, 1, 5, 5, 7, 4, 5, 4, 6, 5, 6, 2, 6, 6, 2, 3, 4, 7, 6, 6, 2, 1, 5, 3, 5, 4, 3, 6, 2, 7, 0, 7, 3, 6, 4, 7, 5, 3, 7, 0, 1, 4, 3, 5, 3, 7, 1, 4, 6, 4, 3, 3, 5, 4, 2, 6, 6, 6, 3, 4, 5, 0, 4, 5, 7, 6, 4, 4, 0, 4, 6, 7, 0, 6, 7, 5, 0, 0, 6, 4, 7, 5, 5, 1, 7, 5, 0, 3, 5, 6, 0, 4, 7, 2, 0, 3, 6, 5, 7, 4, 5, 4, 3, 2, 7, 1, 7, 1, 7, 5, 0, 7, 1, 2, 4, 4, 1, 7, 3, 2, 1, 2, 0, 4, 3, 1, 6, 5, 0, 2, 7, 6, 0, 4, 0, 7, 4, 1, 7, 1, 0, 4, 6, 6, 2, 1, 2, 6, 6, 2, 2, 6, 5, 0, 3, 2, 2, 1, 5, 7, 6, 6, 3, 7, 6, 2, 0, 3, 2, 1, 6, 7, 0, 5, 7, 3, 7, 2, 2, 7, 0, 2, 1, 4, 1, 1, 3, 1, 4, 1, 7, 1, 0, 3, 4, 6, 5, 4, 2, 2, 6, 5, 2, 2, 0, 3, 3, 4, 0, 7, 7, 1, 5, 1, 3, 7, 5, 7, 6, 1, 7, 0, 6, 5, 2, 2, 1, 3, 0, 4, 1, 3, 7, 0, 6, 0, 1, 6, 6, 5, 6, 3, 6, 1, 6, 6, 4, 7, 3, 7, 0, 7, 4, 1, 5, 2, 2, 4, 3, 0, 5, 7, 3, 4, 6, 0, 0, 0, 3, 3, 0, 1, 2, 4, 5, 7, 5, 6, 6, 4, 1, 6, 2, 2, 4, 7, 5, 2, 7, 5, 2, 0, 0, 5, 2, 1, 2, 4, 6, 2, 4, 0, 2, 2, 0, 0, 6, 5, 1, 0, 0, 0, 6, 6, 3, 0, 6, 2, 6, 0, 7, 3, 6, 1, 0, 1, 4, 1, 2, 4, 1, 6, 0, 7, 7, 3, 0, 2, 0, 6, 3, 5, 0, 1, 4, 0, 1, 5, 7, 0, 7, 4, 4, 3, 0, 7, 0, 3, 2, 7, 2, 5, 4, 4, 7, 4, 3, 4, 2, 0, 2, 7, 5, 1, 1, 3, 7, 4, 3, 3, 6, 1, 7, 3, 2, 4, 7, 3, 2, 4, 4, 4, 6, 6, 1, 1, 2, 2, 0, 2, 6, 5, 1, 1, 5, 7, 3, 4, 7, 1, 0, 2, 7, 5, 4, 0, 1, 6, 7, 6, 3, 7, 1, 5, 7, 3, 2, 2, 2, 3, 7, 2, 4, 6, 6, 7, 6, 4, 4, 1, 7, 2, 7, 3, 3, 3, 2, 1, 0, 7, 2, 0, 6, 6, 3, 2, 0, 0, 3, 6, 5, 4, 1, 1, 0, 1, 3, 1, 3, 0, 7, 2, 6, 3, 4, 1, 2, 3, 1, 1, 0, 1, 5, 3, 7, 6, 1, 0, 3, 1, 3, 7, 6, 4, 0, 0, 0, 0, 2, 5, 1, 4, 3, 1, 5, 2, 4, 5, 3, 7, 4, 6, 5, 0, 3, 0, 1, 2, 2, 6, 5, 2, 0, 6, 2, 6, 3, 0, 1, 7, 2, 6, 2, 3, 6, 4, 7, 2, 0, 5, 6, 2, 1, 0, 6, 0, 3, 0, 1, 7, 6, 5, 2, 7, 1, 3, 1, 2, 3, 0, 3, 4, 2, 2, 3, 3, 6, 2, 2, 0, 4, 5, 3, 0, 2, 1, 4, 7, 7, 1, 4, 2, 0, 7, 3, 3, 3, 3, 1, 4, 2, 0, 0, 5, 2, 5, 3, 7, 2, 5, 2, 6, 5, 0, 1, 0, 5, 6, 4, 4, 6, 3, 4, 6, 1, 7, 2, 3, 3, 3, 6, 1, 0, 3, 2, 6, 2, 5, 4, 7, 6, 4, 2, 7, 4, 1, 0, 5, 0, 6, 2, 2, 2, 0, 3, 3, 4, 2, 3, 5, 5, 2, 7, 4, 6, 1, 6, 5, 4, 2, 6, 3, 3, 0, 2, 0, 2, 2, 1, 2, 2, 0, 0, 5, 5, 3, 1, 0, 7, 7, 2, 0, 5, 0, 1, 6, 5, 0, 1, 5, 1, 1, 3, 6, 7, 7, 7, 2, 6, 3, 3, 2, 7, 5, 7, 6, 4, 1, 3, 1, 4, 1, 3, 6, 7, 0, 7, 1, 7, 4, 0, 2, 0, 6, 5, 4, 4, 4, 3, 1, 7, 1, 4, 4, 5, 3, 6, 3, 0, 4, 5, 5, 3, 7, 7, 5, 1, 4, 2, 1, 1, 7, 1, 2, 5, 3, 6, 7, 5, 0, 4, 2, 3, 5, 5, 7, 1, 5, 3, 1, 3, 1, 0, 4, 2, 0, 3, 0, 1, 7, 3, 3, 3, 7, 4, 7, 1, 4, 7, 4, 4, 4, 5, 4, 0, 7, 4, 1, 3, 0, 3, 1, 0, 4, 1, 2, 5, 4, 1, 2, 7, 3, 4, 7, 7, 1, 0, 1, 2, 0, 6, 4, 3, 3, 7, 2, 6, 5, 4, 1, 3, 1, 6, 1, 6, 2, 4, 4, 5, 0, 7, 5, 1, 0, 0, 5, 6, 7, 3, 4, 6, 3, 5, 1, 3, 3, 5, 5, 5, 3, 0, 0, 6, 3, 0, 7, 6, 7, 0, 4, 3, 3, 5, 4, 1, 6, 3, 6, 6, 5, 0, 7, 4, 2, 4, 5, 6, 7, 5, 1, 2, 3, 0, 0, 7, 1, 3, 0, 6, 1, 1, 7, 0, 3, 2, 3, 7, 3, 2, 6, 0, 2, 0, 0, 4, 1, 5, 3, 7, 7, 4, 1, 6, 3, 4, 5, 4, 6, 0, 7, 6, 4, 0, 4, 1, 6, 2, 6, 4, 3, 1, 1, 6, 4, 7, 6, 4, 0, 3, 6, 0, 2, 5, 2, 7, 4, 4, 3, 6, 6, 4, 3, 7, 0, 7, 1, 1, 2, 4, 4, 1, 0, 0, 4, 2, 4, 0, 7, 4, 2, 2, 4, 4, 0, 3, 2, 1, 7, 1, 2, 7, 7, 6, 2, 2, 7, 2, 5, 1, 4, 0, 6, 1, 7, 4, 4, 5, 7, 3, 2, 0, 1, 4, 6, 5, 6, 7, 2, 0, 3, 1, 1, 3, 2, 1, 6, 0, 5, 7, 0, 0, 5, 6, 0, 5, 4, 4, 0, 6, 2, 6, 6, 5, 6, 6, 3, 7, 0, 0, 5, 2, 6, 1, 0, 1, 7, 3, 1, 5, 1, 3, 5, 0, 5, 5, 0, 7, 7, 1, 0, 5, 3, 1, 0, 4, 5, 6, 3, 0, 5, 2, 4, 0, 7, 7, 3, 6, 0, 6, 7, 6, 2, 5, 1, 5, 7, 1, 2, 5, 0, 2, 3, 2, 5, 6, 2, 2, 0, 6, 7, 5, 6, 2, 0, 5, 3, 4, 1, 1, 7, 0, 2, 7, 7, 7, 2, 7, 6, 7, 2, 0, 4, 2, 2, 1, 2, 3, 7, 7, 1, 2, 6, 7, 2, 1, 3, 6, 7, 4, 4, 7, 3, 3, 6, 2, 2, 4, 7, 6, 2, 2, 1, 3, 2, 0, 4, 7, 2, 6, 4, 5, 0, 1, 4, 2, 3, 0, 5, 1, 4, 4, 3, 7, 4, 2, 7, 4, 3, 1, 5, 6, 3, 7, 4, 3, 5, 4, 0, 5, 1, 1, 2, 2, 6, 1, 4, 7, 3, 3, 3, 3, 3, 1, 5, 0, 6, 7, 5, 1, 6, 5, 6, 2, 2, 2, 0, 5, 2, 6, 1, 3, 6, 6, 7, 6, 0, 7, 0, 4, 1, 1, 7, 7, 5, 7, 3, 7, 1, 1, 7, 0, 3, 6, 6, 7, 1, 4, 1, 6, 3, 7, 4, 2, 7, 7, 7, 0, 0, 2, 2, 7, 3, 4, 6, 0, 0, 6, 7, 3, 4, 7, 6, 2, 5, 6, 0, 7, 3, 6, 7, 2, 1, 7, 4, 7, 1, 0, 1, 4, 1, 0, 1, 3, 2, 6, 7, 0, 5, 3, 7, 3, 5, 5, 0, 0, 7, 5, 0, 6, 2, 5, 4, 5, 6, 4, 6, 2, 2, 0, 5, 3, 3, 1, 5, 7, 2, 7, 5, 1, 1, 4, 6, 4, 0, 6, 0, 2, 1, 5, 4, 3, 4, 7, 7, 3, 4, 6, 7, 2, 1, 5, 3, 1, 3, 1, 2, 5, 5, 3, 2, 0, 7, 6, 5, 3, 2, 0, 2, 2, 4, 4, 4, 2, 0, 3, 2, 5, 0, 2, 7, 7, 2, 6, 7, 3, 5, 4, 7, 3, 1, 6, 0, 2, 5, 0, 0, 2, 3, 3, 4, 7, 2, 6, 3, 1, 0, 7, 5, 5, 0, 1, 5, 1, 2, 3, 1, 0, 7, 0, 0, 4, 1, 7, 5, 6, 3, 6, 3, 4, 1, 0, 0, 4, 0, 6, 0, 4, 4, 5, 3, 7, 0, 7, 4, 1, 0, 7, 4, 1, 3, 1, 4, 2, 0, 0, 0, 0, 4, 6, 2, 0, 4, 0, 0, 4, 3, 0, 0, 6, 0, 7, 1, 5, 0, 2, 1, 0, 4, 4, 3, 7, 6, 5, 4, 1, 1, 5, 6, 1, 1, 4, 6, 5, 6, 7, 7, 1, 4, 6, 0, 1, 0, 5, 4, 2, 1, 4, 7, 0, 6, 3, 5, 3, 2, 5, 2, 2, 4, 4, 1, 2, 0, 6, 4, 7, 1, 4, 5, 6, 7, 1, 3, 4, 4, 6, 5, 1, 3, 6, 6, 4, 5, 5, 6, 3, 2, 3, 3, 7, 2, 0, 5, 3, 1, 1, 5, 7, 5, 2, 7, 1, 2, 5, 3, 4, 5, 0, 4, 7, 6, 3, 4, 5, 0, 4, 1, 4, 4, 7, 0, 2, 1, 3, 3, 2, 4, 7, 1, 0, 7, 0, 3, 7, 6, 4, 2, 0, 5, 5, 4, 7, 7, 6, 4, 5, 6, 0, 0, 6, 4, 3, 3, 6, 3, 6, 0, 2, 5, 0, 4, 3, 5, 4, 3, 0, 5, 6, 7, 4, 7, 3, 5, 4, 6, 6, 4, 0, 1, 7, 0, 7, 5, 1, 3, 7, 7, 7, 0, 4, 2, 3, 4, 6, 3, 0, 1, 0, 0, 7, 2, 0, 2, 2, 0, 3, 6, 1, 2, 5, 0, 6, 0, 3, 1, 6, 0, 0, 5, 2, 2, 7, 1, 2, 5, 0, 6, 6, 0, 0, 2, 3, 7, 2, 7, 6, 3, 1, 0, 2, 2, 4, 2, 2, 3, 5, 4, 2, 3, 1, 3, 1, 4, 2, 0, 5, 1, 4, 7, 3, 4, 3];
p_randomStimList9 = [2, 3, 0, 3, 2, 3, 5, 3, 8, 1, 1, 3, 1, 1, 0, 8, 7, 7, 3, 2, 8, 2, 4, 8, 7, 8, 5, 5, 0, 6, 8, 1, 5, 5, 6, 8, 3, 5, 7, 3, 6, 6, 8, 2, 5, 3, 0, 4, 2, 8, 7, 0, 5, 8, 1, 5, 4, 0, 0, 5, 6, 7, 3, 5, 1, 8, 0, 0, 8, 2, 5, 1, 1, 7, 1, 3, 4, 1, 2, 4, 1, 0, 5, 7, 8, 7, 7, 8, 1, 8, 1, 2, 5, 1, 5, 5, 2, 8, 1, 6, 8, 3, 7, 1, 6, 7, 6, 8, 4, 5, 6, 5, 0, 6, 3, 1, 4, 0, 1, 7, 1, 1, 4, 6, 3, 2, 5, 8, 3, 3, 6, 2, 5, 2, 0, 5, 7, 0, 1, 7, 5, 1, 1, 3, 3, 5, 7, 2, 3, 8, 2, 2, 4, 6, 7, 6, 2, 4, 6, 7, 0, 5, 6, 1, 6, 4, 6, 7, 2, 2, 5, 5, 2, 2, 7, 4, 5, 3, 7, 8];
p_randomStimList10 = [3, 8, 1, 9, 7, 5, 0, 6, 5, 9, 5, 4, 5, 3, 1, 3, 4, 4, 4, 6, 5, 0, 7, 3, 0, 2, 5, 3, 3, 6, 9, 5, 0, 9, 2, 1, 1, 8, 4, 5, 7, 8, 2, 6, 5, 3, 9, 1, 7, 3, 9, 2, 7, 4, 5, 4, 6, 0, 2, 9, 7, 0, 7, 0, 5, 5, 6, 3, 6, 9, 3, 8, 9, 9, 1, 7, 1, 9, 0, 0, 3, 7, 2, 4, 0, 1, 7, 6, 5, 4, 4, 5, 0, 0, 8, 8, 0, 2, 4, 4, 6, 9, 8, 0, 1, 6, 2, 2, 0, 8, 9, 0, 8, 2, 8, 6, 9, 8, 4, 5, 2, 5, 5, 0, 8, 0, 0, 1, 3, 9, 3, 6, 5, 6, 3, 4, 5, 7, 3, 4, 9, 5, 5, 6, 5, 6, 1, 4, 7, 1, 6, 8, 7, 0, 6, 1, 7, 0, 0, 7, 6, 8, 2, 2, 8, 5, 1, 3, 9, 7, 6, 4, 9, 1, 4, 4, 3, 6, 7, 3];


//task parameters

var n_back = 2;
var nextstimtime = 650;
var clickedstimnextstim = 500;
var numberoflevels = 15; //10
var numberofhitsneeded = 1000; //20
var stimsclickedthislevel = 0;


//experiment variables

var timetimerstarted;
var levelStartTime;
var leveltimelimit = 180000; //60000
var cantclickagain = false;
var numberofstimsshown = 0;
var stimsshownthislevel = 0;
var timemousecords = [];
var timestimsarrive = [];
var mousecordsX = [];
var mousecordsY = [];
var leveltheyreon = [];
var mouseCordsXClicks = [];
var mouseCordsYClicks = [];
var mouseClickTimes = [];

//

function startStimTimer(x) {
    var timetimerstarted = Date.now();
    if(stimtimer){
        myStopFunction();    
    }
    stimtimer = setTimeout(placeStim, x);
}

function delaytimer(delay){
    if(stimtimer){
        myStopFunction();
    }
    startStimTimer(delay);
}

function Nback_placeStim() {

    n_back = difficultylevel - 2;
    var usedIndicesRemoved = stimIndices.filter(function(remove) {
        return usedIndices.indexOf(remove) < 0;
    });
    var index = usedIndicesRemoved[getRandomInt(0, usedIndicesRemoved.length)];
    usedIndices.push(index);
    stim = new Stim(stimLocations[index].left + 50, stimLocations[index].top + 50, 50);
    if (usedIndices.length > n_back) {
        usedIndices.shift();
    }
    drawMole(stimLocations[index].left + 50, stimLocations[index].top + 50);
}

function Rand_placeStim(){
	console.log(stimLocations.length);
    var i = getRandomInt(0,stimLocations.length);
    stim = new Stim(stimLocations[i].left + 50, stimLocations[i].top + 50, 50);
    if(version == "whackamole"){
        drawMole(stimLocations[i].left + 50, stimLocations[i].top + 50);   
    } else if(version == "boring"){
        drawCircle(stimLocations[i].left + 50, stimLocations[i].top + 50);
    }
}

function listPlaceStim(){
    if(p_randomStimList.length < 3) {
        advanceLevel();
    }else{
        if(version == "whackamole"){
            stim = new Stim(stimLocations[p_randomStimList[0]].left + 50, stimLocations[p_randomStimList[0]].top + 50, 50);
            drawMole(stimLocations[p_randomStimList[0]].left + 50, stimLocations[p_randomStimList[0]].top + 50);
            p_randomStimList.shift();   
        } else if(version == "boring"){
            drawCircle(stimLocations[i].left + 50, stimLocations[i].top + 50);
        }
    }
}

var placeStim = function() {

	if (Date.now() > levelStartTime + leveltimelimit) {
		myStopFunction();
		advanceLevel();
	}
    ++numberofstimsshown;
    ++stimsshownthislevel;
    cantclickagain = false;
    if(typestimpattern == "list"){
    	listPlaceStim();
    } else if (typestimpattern == "random"){
    	Rand_placeStim();
    }
	startStimTimer(nextstimtime);	
}

var drawCircle = function(x, y, fill, color) {
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.beginPath();
    context2.arc(x, y, 50, 0, 2 * Math.PI);
    if(fill == true){
    	context.fillStyle = color;
    	context2.fill();
    } else {
    	context2.stroke();
        timestimsarrive.push(Date.now()); 
        //console.log("loging in draw circle");
    }
};


function myStopFunction() {
    clearTimeout(stimtimer);
    stimtimer = null;
}


var introduction = function() {
    Qform.style.display='none';
    demogForm.style.display='none';
    gameover_text.style.display='none';
    //set for list version
    p_randomStimList = p_randomStimList8;
    //
    if(version=="boring"){
        whackamole_inst.style.display='none';
    } else if (version == "whackamole") {
        boring_instructions_text.style.display='none';
    }
    context3.font = "30px Arial";
    //context3.strokeText("click the rectangle to begin", 400, 400);
    context3.strokeRect(300, 600, 100, 100);
    context3.fillText("continue", 300, 600)
};

var checkfun = function() {

    //console.log("checkingfun");
	$("body").css("background-image", "none");

    Qform.reset();
    Qform.style.display=""; // initial
    stage = "checkingfun";
};

var play = function(lvl) {
    stimsshownthislevel = 0;
    stimsclickedthislevel = 0;
    boring_instructions_text.style.display='none';
    whackamole_inst.style.display='none';

    if(version == "whackamole"){
        var grass = new Image();
    
        grass.onload=function(){
            document.body.background = grass;
        }

        grass.src = 'images/grassbackground.jpg';

        $("body").css("background-image", "url(images/grassbackground.jpg)");

    }
    if(molespeedselection == "random"){
    	nextstimtime = molespeeds[Math.floor(Math.random()*molespeeds.length)];
    	console.log(nextstimtime);
    }
    console.log(nextstimtime);
	
    Qform.style.display='none';
    available_stimLocations(lvl);
    levelStartTime = Date.now();
    placeStim();
};

var thatsgame = function() {
    demogForm.style.display='none';
    Qform.style.display='none';
    if(showdemogform == true){
        showdemogform = false;
        demogForm.reset();
        demogForm.style.display=""; //initial
    } else {
        $("body").removeAttr('style');
        //console.log("thats game");
        gameover_text.style.display=""; //initial
        key = makeid();
        key = "ID!" + key
        jsonkey = JSON.stringify(key);
        $.ajax({
        url: 'savecheckfun.php',
        data: {'checkFunData': jsonkey},
        type: 'POST'
        });
        document.getElementById('key').innerHTML = key;
        //context3.fillText(key, 400, 600);
        //saveToFile(mousecordsX);
        //console.log("game ovah");
    }
};

var available_stimLocations = function(lvl) {
	//console.log(lvl); 
	loopbreaker = 0;
    for (j = 0; j < lvl; j++) {
        //i = j * 700;
        angle = 15 * j;
        a = 60;
        //b = 2.7;
        b = 1.5;
        r = a + (b * angle);
        x = r * Math.cos(angle);
        x = Math.round(x) + 400; // + 400
        y = r * Math.sin(angle);
        y = Math.round(y) + 300; // + 400
        //h++;
        //label = h.toString();
        //drawRect(x, y, "Box" + label);
        var stimLocation = new StimLocation(x, y, length, width);
        if((x<750) && (x>0) && (y>0) && (y<750)){
        	stimLocations.push(stimLocation);
        } else{
        	--j
        	++loopbreaker;
        }
        if(loopbreaker>25){
        	break;
        }

        if(version == "whackamole"){
            drawMoleHill(x, y);   
        } else if(version == "boring"){
            drawRect(x, y); //previosly had label as parameter if it breaks
        }
    }
    stimIndices = range(stimLocations.length);
    console.log(stimLocations.length);
};

var Stim = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
};

var drawRect = function(x, y) {

    context.strokeRect(x, y, 100, 100);
    //context.fillText(filltext, x, y);

};

var StimLocation = function(x, y, length, width) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + length;
};


canvas4.addEventListener('click', function(e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;

    if (stage == "intro") {
        if (clickedX < 400 && clickedX >= 300 && clickedY >= 600 && clickedY <= 700) {
            context3.clearRect(0, 0, canvas3.width, canvas3.height);
            consent = true;
            stage = "playing";
            play(difficultylevel);
        }
    } else if (stage == "playing") {

        mouseCordsYClicks.push(clickedY);
        mouseCordsXClicks.push(clickedX);
        mouseClickTimes.push(Date.now());

        if ((Math.abs(clickedX - stim.x) < stim.r) && (Math.abs(clickedY - stim.y) < stim.r) && (cantclickagain == false)) {
            cantclickagain = true;
            context2.clearRect(0, 0, canvas2.width, canvas2.height);
            if (clickedStims == numberofhitsneeded) {
            	clickedStims++;
                ++stimsclickedthislevel;
                advanceLevel();
            } else {
            	clickedStims++;
                ++stimsclickedthislevel;
                console.log(nextstimtime);
                if(version == "whackamole"){
                    drawMole(stim.x, stim.y, true); 
                } else if(version == "boring"){
                    drawCircle(stim.x, stim.y, true, "green");
                }
                delaytimer(clickedstimnextstim);
            }
        }
        else {
        }
    }
});
/*
function advanceLevel() {
	myStopFunction();
	console.log("advancinglevel");
	console.log(mousecordsX);
    //saveToFile(mousecordsX);
    //saveToFile(mousecordsY);
    //saveToFile(timemousecords);
    //saveToFile(timestimsarrive);
    //saveToFile(numberofstimsshown);
    //saveToFile(clickedStims);
    //console.log("savedstufftofile");
    var accuracyratio = stimsclickedthislevel/stimsshownthislevel;
    saveToFile("leveldata!" + accuracyratio + "!" + mousecordsX + "!" + mousecordsY + "!" + timemousecords + "!" + timestimsarrive + "!" + difficultylevel + "!" + stimsclickedthislevel + "!" + stimsshownthislevel + "!" + mouseCordsYClicks + "!" + mouseCordsXClicks);
    //stimsshownthislevel = 0;
    //stimsclickedthislevel = 0;
	//timemousecords = [];
	//timestimsarrive = [];
	mousecordsX = [];
	mousecordsY = [];
	mouseCordsYClicks = [];
	mouseCordsXClicks = [];
	context2.clearRect(0, 0, canvas3.width, canvas3.height);
    context.clearRect(0, 0, canvas3.width, canvas3.height);
    clickedStims = 1;
    stimIndices = range(stimLocations.length);
    h = 1;
    ++difficultylevel;
    if(difficultylevel>numberoflevels){
        gamecomplete = true;
    }
    checkfun();    
}
*/
function advanceLevel() {
	++numberoflevelscompleted;
    myStopFunction();
    //console.log("advancinglevel");
    //saveToFile(mousecordsX);
    //saveToFile(mousecordsY);
    //saveToFile(timemousecords);
    //saveToFile(timestimsarrive);
    //saveToFile(numberofstimsshown);
    //saveToFile(clickedStims);
    //console.log("savedstufftofile");
    var accuracyratio = stimsclickedthislevel/stimsshownthislevel;
    saveToFile("leveldata!" + accuracyratio + "!" + mousecordsX + "!" + mousecordsY + "!" + timemousecords + "!" + timestimsarrive + "!" + difficultylevel + "!" + nextstimtime + "!" + stimsclickedthislevel + "!" + stimsshownthislevel + "!" + mouseCordsYClicks + "!" + mouseCordsXClicks + "!" + mouseClickTimes);
    //saveToFile(accuracyratio + "!" + mousecordsX + "!" + mousecordsY + "!" + timemousecords + "!" + timestimsarrive + "!" + difficultylevel + "!" + stimsclickedthislevel + "!" + stimsshownthislevel);
    context2.clearRect(0, 0, canvas3.width, canvas3.height);
    context.clearRect(0, 0, canvas3.width, canvas3.height);
    clickedStims = 1;
    stimIndices = range(stimLocations.length);
    stimLocations = [];
    //h = 1;
    mousecordsX = [];
    mousecordsY = [];
    mouseCordsYClicks = [];
    mouseCordsXClicks = [];
    stimsshownthislevel = 0;
    stimsclickedthislevel = 0;
    timemousecords = [];
    timestimsarrive = [];
    mouseClickTimes = [];
    if(typelevelselection == "incremental"){
    	++difficultylevel;
    } else if (typelevelselection == "everyother"){
    	++difficultylevel;
    	++difficultylevel;
    } else if(typelevelselection == "random"){

    }
    if(difficultylevel>maximumdifficultylevel){
        gamecomplete = true;
    }else if(numberoflevelscompleted >= maximumlevels){
    	gamecomplete = true;
    }
    //sets the random list to be an appropriate one

    if (difficultylevel == 3) {
        p_randomStimList = p_randomStimList3
    } else if (difficultylevel == 4) {
        p_randomStimList = p_randomStimList4
    } else if (difficultylevel == 3) {
        p_randomStimList = p_randomStimList5
    } else if (difficultylevel == 5) {
        p_randomStimList = p_randomStimList5
    } else if (difficultylevel == 6) {
        p_randomStimList = p_randomStimList6
    } else if (difficultylevel == 7) {
        p_randomStimList = p_randomStimList7
    } else if (difficultylevel == 8) {
        p_randomStimList = p_randomStimList8
    } else if (difficultylevel == 9) {
        p_randomStimList = p_randomStimList9
    } else if (difficultylevel == 10) {
        p_randomStimList = p_randomStimList10
    }
    checkfun();    
}

function backtoGame(form){
    saveform(form);
    context3.clearRect(0, 0, canvas3.width, canvas3.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    if(gamecomplete == false){
        stage = "playing";
        play(difficultylevel);
        return false;
    } else {
        thatsgame();
        return false;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function range(i) { return i ? range(i - 1).concat(i - 1) : [] }


canvas4.addEventListener('mousemove', function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    if(stage == "playing"){
        mousecordsX.push(mouseX);
        mousecordsY.push(mouseY);
        //console.log(mouseX);
        timemousecords.push(Date.now());
        //console.log(timemousecords);
        leveltheyreon.push(difficultylevel);
    }
});

var checktime = function() {
    var d = new Date();
    return d.getTime();
}

function saveToFile(data) {
    jsonString = JSON.stringify(data);
    $.ajax({
        url: 'save.php',
        data: { 'jsonString': jsonString},
        type: 'POST'
    });
}

function saveform(form) {
    var checkfunData;
    //console.log(form.id);
    checkfunData += form.id + "!";
    for (i = 0; i < form.length; i++){
    	if(form.elements[i].type != "radio" && form.elements[i].type != null){
    		checkfunData += form.elements[i].name + "=" + form.elements[i].value + ", ";
    	}
        if(form.elements[i].checked == true){
            checkfunData += form.elements[i].name + "=" + form.elements[i].value + ", ";
        }
    }
    json_checkfunData = JSON.stringify(checkfunData);
    $.ajax({
        url: 'savecheckfun.php',
        data: {'checkFunData': json_checkfunData},
        type: 'POST'
    });
    return false;
}

function updateSlider(value, slider) {
    document.getElementById(slider).innerHTML=value;
}





/*

NEW FUNCTIONS MADE FOR WHACKAMOLE

*/



var drawMole = function(x, y, dead) {

    if(dead==true){
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(deadmole, x - 50, y - 50);
    } else{
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.drawImage(livemole, x - 50, y - 50);  
        timestimsarrive.push(Date.now()); 
        //console.log("drewnewmole");
    }
};

var drawMoleHill = function(x, y) {

    var hole = new Image();
    hole.onload=function(){
     	context.drawImage(hole, x - 35, y + 50);
    }
    hole.src = 'images/mole_hole1.png';
};

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var setversion = function(){
	/*
    if (Math.random()>.5) {
	   version = "whackamole"; // boring or whackamole

	} else {
		version = "boring";
	}
    */
    //always whackamole now
    version = "whackamole";
};

var randtester = function(){
	var heads = 0;
	for (var i = 1000; i >= 0; i--) {
		if (Math.random()>.5) {
			heads += 1;
		}	}
	return heads;
};