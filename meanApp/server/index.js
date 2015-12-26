var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

//create the app
var app = express();

//add the middleware necessary for the REST API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS support
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



//load the routes
var routes = require('./routes');
// connect to mongodb
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function(){
  //load the models
  app.models = require('./models/index');

  //load the routes
   _.each(routes, function(controller, route){
    app.use(route, controller(app, route));
  });

 
  console.log('listening to port 3000');
  app.listen(3000);
});


