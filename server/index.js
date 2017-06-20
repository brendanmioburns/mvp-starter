var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Show = require('../database-mongo/index.js').Show;

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

//POST-request to search for a show and add to database
app.post('/shows/import', function(req, res) {
  console.log(req.body);

  var options = {
    url: 'http://api.tvmaze.com/singlesearch/shows?q=' + req.body.tvshow,
    method: 'GET'
  }
  //make request to API and then parse the body of the results for database insertion
  request.get(options, function(err, _, body) {
    if (err) {
      throw err;
    }
    var results = JSON.parse(body);
    console.log('REQUEST.GET JSON.PARSED results: ', results);

    //specify what contents of the parsed API results will be added to database
    var newShow = {
      title: results.name,
      summary: results.summary.slice(3, -4),
      image: results.image.medium
    };
    console.log('NEW SHOW', newShow);

    //add to database
    Show.create(newShow, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.send('APP POST WORKED');
    });
  })
});

app.get('/shows', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

