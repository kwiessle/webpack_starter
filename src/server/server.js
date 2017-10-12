import http from 'http';
import path from 'path';
import express from 'express';
import mustache from 'mustache-express';
import config from '../../config.js';
import manifestJSON from '../../public/manifest.json';


const app = express();
const dev = process.env.NODE_ENV === 'development';





// ----------- [  EXPRESS  ] --------------//

app.engine('html', mustache());
app.set('views', __dirname + '/views/');
app.set('view engine', 'html');

app.use(express.static('public'));

app.get('*', (req, res) => {

res.render('index', {
    appJS: manifestJSON['main.js'],
    appCSS: manifestJSON['main.css']
})

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


// ----------- [  STATUS  ] --------------//


console.log('[BACKEND] -- Listening from PORT : %d', config.PORT);
if (dev) {
  console.log('[DEVMODE] -- NODE_ENV = true');
} else {
  console.log('[DEVMODE] -- NODE_ENV = false');
}
