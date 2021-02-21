var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysql = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'12341234',
  port:3306,
  database:'web_game'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/file_name_get',function(req,res,next){
  var user_num=req.user.num;
  var sql = 'SELECT file_index,file_name FROM word_tb WHERE user_num=? ORDER BY file_index ASC';
  mysql.query(sql , [user_num], function (err, result) {
    res.send(result);
  }); 
});
router.post('/word_arr_get',function(req,res,next){
  var user_num=req.user.num;
  var file_index=req.body.file_index;
  var sql = 'SELECT word,mean,favorite,wrong FROM word_tb WHERE user_num=? AND file_index=?';
  mysql.query(sql , [user_num,file_index], function (err, result) {
    res.send(result);
  }); 
});
router.post('/dtn_down',function(req,res,next){
  var sql = 'SELECT * FROM word_tb WHERE user_num=? ORDER BY file_index ASC';
  var user_num=req.user.num;
  mysql.query(sql , [user_num], function (err, result) {
    if(err) console.log('mysql 에러');
    var json = JSON.stringify(result);
    var word_dtn = JSON.parse(json);
    res.send(word_dtn);
  }); 
});
router.post('/user_info_down',function(req,res,next){
  var sql = 'SELECT id,name,image FROM user WHERE num=?';
  var user_num=req.user.num;
  mysql.query(sql , [user_num], function (err, result) {
    if(err) console.log('mysql 에러');
    var json = JSON.stringify(result);
    var user_info = JSON.parse(json);
    res.send(user_info);
  }); 
});
router.post('/word_insert',function(req,res,next){
  var sql = 'insert into word_tb values(?,?,?,?,?,?,?,?)';
  
  var word= JSON.parse(req.body.word);
  var user_num=req.user.num;
  var file_index=req.body.file_num;
  var word_spalling=word.word;
  var mean=word.mean;
  var favorite=word.favorite;
  var wrong=false;
  var memo=word.memo;
  var file_name=req.body.file_name;
  mysql.query(sql , [user_num,file_index,word_spalling,mean,favorite,wrong,memo,file_name], function (err, result) {
    if(err) console.log('mysql 에러');
    res.send({cnt:true});
  }); 
});
router.post('/word_delete',function(req,res,next){
  var user_num=req.user.num;
  var word = req.body.word;
  var sql = 'DELETE FROM word_tb WHERE word=? AND user_num=?  AND file_index=?';
  mysql.query(sql ,[word,user_num,req.body.file_num]); 
  var sql = 'SELECT * FROM word_tb WHERE file_index=? AND user_num=?';
  mysql.query(sql ,[req.body.file_num,user_num],function(err, result){
    if(result.length===0){
      res.send({cnt:true});
    }
    else{
      res.send({cnt:false});
    }
  }); 
});
router.post('/give_file_index',function(req,res,next){ 
  var sql = 'SELECT file_index FROM word_tb WHERE user_num=? ORDER BY file_index ASC';
  var user_num=req.user.num;
  mysql.query(sql , [user_num], function (err, result) {
    if(err) console.log('mysql 에러');
    var json = JSON.stringify(result);
    var word_dtn = JSON.parse(json);
    res.send(word_dtn);
  }); 
});
router.post('/file_delete',function(req,res,next){ 
  var sql = 'DELETE FROM word_tb WHERE user_num=? AND file_index IN (?,?,?,?,?,?) ';
  var user_num=req.user.num;
  console.log(req.body);
  var x= JSON.parse(req.body.file_index);
  console.log(req.body.file_index,x);
  mysql.query(sql , [user_num,x[0],x[1],x[2],x[3],x[4],x[5]], function (err, result) {
    if(err) console.log('mysql 에러');
    res.send({cnt:true});
  }); 
});
router.post('/receive_file_index',function(req,res,next){
  var user_num=req.user.num;
  var index1=req.body.index1;
  var index2 =req.body.index2;
  var sql = 'UPDATE word_tb set file_index=? where user_num=? AND file_index=? ';
  mysql.query(sql , [index1,user_num,index2]); 
});
router.post('/file_name_modify',function(req,res,next){
  var user_num=req.user.num;
  var name=req.body.file_name;
  var file_index =req.body.file_index;
  var sql = 'UPDATE word_tb set file_name=? where user_num=? AND file_index=? ';
  mysql.query(sql , [name,user_num,file_index]); 
});
router.post('/modify_memo',function(req,res,next){ 
  var sql = 'UPDATE word_tb set memo=? where user_num=? AND file_index=? AND word=?';
  var user_num=req.user.num;
  var file_index=req.body.file_index;
  var memo=req.body.memo;
  var word=req.body.word;
  mysql.query(sql , [memo,user_num,file_index,word], function (err, result) {
    if(err) console.log('mysql 에러');
    res.send({cnt:true});
  }); 
 
});
router.post('/modify_favorite',function(req,res,next){ 
  var sql = 'UPDATE word_tb set favorite=? where user_num=? AND file_index=? AND word=?';
  var user_num=req.user.num;
  var file_index=req.body.file_index;
  var favorite=req.body.favorite;
  var word=req.body.word;
  mysql.query(sql , [favorite,user_num,file_index,word], function (err, result) {
    if(err) console.log('mysql 에러');
    res.send({cnt:true});
  }); 
 
});
module.exports = router;
