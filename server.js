// server.js
// where your node app strts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { request } = require('express');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:input?", function (req, res) {

  const entry = req.params.input;
  const entryToNumber = Number(entry);

  const isDate = () => {
    return (!isNaN(new Date(entry).getTime()))
  }

  if (!req.params.input) {
    res.json({
      unix: Date.now(),
      utc: new Date().toUTCString()
    })
  }
  if (isDate()) {
    res.json({
      unix: new Date(entry).getTime(),
      utc: new Date(entry).toUTCString()
    })
  }
  if (new Date(entryToNumber) != "Invalid Date") {
    res.json({
      unix: entryToNumber,
      utc: new Date(entryToNumber).toUTCString()
    })
  } else {
    res.json({
      error: "Invalid Date"
    })
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

