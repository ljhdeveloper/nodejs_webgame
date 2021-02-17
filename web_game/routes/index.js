var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var multer =require('multer');
var fs =require('fs');

  
var mysql = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'12341234',
  port:3306,
  database:'web_game'
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
  },
  //파일이름 설정
  filename: function (req, file, cb) {
  cb(null, Date.now() + "-" + file.originalname)
  }
});
  //파일 업로드 모듈
var uploader =multer({storage: storage, limits:{fileSize:1024 * 1024* 7}});

passport.serializeUser(function (user, done) {//처음 로그인때 session에 생성되는 id
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {//로그인 후 재입장시 아이디확인
  var sql = 'SELECT * FROM user WHERE id=?';
  mysql.query(sql , [id], function (err, result) {
    if(err) console.log('mysql 에러');
    var json = JSON.stringify(result[0]);
    var userinfo = JSON.parse(json);
    done(null, userinfo);
  });    
});
passport.use(new LocalStrategy({
      usernameField: 'input_id',
      passwordField : 'input_pw',
      passReqToCallback : true,
      session:true
  },
  function (req, username, password, done) {
      var sql = 'SELECT * FROM user WHERE id=? AND PWD=?';
      mysql.query(sql , [username, password], function (err,result) {
          if(err) console.log('mysql 에러');  

          // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
          if(result.length === 0){
            return done(null, false, { message: '비밀번호가 틀렸습니다.' });
          }else{
            var json = JSON.stringify(result[0]);
            var userinfo = JSON.parse(json);
            return done(null, userinfo);  // result값으로 받아진 회원정보를 return해줌
          }
      });
  }
));
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // 현재 session이 유효한 세션인가?
      return next();
  }
  // 유효하지 않은 경우
  res.redirect('/login');
}
function disableAuthenticated(req, res, next){
  if (!req.isAuthenticated()) { // 현재 session이 유효한 세션인가?
    return next();
  }
  res.redirect('/');
}
router.get('/', ensureAuthenticated,function(req, res, next) {
  res.render('main',{name: req.user.name});
});
router.get('/login',disableAuthenticated,  function(req, res, next) {
   res.render('index');
});
router.get('/register', disableAuthenticated, function(req, res, next) {
  res.render('register');
});
router.get('/register_ok', disableAuthenticated, function(req, res, next) {
  res.render('register_ok');
});
router.get('/logout', function(req,res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});
router.get('/server_over', function(req,res){
  var sql = "select for from user";
  var id="hihi";
  
  mysql.query(sql , [id], function (err, result) {
    iff(err)
  });
});
router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login'
}));
router.post('/register',uploader.single('file'),(req,res,next)=>{

  var id=req.param("reg_id");
  var pw=req.param("reg_pw");
  var name=req.param("reg_name");
  var image_path = "NULL";
  if(req.file){
    image_path=req.file.path;
  }
  var sql = 'INSERT INTO user(id,PWD,name,image) value (?,?,?,?)';
	mysql.query(sql , [id,pw,name,image_path]);
  console.log(id,pw,name,image_path);
  res.redirect('/register_ok');
});
router.post('/idck',function(req,res,next){
	var id= req.body.id;
  var sql = 'SELECT * FROM user WHERE id=?';
	mysql.query(sql , [id], function (err,result) {
    if(err) console.log('mysql 에러');    
      if(result.length === 0){
        res.send({cnt:0});
      }
      else{
      res.send({cnt:1});
      }
  });
});

module.exports = router;
