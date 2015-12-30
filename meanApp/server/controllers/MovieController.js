var restful = require('node-restful');

module.exports = function(app, route){
  //setup the controller
  var rest = restful.model(
    'movies',
    app.models.movie
  ).methods(['get', 'put', 'post', 'delete']);

  //register this endpoint with the application
  rest.register(app, route);

  // return the middleware
  return function(req, res, next){
    next();
  }
}


