
var exec = require('child_process').exec;


function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


var input = '';
for(var i = 0; i < 28; i++){
  for(var j = 0; j < 28; j++){
    input = input + '0 ';
  }
}
execute('octave solveOneTestCase.m '+input, function(stdout){
  console.log('octave solveOneTestCase.m ' + input);
  console.log("stdout");
  console.log(stdout);
  var result = stdout.substring(stdout.indexOf("=") + 1);
  result = result.trim();
  console.log("--"+result+'--');
});




