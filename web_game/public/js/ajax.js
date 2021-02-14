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
        dataType : "json"
    });
}
var db_delete_word=function(word,file_num){
     $.ajax({
         async: true,
         type : 'POST',
         data : {'word':word,'file_num':file_num},
         url : "/users/word_delete",
         dataType : "json",
         success: function(data){
             if(data.cnt){
                db_file_index_set();
             }
         }
     });
 }
 var db_file_index_set=function(){
    $.ajax({
        async: true,
        type : 'POST',
        url : "/users/give_file_index",
        success : function(data) {
            var check=[false,false,false,false,false,false];
            var back=[],front=[],back_index=0,front_index=0;
            data.forEach(function(item){
            check[item.file_index]=true;
            });
            for(var i=0;i<6;i++){
                if(check[i]==false){
                    front[front_index++]=i;
                }
                if(check[i]==true){
                    back[back_index++]=i;
                }
            }
            back_index--;
            for(var i=0;i<back_index;i++){
                if(back[back_index-i]>front[i]){
                    swap_db_file_index(front[i],back[back_index-i]);
                }
                 else break;
             }

        }
    });
}
function swap_db_file_index(index1,index2){
    $.ajax({
        async: true,
        type : 'POST',
        data : {'index1':index1,'index2':index2},
        url : "/users/receive_file_index",
        dataType : "json"
    });
}
 