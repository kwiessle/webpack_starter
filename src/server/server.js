import http from 'http';
import path from 'path';
import express from 'express';
const app = express();
import config from '../../config.js';



// ----------- [  EXPRESS  ] --------------//

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public') + '/index.html');
});




// ----------- [  SERVER  ] --------------//

var SERVER = http.createServer(app, (req, res) => {
  res.writeHead(200);
}).listen(config.PORT);





// ----------- [  SOCKETS  ] --------------//

const io = require('socket.io').listen(SERVER.listen(config.PORT));
io.on('connection', (socket) => {
  socket.on('connected', (data) => {
    console.log(data.status);
  })
});



console.log('[BACKEND] -- Listening from PORT : %d', config.PORT);
