var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.set('view engine', 'hbs');

app.get('/', function (request, response) {
  response.render('chat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  client.on('disconnect', function () {
    console.log('EXITED');
  });

  // client.on('incoming', function (msg){
  //   io.emit('chat-msg', msg);
  // });
  client.on('join-room', function(room){
    client.join(room, function() {
      console.log(client.rooms);
      io.to(room).emit('chat-msg', '**new user joined**');
    });
    client.on('incoming', function(msg){
      io.to(msg.room).emit('chat-msg', msg.msg);
    });
  });
});

http.listen(9000, function (){
  console.log('Listening on port 9000');
})
