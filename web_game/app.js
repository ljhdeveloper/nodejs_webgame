var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//flash  메시지 관련
var flash = require('connect-flash');
//passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//port setup
app.set('port',process.env.PORT||55554);

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 *60 *3 //지속시간 1000 * 60=1분
  }
}));
//passport 적용
app.use(passport.initialize());
app.use(passport.session());
//플래시 메시지 관련
app.use(flash());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;



var server = app.listen(app.get('port'), function() {

console.log('Express server listening on port ' + server.address().port);

});









function roominfo(){
	var nickname='';
	var game_id='';
	var image='';
}




const io = require('socket.io')(server);

io.sockets.on('connection',function(socket){
  var in_room;
  console.log(socket.id+"들어왔습니다");
    socket.on('get_user_data',function(data){
      socket.nickname=data.name;
      socket.image=data.f_image_path;
      socket.game_id=data.id;
    });
    socket.on('disconnect',function(){
      console.log(socket.id+"나갔습니다");
      if(typeof in_room!="undefined"){
        var room_user = new Array;
        var sc = socket_room_member_check(in_room);
        if(!sc) return ;
        socket.leave(in_room);
        console.log(socket.nickname+"가 "+in_room+"방나감");
        for(var i=0; i<sc.length; i++){
          room_user[i]=new roominfo;
          room_user[i].game_id=sc[i].game_id;
          room_user[i].nickname=sc[i].nickname;
          room_user[i].image=sc[i].image;
        }
        console.log(room_user);
         io.to(in_room).emit('set_lobby',room_user);
      }
    });
    socket.on('join_room',function(data){
      socket.join(data);
      var sc = socket_room_member_check(data);
      var room_user = new Array;
      if(sc.length>1&&sc.length<5){
      for(var i=0; i<sc.length; i++){
        room_user[i]=new roominfo;
        room_user[i].game_id=sc[i].game_id;
        room_user[i].nickname=sc[i].nickname;
        room_user[i].image=sc[i].image;
      }
      socket.emit('lobby_enter', {"bool":true,"room_name":data});
      io.to(data).emit('set_lobby',room_user);
      in_room=data;
      }
      else{
       socket.emit('lobby_enter', {"bool":false});
        socket.leave(data);
      //io.sockets.sockets[socket.id].emit('lobby_enter',false);
      }
    })
    socket.on('create_room',function(data){
      socket.join(data);
      var sc = socket_room_member_check(data);
      if(sc.length>1){
         socket.emit('create_lobby_enter', {"bool":false});
        socket.leave(data);
      }
      else{
        in_room=data;
        var data1 =new roominfo;
        data1.game_id = socket.game_id;
        data1.image = socket.image;
        data1.nickname = socket.nickname;
         socket.emit('create_lobby_enter',{"bool":true,'data':data1,'room_name':data});
      
      //io.sockets.sockets[socket.id].emit('lobby_enter',false);
      }
    })
});


  var socket_room_member_check = function(roomname){
  const clients = io.sockets.adapter.rooms.get(roomname);
      if(typeof clients === 'undefined')return false;
      //to get the number of clients in this room
     console.log(clients);

      const numClients = clients ? clients.size : 0;
      //to just emit the same event to all members of a room
      //io.to(roomname).emit('new event', 'Updates');
      const clientSocket =new Array;
      var i=0;
      for (const clientId of clients ) {
          //this is the socket of each client in the room.
          clientSocket[i] = io.sockets.sockets.get(clientId);
          //you can do whatever you need with this
          //clientSocket.leave('Other Room')
          i++;
      }
      return clientSocket;
    }