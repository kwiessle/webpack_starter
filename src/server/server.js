const http = require('http');
const path = require('path');
const port = process.env.PORT || 9000;
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('*', function(req, res){
  res.sendFile(path.resolve('public') + '/index.html');
});

http.createServer(app, function(req, res) {
  res.writeHead(200);
}).listen(port);
console.log('[BACKEND] -- Listening from PORT : %d', port);
