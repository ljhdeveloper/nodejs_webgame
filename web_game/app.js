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
const { emit } = require('process');
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










function room_info (room_name,word_arr,word_name){
  this.room_name=room_name;
  this.word_arr=word_arr;
  this.word_name=word_name;
}	
function user_info(id,name,image) {
  this.game_id=id;
  this.nickname=name;
  this.image=image;
}

const io = require('socket.io')(server);
io.sockets.on('connection',function(socket){

  socket.on('get_user_data',function(data){
      socket.user_info=new user_info(data[0].id,data[0].name,data[0].image);
  });

  socket.on('create_room',function(data,cb){
    if(!check_room_num(data.room_name)){
      socket.join(data.room_name);
      socket.room_info=new room_info(data.room_name,data.game_word,data.file_name);
      lobby_info_emit(socket.room_info);
      cb(true);
    }else{
      console.log("방생성 실패");
      cb(false);
    }
  });
  socket.on('join_room',function(data,cb){
    var num=check_room_num(data);
    if(num>0 && num<4){
      socket.join(data);
      room_all_mem(data,function(data,index){
        socket.room_info=data[0].room_info;
      });
      lobby_info_emit(socket.room_info);
      cb(true);
    }else{
      console.log("방접속 실패");
      cb(false);
    }
  });
  socket.on('chatting',function(data){
    if(!socket.user_info) return;
    if(data){
      var chat_packet={
        user_id:socket.user_info.game_id,
        name:socket.user_info.nickname,
        chat:data
      }
      io.to(socket.room_info.room_name).emit('chat_show',chat_packet);
    }
  });

  socket.on('disconnect',function(){
    if(socket.room_info){
      socket.leave(socket.room_info.room_name);
      console.log(socket.room_info.room_name+"방 종료");
      lobby_info_emit(socket.room_info);
    }
  });
});


function lobby_info_emit(data,cb){
  var user=[], i=0; 
  var lobby_data = {
    user:new Array(),
    room_name:data.room_name,
    game_word:data.word_arr,
    word_name:data.word_name
  }
  room_all_mem(data.room_name,function(data,index){
    for(var i=0;i<index;i++){
      lobby_data.user[i]=data[i].user_info;
    }
  })
  io.to(data.room_name).emit('lobby_set',lobby_data);
}

function check_room_num(roomname){
  const clients = io.sockets.adapter.rooms.get(roomname);
  const room_mem_num = clients ? clients.size : 0;
  console.log(roomname+"방의 인원수: "+room_mem_num);
  if(typeof clients === 'undefined') return room_mem_num;
  else return room_mem_num;
}
function room_all_mem(roomname,cb){
  const clients = io.sockets.adapter.rooms.get(roomname);
  if(typeof clients === 'undefined')return false;
  const clientSocket =new Array;
  var i=0;
    for (const clientId of clients ) {
      clientSocket[i] = io.sockets.sockets.get(clientId);
      i++;
    }
  cb(clientSocket,i);
}
