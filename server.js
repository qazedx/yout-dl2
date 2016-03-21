var express = require('express'),
  app = express();
var port = 3000;
app
  .use(express.static('./public'))
  .get('/data',function(req,res){
  data = readFileSync('data.json')
  res.send(data);
  })
  .get('/', function (req, res) {
    res.sendFile('public/main.html', {
      "root": "."
    });

  }).listen(port);
  console.log("listening on "+port);
// read files
var ytdl = require('ytdl-core');
var path = require('path')
var bodyParser = require('body-parser')
var fs = require('fs');
function write2file(data) {
  var data_tmp;

  data_tmp = data;
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
    if(err) {
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

app.post('/data', function(request, response){
    console.log(request.data);
    // write2file(request);
    response.send("got");
});
