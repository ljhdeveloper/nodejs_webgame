var file_name_arr=["file 0","file 1","file 2","file 3","file 4","file 5"];
var file_delete_arr=[false,false,false,false,false,false];

var file_add = function(file_count){
	if(file_count<6){
		var top=8 ,font_top=13;
		var left=9 ,font_left=8;
		var left_index=file_count;
		if(file_count>2){
			left_index -= 3;
			font_top=23.5;
			top=21;
		}
		$("#all_file").append('<img id="file'+file_count+'" class ="file'+file_count+'_c" src="image/folder/file.png" onmouseover="this.src=\'image/folder/file_hover.png\'" onmouseout="this.src=\'image/folder/file.png\'"/>');
		$("#all_file_name").append('<span id="file_name'+file_count+'" class="file_name'+file_count+'_c">'+file_name_arr[file_count]+'</span>');
		$(".file"+file_count+"_c").css({
				position:"absolute",
				top:top+"em",
				left:left+14*left_index+"em"
		});
		$(".file_name"+file_count+"_c").css({
			position:"absolute",
			top:font_top+"em",
			left:font_left+11.3*left_index+"em",
			fontSize : "20px",
			width:"6em",
			textAlign:"center",
		});
	}
}
$("#file_name_input").click(function(e){
	e.stopPropagation();
})
$("#file_name_input").keypress(function(){
	if(event.keyCode==13){
		var name=$("#file_name_input").val();
		if(!name){
		$("#file_name_input").css("display","none");
    	$("#file_name"+file_name_select).css("display","block");
		}
		else{
		file_name_arr[file_name_select]=name;
		$("#file_name"+file_name_select).text(name);
		$("#file_name_input").css("display","none");
    	$("#file_name"+file_name_select).css("display","block");
    	file_name_select=7;
    	$("#file_name_input").val('');
		}
	}
});
var swap_file=function(index1,index2){
	file_name_arr[index1]=file_name_arr[index2];
	file_name_arr[index2]="file";
}
var word_arr_swap=function(use,trash){
	word_index[use]=0;
	for(var i=0;i<word_index[trash];i++){
		word_arr[use][i]=new word;
		word_arr[use][i].word=word_arr[trash][i].word;
		word_arr[use][i].mean=word_arr[trash][i].mean;
		word_arr[use][i].favorite=word_arr[trash][i].favorite;
		word_arr[use][i].memo=word_arr[trash][i].memo;
		word_index[use]++;
	}
	word_index[trash]=0;
}
var delete_f=function(){
	var file_delete_index=0;
	$("#all_file img").detach();
	$("#all_file_name span").detach();
	for(var i=0;i<file_count_global;i++){
		if(!file_delete_arr[i]){
			file_delete_index++;
		}
		else{
			word_index[i]=0;
			file_name_arr[i]="file";
		}
	}
	if(file_delete_index===0){
		for(var i=0;i<6;i++){
			word_index[i]=0;
		}
	}
	
	for(var i=0;i<file_count_global;i++){
		if(file_delete_arr[i]){
			for(var j=file_count_global-1;j>i;j--){
				if(!file_delete_arr[j]){
					word_arr_swap(i,j);
					swap_file(i,j);
					file_delete_arr[i]=false;
					file_delete_arr[j]=true;
					break;
				}
			}
		}
	}
	for(var i=0;i<6;i++){
		file_delete_arr[i]=false;
	}
	for(var i=0;i<file_delete_index;i++){
		file_add(i);
	}
	file_count_global=file_delete_index;
}
var file_enter=function(){
	back_flag +=1;
	$("#table_name").text("< "+file_name_arr[file_num]+" >");
	$("#menu1-1").toggle();
	$("#menu1-2").toggle();
	console.log(file_num);
	display(word_arr[file_num],word_index[file_num]);
}
var file_select=function(){
	var children = document.getElementById('all_file').childNodes;
	for(var i=0; i<children.length; i++){
		children[i].onmouseout = 'null';
		children[i].onmouseover = 'null';
		$(children[i]).attr('src','image/folder/file_checkbox.png');
	}
	$("body").undelegate("#file_add","click");
	$("body").undelegate("#all_file img","click");
	$(document.body).delegate("#all_file img","click",function(e){
		var src=($(this).attr('src')==='image/folder/file_checkbox.png')
		?'image/folder/file_checked.png'
		:'image/folder/file_checkbox.png';
		$(this).attr('src',src);
		var bool =(file_delete_arr[$(this).index()])
		?false:true;
		file_delete_arr[$(this).index()]=bool;
	});
}
var file_delete=function(){
	for(var i=0; i<file_count_global; i++){
		$("file"+i).attr('src','image/folder/file.png');
	}
	delete_f();
	$("body").undelegate("#all_file img","click");
	$(document.body).delegate("#file_add","click",function(){
		if(file_count_global<6){
		file_add(file_count_global);
		file_count_global++;
		}
	});
	$(document.body).delegate("#all_file img","click",function(){
		file_num=$(this).index();
		file_enter();
	});
}

var ex_word_file_add=function(){
	file_add(file_count_global);
	file_count_global++;
	file_name_arr[0]="예제 영어";
	$("#file_name0").text("예제 영어");
	insert_word("apple","사과");
	insert_word("redue","감소하다");
	insert_word("league","리그");
	insert_word("banana","바나나");
	insert_word("year","년");
	insert_word("control","제어하다");
	insert_word("umbrella","우산");
}
var set_user_dtn=function(data){
	data.forEach(function(item){
		var file_index=item.file_index;
		if(word_index[file_index]==0){
			file_add(file_index);
			file_name_arr[file_index]=item.file_name;
			$("#file_name"+file_index).text(item.file_name);
			file_count_global++;
		}
		insert_word(item.word,item.mean,item.favorite,item.memo,file_index);
	console.log(word_arr);
	});
}