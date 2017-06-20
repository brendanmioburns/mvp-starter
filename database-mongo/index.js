var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/getshows');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var showSchema = mongoose.Schema({
  title: String,
  summary: String,
  image: String
});

var Show = mongoose.model('Show', showSchema);

var selectAll = function(callback) {
  Show.find({}, function(err, shows) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, shows);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.Show = Show;