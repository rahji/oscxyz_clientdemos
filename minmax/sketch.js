// A table showing the current, minimum and maximum values
// of the accelerometer data coming from the phone.
// No smoothing is applied to the data in this example.

// where the websockets server is (your local machine)
const host = '127.0.0.1:8080';
var socket; // the websocket

var xyzData = [0,0,0];      // array to hold the accelerometer data
var xyzMax = [-99,-99,-99]; // array to hold the max values
var xyzMin = [99,99,99];    // array to hold the min values

function setup() {
  createCanvas(600, 150);
  textSize(18);
  textFont("Courier New");
  textAlign(RIGHT);

  // connect to server...
  socket = new WebSocket('ws://' + host);
  socket.onopen = openHandler;
  socket.onmessage = messageHandler;
}

function draw() {
  background("white");

  if (xyzData[0] > xyzMax[0]) xyzMax[0] = xyzData[0];
  if (xyzData[1] > xyzMax[1]) xyzMax[1] = xyzData[1];
  if (xyzData[2] > xyzMax[2]) xyzMax[2] = xyzData[2];

  if (xyzData[0] < xyzMin[0]) xyzMin[0] = xyzData[0];
  if (xyzData[1] < xyzMin[1]) xyzMin[1] = xyzData[1];
  if (xyzData[2] < xyzMin[2]) xyzMin[2] = xyzData[2];

  text("NOW",123,40); text("MIN",250,40); text("MAX",380,40);
  text("X",20,60);  
  text(xyzData[0].toFixed(2), 123, 60);
  text(xyzMin[0].toFixed(2), 250, 60);
  text(xyzMax[0].toFixed(2), 380, 60);
  text("Y",20,80); 
  text(xyzData[1].toFixed(2), 123, 80);
  text(xyzMin[1].toFixed(2), 250, 80);
  text(xyzMax[1].toFixed(2), 380, 80);
  text("Z",20,100);
  text(xyzData[2].toFixed(2), 123, 100);
  text(xyzMin[2].toFixed(2), 250, 100);
  text(xyzMax[2].toFixed(2), 380, 100);
}

function openHandler() {
  println("Connected to server at " + host);
}
  
function messageHandler(event) {
  var msg = event.data; // read data from the onmessage event
  xyzData = split(msg,' ').map(Number); // split the data into an array *of numbers*
}