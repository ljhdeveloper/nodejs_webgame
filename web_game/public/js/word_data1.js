function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}

var word_index=[0,0,0,0,0,0];
var word_arr =new Array();
var search_arr =new Array();
var search_index=0;
for(var i=0;i<6;i++){
	word_arr[i] =new Array();
}
$("#creat_word").keypress(function(){
	if(event.keyCode==13){
		insert_click();
	}
});
$("#creat_mean").keypress(function(){
	if(event.keyCode==13){
		insert_click();
	}
});
var insert_memo=function(sword,memo){
	for(i=0;i<word_index[file_num];i++){
		if(word_arr[file_num][i].word==sword){
			break;
		}
	}
	word_arr[file_num][i].memo=memo;
}
var insert_click=function(){
	var cw=$("#creat_word").val();
	var cm=$("#creat_mean").val();
	if(cw=="" || cm==""||cw==" " || cm==" "){
 		 return;
	}
	insert_word(cw,cm);
}
var favorite_set=function(sword){
	for(i=0;i<word_index[file_num];i++){
		if(word_arr[file_num][i].word==sword){
			break;
		}
	}
	if ( word_arr[file_num][i].favorite ) {
		word_arr[file_num][i].favorite=false;
	} 
	else { 
		word_arr[file_num][i].favorite=true;
	}
}
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
		$("#t_body").append('<tr class="tr_c"> <td></td> <td></td> <td><img id="tts" class ="tts_c" src="image/button/tts.png""/></td><td> <img id="word_delete"  class="word_delete_c" src="image/button/delete_word.png" /></td>  <td><input type="checkbox" id="favorite'+favorite_index+'" class="favorite_box_c"/><label for="favorite'+favorite_index+'"><span></span>즐겨찾기</label></td> <td>메모: <input type="text" name="tmemo" class="tmemo_c" value=""><img id="memo_icon" class ="memo_icon_c" src="image/button/memo_icon.png""/>&nbsp&nbsp&nbsp</td> </tr>');
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
var insert_word=function(nword,nmean,nfavorite,nmemo,nfile_num){
	var new_word=false;
	if(typeof nfavorite == "undefined" &&typeof nmemo == "undefined"
	&&typeof nfile_num=="undefined") {
		new_word=true;
		nfile_num=file_num;
		nfavorite=false;
		nmemo="";
	}

	for(var i=0;i<word_index[nfile_num];i++){
		if(word_arr[nfile_num][i].word===nword){
			return;
		}
	}
	word_arr[nfile_num][word_index[nfile_num]]=new word;
	word_arr[nfile_num][word_index[nfile_num]].word=nword;
	word_arr[nfile_num][word_index[nfile_num]].mean=nmean;
	word_arr[nfile_num][word_index[nfile_num]].favorite=nfavorite;
	word_arr[nfile_num][word_index[nfile_num]].memo=nmemo;
	word_index[nfile_num]++;
	display(word_arr[nfile_num],word_index[nfile_num]);
	if(new_word){
	db_insert_word(word_arr[nfile_num][word_index[nfile_num]-1],nfile_num);
	}
}
var delete_word =function(dword){
	var i;
	if(dword==undefined){
		return;
	}
	for(i=0;i<word_index[file_num];i++){
		if(word_arr[file_num][i].word==dword){
			break;
		}
	}
	if(i<word_index[file_num]-1){
	word_arr[file_num][i].word=word_arr[file_num][word_index[file_num]-1].word;
	word_arr[file_num][i].mean=word_arr[file_num][word_index[file_num]-1].mean;
	word_arr[file_num][i].favorite=word_arr[file_num][word_index[file_num]-1].favorite;
	word_arr[file_num][i].memo=word_arr[file_num][word_index[file_num]-1].memo;
	}
	word_index[file_num]--;
	display(word_arr[file_num],word_index[file_num]);
}
var search_word = function(dword){
	search_index=0;
	for(var i=0;i<word_index[file_num];i++){
		if(word_arr[file_num][i].word.includes(dword)||word_arr[file_num][i].mean.includes(dword)){
			search_arr[search_index]=new word;
			search_arr[search_index].word=word_arr[file_num][i].word;
			search_arr[search_index].mean=word_arr[file_num][i].mean;
			search_arr[search_index].favorite=word_arr[file_num][i].favorite;
			search_arr[search_index].memo=word_arr[file_num][i].memo;
			search_index++;
		}
	}
	display(search_arr,search_index);
}
var favorite_print= function(){
	search_index=0;
	for(var i=0;i<word_index[file_num];i++){
		if(word_arr[file_num][i].favorite){
			search_arr[search_index]=new word;
			search_arr[search_index].word=word_arr[file_num][i].word;
			search_arr[search_index].mean=word_arr[file_num][i].mean;
			search_arr[search_index].favorite=word_arr[file_num][i].favorite;
			search_arr[search_index].memo=word_arr[file_num][i].memo;
			search_index++;
		}
	}
	display(search_arr,search_index);
}
function speak(text) {
    if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
        return;
    }
    
    window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

    const speechMsg = new SpeechSynthesisUtterance()
    speechMsg.rate = 1 || 1 // 속도: 0.1 ~ 10      
    speechMsg.pitch = 1 || 1 // 음높이: 0 ~ 2
    speechMsg.lang = "en-US" || "ko-KR"
    speechMsg.text = text
    
    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    window.speechSynthesis.speak(speechMsg)
}