var express = require('express'),
  app = express();
var port = 3000;
app
  .use(express.static('./public'))
  .get('/data', function (req, res) {
    data = readFileSync('data.json')
    res.send(data);
  })
  .get('/', function (req, res) {
    res.sendFile('public/main.html', {
      "root": "."
    });

  }).listen(port);
console.log("listening on " + port);
// read files
var ytdl = require('ytdl-core');
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs');

function write2file(data) {
  var data_tmp;

  data_tmp = data;
  fs.writeFile("data.json", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function readFileSync(file) {
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(obj);
  return obj;
}

//post
// app.use(express.bodyParser());

app.post('/data', function (request, response) {
  var fullBody = '';
  request.on('data', function (chunk) {
    // append the current chunk of data to the fullBody variable
    fullBody += chunk.toString();
    fullBody = JSON.parse(fullBody)
    response.send("got");
    console.log(fullBody);
    var obj = readFileSync('data.json');
    if (fullBody.type == "subsctiptions-list") {
      obj.subscriptions = fullBody.list
    } else if (fullBody.type == "add") {
      data = {
        title: fullBody.title,
        channelId: fullBody.channelId,
        playlistId: fullBody.uploadsId
      }
      console.log(fullBody);
      obj.collections[fullBody.collection].push(data);
    } else if (fullBody.type == "remove") {

      console.log("fullBody");
      for (var i = 0; i < obj.collections[fullBody.collection].length; i++) {
        console.log(obj.collections[fullBody.collection][i].channelId+ " "+ fullBody.channelId);
        if (obj.collections[fullBody.collection][i].channelId == fullBody.channelId) {
          obj.collections[fullBody.collection].splice(i, 1);

        }
      }
    }
    write2file(obj);
  });
  // write2file(request);

});
