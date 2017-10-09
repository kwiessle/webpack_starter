const http = require('http');
const path = require('path');
const port = process.env.PORT || 9000;

var express = require('express');
var app = express();


app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public') + '/index.html');
});

var SERVER = http.createServer(app, (req, res) => {
  res.writeHead(200);
}).listen(port);

const io = require('socket.io').listen(SERVER.listen(port));
io.on('connection', (socket) => {
  socket.on('connected', (data) => {
    console.log(data.message);
  })
})

console.log('[BACKEND] -- Listening from PORT : %d', port);
