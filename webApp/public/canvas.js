
// set the dimensions of the canvas
var canvasWidth = 28;
var canvasHeight = 28;

// get the canvas
var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  // clickX.push(x);
  // clickY.push(y);
  // clickDrag.push(dragging);

  // new version start
  // middle
  clickX.push(x);
  clickY.push(y);

  // left
  clickX.push(x-1);
  clickY.push(y);

  // topleft
  clickX.push(x-1);
  clickY.push(y-1);

  // top
  clickX.push(x);
  clickY.push(y-1);

  //top right
  clickX.push(x+1);
  clickY.push(y-1);

  //right
  clickX.push(x+1);
  clickY.push(y);

  // bottom right
  clickX.push(x+1);
  clickY.push(y+1);

  // bottom
  clickX.push(x);
  clickY.push(y+1);

  // bottom left
  clickX.push(x-1);
  clickY.push(y+1);
}

// this will clear the screen when called
function clearScreen(){
  console.log("inside the clear screen function");

  // sendDataToServer();

  clickX = [];
  clickY = [];
  redraw();
}

function redraw2(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 1;

  // context.fillRect(4,4,1,1);
  // context.fillRect(5,4,1,1);
  // context.fillRect(6,4,1,1);
  // context.fillRect(7,4,1,1);

  for(var i =0; i < clickX.length;i++){
    context.fillRect(clickX[i], clickY[i], 1,1);
  }
  // for(var i=0; i < clickX.length; i++) {
  //   context.beginPath();
  //   context.moveTo(clickX[i], clickY[i]);
  //   context.lineTo(clickX[i], clickY[i]);
  //   context.closePath();
  //   context.stroke();
  // }
}
// redraws the screen
function redraw(){
  redraw2();
  // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  // console.log(clickX);
  // console.log(clickY);

  // // // context.strokeStyle = "#df4b26";
  // // // context.strokeStyle = "#ffffff";
  // // context.strokeStyle = "#000000";
  // // context.lineJoin = "round";
  // // context.lineWidth = 1;

  // for(var i=0; i < clickX.length; i++) {
  //   context.beginPath();
  //   if(clickDrag[i] && i){
  //     context.moveTo(clickX[i-1], clickY[i-1]);
  //    }else{
  //      context.moveTo(clickX[i]-1, clickY[i]);
  //    }
  //    context.lineTo(clickX[i], clickY[i]);
  //    context.closePath();
  //    context.stroke();
  // }
}

function getScreenData(){
  // make a blank canvas
  var data = [];
  for(var i = 0; i < 28; i++){
    for(var j = 0; j < 28; j++){
      data.push(0);
    }
  }

  // add the image on the data
  for(var i = 0; i < clickX.length; i++){
    var xPos = clickX[i];
    var yPos = clickY[i];
    console.log("xPos: " + xPos + " yPos: " + yPos + " (xPos+yPos*28):"+(xPos+yPos*28));
    if(xPos + yPos * 28 >= 28*28) continue;
    data[xPos + yPos * 28] = 1;
  }
  console.log("data");
  console.log(data);

  // convert the data to a string
  var stringData = '';
  for(var j = 0; j < 28; j++){
    var curString = '';
    for(var i =0; i < 28; i++){
      stringData = stringData + data[i + j*28];
      curString = curString + data[i + j*28];
    }
    console.log(curString);
  }

  return stringData;// return the data converted to a string
}

function sendRequest(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    //console.log(xhttp.responseText);
    $("#result").html(xhttp.responseText);
    //if (xhttp.readyState == 4 && xhttp.status == 200) {
    //  document.getElementById("demo").innerHTML = xhttp.responseText;
    //}
  };
  //xhttp.open("GET", "http://localhost:3000/", true);
  xhttp.open("POST", "http://localhost:3000/ocr", true);
  xhttp.setRequestHeader("Content-type", "drawing-data");
  // xhttp.send("0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
  xhttp.send(getScreenData());
}




