//declare variables
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var exec = require('child_process').exec;
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', express.static( __dirname+'/public'));

function printData(data){
  data = data.replace(/ /g, '');
  var sizeOfPicture  = 28;
  for(var i = 1; sizeOfPicture*i < data.length; i++){
    console.log(data.substring((i-1)*sizeOfPicture, i*sizeOfPicture));
  }
}

app.post('/ocr', function(req, res){
  var inputData = '';
  req.on("data", function(data){
    inputData += data
  });

  req.on("end", function(){
    // printData(inputData);
    // console.log("about to print req body name, got from post name:"+inputData);
    // console.log(req.body);
    // console.log('octave solveOneTestCase.m ' + inputData);
    if(inputData === undefined || inputData === null){ console.log("the input is empty"); res.send("the input was empty"); return; }

    // var input = inputData.replace(/1/g, 255);
    var input = inputData;

    console.log(input);

    // exec('cd ../tensflowCode/ &&' + ' python3 convnet.py runCase "'+ input + '" && cd ..', function(error, stdout, stderr){
    // exec('cd pythonOcrCode &&' + ' python3 convnet.py runCase "'+ input + '" && cd ..', function(error, stdout, stderr){
    exec('cd ../tensflowCode/ &&' + ' python3 convnet.py runCase "'+ input + '" && cd ../webApp  ', function(error, stdout, stderr){
      console.log('stdout: ' + stdout);
      if(error != null){ console.log("got an error " + error);  res.send('got null for some reason, as the stdout');  return; }
      var result = stdout.substring(stdout.indexOf("=[") + 2, stdout.indexOf("=[") + 1 + 2);
      result = result.trim();
      console.log("result is " + result + "\n\n\n");
      res.send(result);
    });

    // python3 convnet.py runCase '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    // python3 convnet.py runCase
  });
});

// start the server
app.listen('3000');
console.log('Magic happens on 3000');



