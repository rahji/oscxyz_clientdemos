// Three bar graphs, representing the (smoothed)
// accelerometer data from the phone

// where the websockets server is (your local machine)
var host = '127.0.0.1:8080';
var socket; // the websocket

var xyzData = [0,0,0]; // array to hold the accelerometer data
var x = 0;
var y = 0;
var z = 0;

function setup() {
  createCanvas(400, 300);  
  noStroke();
  textSize(16);

  // connect to server...
  socket = new WebSocket('ws://' + host);
  socket.onopen = openHandler;
  socket.onmessage = messageHandler;
}

function draw() {
  background(150);

  fill("red");
  text("x: " + xyzData[0], 10, 20);
  fill("green");
  text("y: " + xyzData[1], 10, 40);
  fill("blue");
  text("z: " + xyzData[2], 10, 60);

  // smooth out the values
  x = lerp(x, xyzData[0], 0.05);
  y = lerp(y, xyzData[1], 0.05);
  z = lerp(z, xyzData[2], 0.05);

  push();
  translate(200,height/2);
  fill(255,0,0);
  scale(1.0,-x*10);
  rect(0,0,20,1);
  pop();

  push();
  translate(230,height/2);
  fill(0,255,0);
  scale(1.0,-y*10);
  rect(0,0,20,1);
  pop();

  push();
  translate(260,height/2);
  fill(0,0,255);
  scale(1.0,-z*10);
  rect(0,0,20,1);
  pop();

}

function openHandler() {
  println("Connected to server at " + host);
}
  
function messageHandler(event) {
  var msg = event.data; // read data from the onmessage event
  xyzData = split(msg,' ').map(Number); // split the data into an array *of numbers*
}