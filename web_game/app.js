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
    maxAge: 1000 * 60 * 30 //지속시간 1분
  }
}));
//passport 적용
app.use(passport.initialize());
app.use(passport.session());
//플래시 메시지 관련
app.use(flash());

app.use(logger('dev'));
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

const io = require('socket.io')(server);

io.sockets.on('connection',function(socket){
  console.log(socket.id+"들어왔습니다");
  socket.emit('receive_user_data',function(data){
    socket.on('get_user_data',function(data){

    });
  })
})
io.sockets.on('disconnect',function(socket){
  console.log(socket.id+"나갔습니다");
})
