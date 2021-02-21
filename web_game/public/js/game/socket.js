function user_struct(id,name,image){
	this.name=name;
	this.id=id;
	this.f_image_path=image;
}
function game_data_struct(game_name,game_word,num){
	this.game_name=game_name;
	this.game_word=game_word;
	this.my_player_num=num;
}
var socket = io.connect();
var game_data=null;
var user_data=null;
$("body").ready(function(){
	user_info_set();
	file_name_arr_set();
});
function file_name_arr_set(){
	$.ajax({
		async: true,
		type : 'POST',
		url : "/users/file_name_get",
		dataType : "json",
		success : function(data) {
			game_select_box(data);
		}
	});
}
function user_info_set(){
	$.ajax({
		async: true,
		type : 'POST',
		url : "/users/user_info_down",
		dataType : "json",
		success : function(data) {
			user_data = new user_struct(data[0].id,data[0].name,data[0].image);
			socket.emit('get_user_data',data);
		}
	});
}
var game_word_get= function(file_index,cb){
	$.ajax({
		async: true,
		type : 'POST',
		url : "/users/word_arr_get",
		data :{'file_index':file_index},
		dataType : "json",
		success : function(data) {
			cb(data);
		}
	});
}
function create_room(){
	var room_name= prompt("생성할 방이름을 입력하세요: ");
	if(room_name){
		file_index=$('#select_word_dtn option:selected').val();
		file_name=$('#select_word_dtn option:selected').text();
		game_word_get(file_index,function(data){
			console.log(data.length,file_index);
			if(data.length>2 && file_index!="NULL"){
			socket.emit('create_room',{'game_word':data,'file_name':file_name,'room_name':room_name},function(data){
				if(data){
					$("#join_start").toggle();
					$("#lobby").toggle();
					$("#chatting").toggle();
				}
				else{
					alert("이미 존재하는 방입니다.");
				}
			});
			}else{
				alert("단어 개수가 2개 이하입니다.(3개부터가능)");
			}
		});	
	}
	else alert("방이름을 입력해주세요");
}
function join_room(){
	var room_name= prompt("접속할 방이름을 입력하세요: ");
	if(room_name){
	socket.emit('join_room',room_name,function(data){
			if(data){
				$("#join_start").toggle();
				$("#lobby").toggle();
				$("#chatting").toggle();
			}
			else{
				alert("접속할 방이 없습니다.");
			}
		});
	}
	else alert("방이름을 입력해주세요");
}
function chat_submit(){
	var chat = $("#chat_input").val();
	console.log(chat);
	socket.emit('chatting',chat);
}
var game_select_box = function(data){
	var file_index_arr=[false,false,false,false,false,false];
	//$("#select_word_dtn option").detach();
	$("#select_word_dtn").append('<option value="NULL" selected="selected">---단어장 선택---</option>');
	data.forEach(function(data){
		if(!file_index_arr[data.file_index])
		$("#select_word_dtn").append('<option value="'+data.file_index+'">'+data.file_name+'</option>');
		file_index_arr[data.file_index]=true;
	});
}


socket.on('lobby_set',function(data){
	console.log(data);
    $("#room_name").text(data.room_name+"방");
    $("#game_word_name").text("단어장: "+data.word_name);
    for(var i=0;i<data.user.length;i++){
    $("#user_img"+(i+1)).attr("src",data.user[i].image);
    $("#user_id"+(i+1)).text(data.user[i].game_id);
    $("#user_name"+(i+1)).text(data.user[i].nickname);
    }
    for(var i=data.user.length;i<4;i++){
    $("#user_img"+(i+1)).attr("src","image/bg/empty_file.png");
    $("#user_id"+(i+1)).text("대기중1");
    $("#user_name"+(i+1)).text("대기중1");
    }
	if(!game_data){
	console.log(data);
	game_data=new game_data_struct(data.word_name,data.game_word,data.my_num);
	console.log(game_data);
	}
});
socket.on('chat_show',function(data){
	$("#chat_box").append(data.name+"("+data.user_id+") : "+ data.chat+"<br />");
	$("#chat_box").scrollTop(5000);
});

