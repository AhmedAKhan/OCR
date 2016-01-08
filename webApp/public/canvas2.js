

// get the canvas
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

globel.redrawc2 = redrawSecondCanvas;



