const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/img', express.static('img'));

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
let heading = Math.random() * 360;
let time = new Date().getTime();
setInterval(() => io.emit('floor-type', Math.random() > 0.5 ? 'carpet' : 'tile'), 10000);

setInterval(() => {
  heading++;
  if (heading > 360) heading = 0;
  io.emit('heading', heading);
}, 1000);

setInterval(() => {
  let timeRunning = new Date().getTime() - time;
  io.emit('time-running', timeRunning);
}, 1000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
