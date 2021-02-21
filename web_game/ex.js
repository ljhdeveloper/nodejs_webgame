//app.js
io.sockets.on('connection',function(socket){
    var in_room;
    var room_master_id;
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
        console.log(data);
        socket.join(data.room_name);
        socket.word_arr=data.word_arr;
        socket.word_file_name=data.file_name;
        console.log(socket.word_arr,socket.word_file_name);
        var sc = socket_room_member_check(data.room_name);
        if(sc.length>1){
           socket.emit('create_lobby_enter', {"bool":false});
          socket.leave(data.room_name);
        }
        else{
          in_room=data.room_name;
          var data1 =new roominfo;
          data1.game_id = socket.game_id;
          data1.image = socket.image;
          data1.nickname = socket.nickname;
           socket.emit('create_lobby_enter',{"bool":true,'data':data1,'room_name':data.room_name});
        
        //io.sockets.sockets[socket.id].emit('lobby_enter',false);
        }
      })
  });
  function room_master_id(roomname){
  
  }
  
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
//socket.js
var file_name_arr=["file 0","file 1","file 2","file 3","file 4","file 5"];
var word_index=[0,0,0,0,0,0];
var word_arr =new Array();
var user_info= new user_struct;
for(var i=0;i<6;i++){
	word_arr[i] =new Array();
}
var new_arr=new Array();

var file_count=0;
var select_word_dtn_num="NULL";
$(document).ready(function(){
    word_arr_set();
    user_info_set();
    game_select_box(file_count,file_name_arr);
});

socket.on('set_lobby',function(data){
    for(var i=0;i<data.length;i++){
    $("#user_img"+(i+1)).attr("src",data[i].image);
    $("#user_id"+(i+1)).text(data[i].game_id);
    $("#user_name"+(i+1)).text(data[i].nickname);
    }
    for(var i=data.length;i<4;i++){
    $("#user_img"+(i+1)).attr("src","image/bg/empty_file.png");
    $("#user_id"+(i+1)).text("대기중");
    $("#user_name"+(i+1)).text("대기중");
    }
})
socket.on('lobby_enter',function(data){
    if(data.bool){
        $("#join_start").toggle();
        $("#lobby").toggle();
        $("#room_name").text(data.room_name+"방");
    }
    else{
        alert("방 접속 실패");
    }
})
socket.on('create_lobby_enter',function(data){
    if(data.bool){
    $("#user_img1").attr("src",data.data.image);
    $("#user_id1").text(data.data.game_id);
    $("#user_name1").text(data.data.nickname);
    $("#room_name").text(data.room_name+"방");
    $("#game_word_name").text("단어장: "+file_name_arr[select_word_dtn_num]);
    $("#join_start").toggle();
    $("#lobby").toggle();
    }
    else{
        alert("방 생성 실패");
    }
})
function join_room(){
    var data = prompt("접속할 방이름을 입력해주세요: ");
    socket.emit('join_room',data);
}
function create_room(){
	var data = prompt("생성할 방이름을 입력해주세요: ");
    socket.emit('create_room',{"room_name":data,"word_arr":word_arr[select_word_dtn_num],"file_name":file_name_arr[select_word_dtn_num]});
}

$('#select_word_dtn').change(function() {
	select_word_dtn_num = $(this).val();
});
var game_select_box = function(index,name){
	$("#select_word_dtn option").detach();
	$("#select_word_dtn").append('<option value="NULL" selected="selected">---단어장 선택---</option>');
	for(var i=0;i<index;i++){
	$("#select_word_dtn").append('<option value="'+i+'">---'+name[i]+'---</option>');
	}
}
function word_arr_set(){
	$.ajax({
		async: true,
		type : 'POST',
		url : "/users/dtn_down",
		dataType : "json",
		success : function(data) {
			set_user_dtn(data);
			game_select_box(file_count,file_name_arr);
			console.log(file_count,file_name_arr);
		},
		error : function(error){
			alert("error: "+error);
		}
	});

}
var set_user_dtn=function(data){
	data.forEach(function(item){
	var file_index=item.file_index;
	
	if(word_index[file_index]==0){
		file_name_arr[file_index]=item.file_name;
		file_count++;
	}
	insert_word(item.word,item.mean,item.favorite,item.memo,file_index);

	});
}


var insert_word=function(nword,nmean,nfavorite,nmemo,nfile_num){
	word_arr[nfile_num][word_index[nfile_num]]=new word_struct;
	word_arr[nfile_num][word_index[nfile_num]].word=nword;
	word_arr[nfile_num][word_index[nfile_num]].mean=nmean;
	word_arr[nfile_num][word_index[nfile_num]].favorite=nfavorite;
	word_arr[nfile_num][word_index[nfile_num]].memo=nmemo;
	word_index[nfile_num]++;
}
function user_info_set(){
	$.ajax({
		async: true,
		type : 'POST',
		url : "/users/user_info_down",
		dataType : "json",
		success : function(data) {
			set_user_info(data);
		},
		error : function(error){
			alert("error: "+error);
		}
	});
}
function set_user_info(data){
    var user_info= new user_struct;
	user_info.id=data[0].id;
	user_info.name=data[0].name;
	user_info.f_image_path=data[0].image;
	socket.emit('get_user_data',user_info);
	//$("#main_bg").css('background-image',"url(.."+user_info.f_image_path+")");
}
