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
// check if new date = invalid date, if entry is blank return current time,   
app.get("/api/timestamp/:date?", function (req, res) {

  const entry = req.params.date;
  const entryToNumber = parseInt(req.params.date);

  let utcDate;
  let unixDate;
  let errorEntry;

  const isEmpty = function () {
    return (!req.params.date);
  }
  const isDate = function () {

    return (new Date(entry) !== "Invalid Date");
  }


  if (isEmpty()) {
    // 
    //
    unixDate = Date.now();
    utcDate = new Date().toUTCString();

  } else
    if (!isDate()) {
      errorEntry = "Invalid Date";
    } else
      if (entry.includes("-") === true) {

        const entrySplitByHyphen = req.params.date.split("-");

        const year = parseInt(entrySplitByHyphen[0]);
        const month = parseInt(entrySplitByHyphen[1]) - 1;
        const day = parseInt(entrySplitByHyphen[2]);

        utcDate = new Date(year, month, day).toUTCString();
        unixDate = new Date(req.params.date).getTime()
      } else
        if (entry.length === 13) {

          unixDate = entryToNumber;
          utcDate = new Date(entryToNumber).toUTCString();

        } else {
          errorEntry = "Invalid Date";
        }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({

    unix: unixDate,
    utc: utcDate,
    error: errorEntry


  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

