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

app.post('/shows/import', function(req, res) {
  console.log(req.body);

  var options = {
    url: 'http://api.tvmaze.com/singlesearch/shows?q=' + req.body.tvshow,
    method: 'GET'
  }

  request.get(options, function(err, res, body) {
    var results = JSON.parse(body);
    console.log('REQUEST.GET JSON.PARSED results', results);

    if (err) {
      throw err;
    }
    var newShow = {
      title: results.name,
      summary: results.summary,
      image: results.image.medium
    };
    console.log('NEW SHOW', newShow);

    Show.create(newShow, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  })

  res.send('APP POST WORKED');
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

