var express = require('express'),
  app = express();
var port = 3000;
app
  .use(express.static('./public'))
  .get('*', function (req, res) {
    res.sendFile('public/main.html', {
      "root": "."
    });

  }).listen(port);
  console.log("listening on "+port);
// read files
var fs = require('fs');
var ytdl = require('ytdl-core');
var path = require('path')
