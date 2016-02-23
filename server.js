var express = require('express'),
  app = express();

app
  .use(express.static('./public'))
  .get('*', function (req, res) {
    res.sendFile('public/search.html', {
      // res.sendFile('public/my_upl.html', {
      "root": "."
    });
  }).listen(3000);

// read files
var fs = require('fs');
var ytdl = require('ytdl-core');
var path = require('path')
