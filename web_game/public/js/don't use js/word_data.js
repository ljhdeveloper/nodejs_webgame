function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}
/*var word_arr = new Array();
var word_index = [0,0,0,0,0,0];
for(var i=0;i<6;i++){
	word_arr[i]=new Array();
}*/
var word_arr =new Array();
var word_index=0;
var search_arr =new Array();
var search_index=0;
var display=function(arr,index){
	var favorite_index=0;
	var table=$("#t_body tr");
	table.detach();
	if(index===0){
		$("#empty_table").css("display","block");
		return;
	}
	else{
		$("#empty_table").css("display","none");
	}
	for(var i=0;i<index;i++){
		$("#t_body").append('<tr class="tr_c"> <td></td> <td></td> <td><img id="tts" class ="tts_img" src="image/button/tts.png""/></td><td> <img id="word_delete"  class="word_delete_img" src="image/button/delete_word.png" /></td>  <td><input type="checkbox" id="favorite'+favorite_index+'" class="favorite_box"/><label for="favorite'+favorite_index+'"><span></span>즐겨찾기</label></td> <td>메모: <input type="text" value="">&nbsp&nbsp&nbsp</td> </tr>');
		favorite_index++;
	}
	
	table=$("#t_body td");
	for(var i=0;i<index;i++){
    table.eq(i*6).text(arr[i].word);
    table.eq(i*6+1).text(arr[i].mean);
    if(arr[i].favorite){
    	table.eq(i*6+4).children('input').prop("checked",true);
    }
    table.eq(i*6+5).children('input').val(arr[i].memo);
    }
}
var insert_word=function(nword,nmean){ 
	for(var i=0;i<word_index;i++){
		if(word_arr[i].word===nword){
			return;
		}
	}
	word_arr[word_index]=new word;
	word_arr[word_index].word=nword;
	word_arr[word_index].mean=nmean;
	word_arr[word_index].favorite=false;
	word_arr[word_index].memo='';
	word_index++;
	display(word_arr,word_index);
}
var delete_word =function(dword){
	var i;
	if(dword==undefined){
		return;
	}
	for(i=0;i<word_index;i++){
		if(word_arr[i].word==dword){
			break;
		}
	}
	if(i<word_index-1){
	word_arr[i].word=word_arr[word_index-1].word;
	word_arr[i].mean=word_arr[word_index-1].mean;
	word_arr[i].favorite=word_arr[word_index-1].favorite;
	word_arr[i].memo=word_arr[word_index-1].memo;
	}
	word_index--;
	display(word_arr,word_index);
}
var search_word = function(dword){
	search_index=0;
	for(var i=0;i<word_index;i++){
		if(word_arr[i].word.includes(dword)||word_arr[i].mean.includes(dword)){
			search_arr[search_index]=new word;
			search_arr[search_index].word=word_arr[i].word;
			search_arr[search_index].mean=word_arr[i].mean;
			search_arr[search_index].favorite=word_arr[i].favorite;
			search_arr[search_index].memo=word_arr[i].memo;
			search_index++;
		}
	}
	display(search_arr,search_index);
}