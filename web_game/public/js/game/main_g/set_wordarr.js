function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}

var three_wd_arr =new Array();
var ex_wd_arr =new Array();
var game_wd_arr =new Array();
var game_wd_index,ex_wd_arr,real_answer;
var q_wd =new word();
var collision = new Array();
function copy_word(word1,word2){
	word1.word=word2.word;
	word1.mean=word2.mean;
	word1.favorite=word2.favorite;
	word1.memo=word2.memo;
}
function swap(word1, word2){
	var temp=new word;
	copy_word(temp,word1);
	copy_word(word1,word2);
	copy_word(word2,temp);
}
var random_num=function(min,max){
	return Math.floor(Math.random() * (max+1-min) +min);
}
function shuffle_arr(arr,index){
	for(var i=0;i<index;i++){
		swap(arr[i],arr[random_num(0,index-1)]);
	}
}
function select_wd(main_wd,arr,index){
	var x=0;
	while(x<2){
		var randomn=random_num(0,index-1);
		if(main_wd.word!=arr[randomn].word && x==0){
			three_wd_arr[x]=new word;
			copy_word(three_wd_arr[x],arr[randomn]);
			x++;
		}
		if(main_wd.word!=arr[randomn].word &&
				three_wd_arr[0].word!=arr[randomn].word && x==1){
			three_wd_arr[x]=new word;
			copy_word(three_wd_arr[x],arr[randomn]);
			x++;
		}
	}
}
function enter_wd(){
	var randomn=random_num(1,3);
	switch (randomn){
	case 1:
		word[0].setText(q_wd.word);
		word[1].setText(three_wd_arr[0].word);
		word[2].setText(three_wd_arr[1].word);
		question.setText(q_wd.mean);
		break;
	case 2:
		word[1].setText(q_wd.word);
		word[0].setText(three_wd_arr[0].word);
		word[2].setText(three_wd_arr[1].word);
		question.setText(q_wd.mean);
		break;
	case 3:
		word[2].setText(q_wd.word);
		word[0].setText(three_wd_arr[0].word);
		word[1].setText(three_wd_arr[1].word);
		question.setText(q_wd.mean);
		break;
	}
	real_answer=randomn;
}
var game_proc = function(arr,index){
	shuffle_arr(arr,index)
    copy_word(q_wd,arr[--index]);
	console.log(q_wd.word);
	select_wd(q_wd,ex_wd_arr,ex_wd_index);
	enter_wd();
	return index;

}
var door_set =function(){
	switch (real_answer){
	case 1:
		collision[0]=this_temp.physics.add.overlap(player, door[0], q_answer);
		collision[1]=this_temp.physics.add.overlap(player, door[1], gameOver);
		collision[2]=this_temp.physics.add.overlap(player, door[2], gameOver);
		break;

	case 2:
		collision[0]=this_temp.physics.add.overlap(player, door[0], gameOver);
		collision[1]=this_temp.physics.add.overlap(player, door[1], q_answer);
		collision[2]=this_temp.physics.add.overlap(player, door[2], gameOver);
		break;
	case 3:
		collision[0]=this_temp.physics.add.overlap(player, door[0], gameOver);
		collision[1]=this_temp.physics.add.overlap(player, door[1], gameOver);
		collision[2]=this_temp.physics.add.overlap(player, door[2], q_answer);
		break;
	}
}
function distroy_co(){
	this_temp.physics.world.removeCollider (collision[0]);
	this_temp.physics.world.removeCollider (collision[1]);
	this_temp.physics.world.removeCollider (collision[2]);
}
function q_answer(player){

	console.log(game_wd_index);
	if(game_wd_index==0){
		this_temp.scene.start('end');
     }
	else{
	player.x=477.3;//x = 477.3 y=905.3
	player.y=905.3;
	game_wd_index=game_proc(game_wd_arr,game_wd_index);
	distroy_co();
	door_set();
	}
}
var set_arr =function(index,index2,arr){
	for(var i=0;i<index2;i++){
		arr[i]=new word;
		copy_word(arr[i],word_arr[index][i]);
	}
	return index2;
}
	