var socket = io.connect();
$("body").ready(function(){
    
});
socket.on('receive_user_data',function(data){

});

socket.emit('receive_user_data',{});