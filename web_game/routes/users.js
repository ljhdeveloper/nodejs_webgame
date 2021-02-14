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
  }); 
});
module.exports = router;
