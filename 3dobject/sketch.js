// A 3D object that rotate around one axis
// based on the rotation of the phone

// where the serial server is (your local machine)
var host = '127.0.0.1:8080';
var socket; // the websocket

var rotation = 0;
var prevRotation = 0;

function setup() {
  createCanvas(600, 600, WEBGL);

  // connect to server...
  socket = new WebSocket('ws://' + host);
  socket.onopen = openHandler;
  socket.onmessage = messageHandler;
}

function draw() {
  background(100);

  rotation = lerp(prevRotation, rotation, 0.2);
  rotateX(rotation);

  box(180,320,20);

  prevRotation = rotation;
}

function openHandler() {
  println("Connected to server at " + host);
}
  
function messageHandler(event) {
  var msg = event.data; // read data from the onmessage event
  var xyzData = split(msg,' ').map(Number); // split the data into an array *of numbers*
  rotation = xyzData[2] > 10 ? 10 : xyzData[2] < -10 ? -10 : xyzData[2]; // limit to -10 to 10
  rotation = map(rotation, -10, 10, -HALF_PI, HALF_PI);
}