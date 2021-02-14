function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}
var db_insert_word=function(word,file_num){
   var data = JSON.stringify(word);

    $.ajax({
        async: true,
        type : 'POST',
        data : {'word':data,'file_num':file_num,'file_name':file_name_arr[file_num]},
        url : "/users/word_insert",
        dataType : "json",
        success : function(data) {
        }
    });
}