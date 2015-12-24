// import required things
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib');

// create an express instance
var app = express()


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))




app.get('/', function (req, res) {
  console.log("waiting on port 3000");
  res.render('index', { title : 'Home' });
})
app.listen(3000)

console.log("waiting on port 3000");
