function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}
var db_insert_word=function(word,file_num){
   var data = JSON.stringify(word);
   $("#word_input_button").off('click');
    $.ajax({
        async: true,
        type : 'POST',
        data : {'word':data,'file_num':file_num,'file_name':file_name_arr[file_num]},
        url : "/users/word_insert",
        dataType : "json",
        success:function(data){
            if(data.cnt){
                $("#word_input_button").on('click');
            }
        }
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
                db_file_index_set(undefined);
             }
         }
     });
 }
 function db_delete_file(index){
    var data = JSON.stringify(index);
    $.ajax({
        async: true,
        type : 'POST',
        data : {'file_index':data},
        url : "/users/file_delete",
        dataType : "json"
    });
 }
 function db_file_name_modify(file_name,file_index){
    $.ajax({
        async: true,
        type : 'POST',
        data : {'file_name':file_name,'file_index':file_index},
        url : "/users/file_name_modify",
        dataType : "json"
    });
 }
 var db_file_index_set=function(){
    $.ajax({
        async: true,
        type : 'POST',
        url : "/users/give_file_index",
        success : function(data) {
            var check=[false,false,false,false,false,false];
            var delete_file_index=[7,7,7,7,7,7];
            var back=[],front=[],back_index=0,front_index=0;
            data.forEach(function(item){
            check[item.file_index]=true;
            });
            for(var i=0;i<6;i++){
                if(file_delete_arr[i]==true){
                delete_file_index[i]=i;
                check[i]=false;
                }
            }
            db_delete_file(delete_file_index);
            console.log(file_delete_arr,check);
            file_delete_arr=[false,false,false,false,false,false];
            
            for(var i=0;i<6;i++){
                if(check[i]==false){
                    front[front_index++]=i;
                }
                if(check[i]==true){
                    back[back_index++]=i;
                }
            }
            back_index--;
            for(var i=0;i<=back_index;i++){
                if(back[back_index-i]>front[i]){
                    swap_db_file_index(front[i],back[back_index-i]);
                }
                 else break;
             }
            file_name_arr=["file 0","file 1","file 2","file 3","file 4","file 5"];
             $("#all_file").empty();
             $("#all_file_name").empty();
             word_index=[0,0,0,0,0,0];
             file_count_global=0;
             word_arr=[[],[],[],[],[],[]];
             dtn_set();
             
            if(!check_delete_arr){
			$("#menu1-1").toggle();
	    	$("#menu1-2").toggle();
	    	back_flag -=1;
            }
            check_delete_arr=false;
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
function db_memo_modify(file_index,memo,word){
    $("#menu_icon").off('click');
    $.ajax({
        async: true,
        type : 'POST',
        data : {'file_index':file_index,'memo':memo,'word':word},
        url : "/users/modify_memo",
        dataType : "json",
        success:function(data){
            if(data.cnt){
                $("#menu_icon").on('click');
            }
        }
    });
}
function db_favorite_modify(file_index,favorite,word,add_this){
    $(add_this).attr("disabled", true);
    $.ajax({
        async: true,
        type : 'POST',
        data : {'file_index':file_index,'favorite':favorite,'word':word},
        url : "/users/modify_favorite",
        dataType : "json",
        success:function(data){
            if(data.cnt){
                $(add_this).attr("disabled", false);
            }
        }
    });
}
 