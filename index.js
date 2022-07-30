// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  if(!req.params.date){
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
  } else if(!isNaN(req.params.date)){
    res.json({unix: new Date(parseInt(req.params.date)).getTime(), utc: new Date(parseInt(req.params.date)).toUTCString()});
  } else if(!new Date(req.params.date).getTime()){
    res.json({error: new Date(req.params.date).toUTCString()});
  } else {
    res.json({unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
