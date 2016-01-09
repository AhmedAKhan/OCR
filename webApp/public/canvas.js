//------------------------------ declare variables -----------------------------------------------------------------------

// set the dimensions of the canvas
var canvasWidth = 28 * 4;
var canvasHeight = 28 * 4;

// this is the height and width of the dimension of the shape that will get sent to the server
var rescaledHeight = 28;
var rescaledWidth = 28;

// rescaled grid
rescaledGrid = [];
for(var i = 0; i < 28; i++){
  for(var j =0; j < 28; j++){
    rescaledGrid.push(0);
  }
}


//------------------------------ end declare variables -----------------------------------------------------------------------



//------------------------------ make the canvas larger one -----------------------------------------------------------------------

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
//------------------------------ end making canvas larger one  -----------------------------------------------------------------------




//------------------------------ start making canvas smaller one -----------------------------------------------------------------------
// get the second canvas
var canvasDiv = document.getElementById('canvasDiv2');
canvas = document.createElement('canvas');
canvas.setAttribute('width', 28);
canvas.setAttribute('height', 28);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
}
contextScalled = canvas.getContext("2d");

function redrawSecondCanvas(rescaledGrid){
  console.log("2.0 inside the redraw canvas");
  contextScalled.clearRect(0, 0, contextScalled.canvas.width, contextScalled.canvas.height); // Clears the canvas

  contextScalled.strokeStyle = "#000000";
  contextScalled.lineJoin = "round";
  contextScalled.lineWidth = 1;

  console.log("2.1 inside redraw the second canvas");
  // contextScalled.fillRect(4,4,1,1);
  // contextScalled.fillRect(5,4,1,1);
  // contextScalled.fillRect(6,4,1,1);
  // contextScalled.fillRect(7,4,1,1);

  // for(var i =0; i < clickX.length;i++){
  //   contextScalled.fillRect(clickX[i], clickY[i], 1,1);
  // }

  console.log("2.2 going to print the values of the rescalled grid value for rescaled grid is ");
  console.log(rescaledGrid);
  for(var i= 0; i < 28; i++){
    for(var j = 0; j< 28; j++){
      // contextScalled.fillRect(clickX[i], clickY[i], 1,1);
      var val = rescaledGrid[i+j*28];
      contextScalled.fillRect(i,j, val,val);
    }
  }


  // for(var i=0; i < clickX.length; i++) {
  //   contextScalled.beginPath();
  //   contextScalled.moveTo(clickX[i], clickY[i]);
  //   contextScalled.lineTo(clickX[i], clickY[i]);
  //   contextScalled.closePath();
  //   contextScalled.stroke();
  // }
}

//------------------------------ end making canvas smaller one  -----------------------------------------------------------------------


//------------------------------ start helper functions  -----------------------------------------------------------------------


function getScreenData(){
  // console.log("0. started getting screen data");
  // make a blank canvas
  var data = [];
  for(var i = 0; i < canvasWidth; i++){
    for(var j = 0; j < canvasHeight; j++){
      data.push(0);
    }
  }

  // console.log("0.2 dont the first part, going to print all zeros");
  // console.log(data);
  // add the image on the data
  for(var i = 0; i < clickX.length; i++){
    var xPos = clickX[i];
    var yPos = clickY[i];
    // console.log("xPos: " + xPos + " yPos: " + yPos + " (xPos+yPos*canvasWidth):"+(xPos+yPos*canvasWidth));
    if(xPos + yPos * canvasWidth >= canvasWidth*canvasHeight) continue;
    data[xPos + yPos * canvasWidth] = 1;
  }
  // console.log("0.9 done the function going to print data");
  // console.log(data)
  return data;
}


function parseScreenData(){
  var data = getScreenData();
  data = getRescaleData(data);

  // convert the data to a string
  var stringData = '';
  for(var j = 0; j < 28; j++){
    var curString = '';
    for(var i =0; i < 28; i++){
      stringData = stringData + ((data[i + j*28] > 0)? "1":"0");
      curString = curString + ((data[i + j*28] > 0)? "1":"0");
    }
    // console.log("j: " + j + " str: "+ curString);
  }
  return stringData;// return the data converted to a string
}


//------------------------------ end helper functions  -----------------------------------------------------------------------





//------------------------------ start drawing functions -----------------------------------------------------------------------
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

function getRescaleData(data, oldWidth=canvasWidth, oldHeight=canvasHeight, newWidth=rescaledWidth, newHeight=rescaledHeight){
  console.log("oldWidth: " + oldWidth + " oldHeight: " + oldHeight + " newWidth: " + newWidth + " newHeight: " + newHeight);

  // if the size is smaller then 28 by 28, then the neural network would not be able to find the answer so, end this function and spit out an error
  if(oldWidth <  newWidth || oldHeight < newHeight)
    { console.log("input size is smaller then 28 by 28"); return data; }
  var rescaledData = [];
  for(var i = 0; i < newWidth; i++){
    for(var j = 0; j < newHeight; j++){
      rescaledData.push(0);
    }
  }
  console.log("2 the input data is ");
  console.log(data);
  console.log("the so far output is ");
  console.log(rescaledData);

  // rescaled variables, rfx = rescale factor x, and rfy = rescale factor y .
  // these represent the number of pixels in the old image equalling to
  var rfx = oldWidth/newWidth;
  var rfy = oldHeight/newHeight;
  console.log("2.5 going to print rfx: " + rfx + " and rfy: " + rfy);

  // actually rescale the data
  for(var i = 0; i < newWidth; i++){
    for(var j = 0; j < newHeight; j++){
      // make this pixel equal to the average of the rfx and rfy pixels
      var averagePixel = 0;
      for(var incx = 0; incx < rfx ; incx++ ){
        for(var incy = 0; incy < rfy; incy++){
          var x = i * rfx + incx;// x = i * rfx + incx;
          var y = j * rfy + incy;// y = j * rfy + incy;
          averagePixel += data[ x + y*oldWidth];
        }
      }
      averagePixel = averagePixel/(rfx*rfy)
      rescaledData[i + j * newWidth] = averagePixel;
    }
  }

  console.log("2.9 going to return rescaled data, also going to print it out");
  console.log(rescaledData);
  return rescaledData;
}

function redraw2(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 1;

  console.log("-1.  inside redraw for main ");
  var screenData = getScreenData();
  console.log("1  going to draw the origin screen data");
  console.log(screenData);
  rescaledGrid = getRescaleData(screenData);
  console
  console.log("2 got the rescaeled data, going to redraw the canvas");
  console.log(rescaledGrid);
  redrawSecondCanvas(rescaledGrid);
  console.log("3  inside redraw for main canvas ");

  for(var i =0; i < clickX.length;i++) context.fillRect(clickX[i], clickY[i], 1,1);
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
//------------------------------ end drawing functions  -----------------------------------------------------------------------





//------------------------------ start server functions -----------------------------------------------------------------------

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
  console.log("sending the request");
  var data = parseScreenData();
  console.log("the resulting text is " + data);
  xhttp.send(data);
}

//------------------------------ end server functions  -----------------------------------------------------------------------




