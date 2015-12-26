
var mongoose = require('mongoose');


//create a movie scheme
var MovieSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  url:{
     type: String,
    required: true
  }
});

//export the schema
module.exports = MovieSchema;
