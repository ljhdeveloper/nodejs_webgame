var socket = io.connect();
$("body").ready(function(){
    socket.emit('check');
});
socket.on('set_lobby',function(data){
    console.log(data);
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
    console.log(data);
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
    console.log(data);
    if(data.bool){
    $("#user_img1").attr("src",data.data.image);
    $("#user_id1").text(data.data.game_id);
    $("#room_name").text(data.room_name+"방");
    $("#user_name1").text(data.data.nickname);
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
    socket.emit('create_room',data);
}
