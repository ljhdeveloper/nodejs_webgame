var file_name_arr=["file 0","file 1","file 2","file 3","file 4","file 5"];
var file_delete_arr=[false,false,false,false,false,false];
var check_delete_arr=false;
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
		db_file_name_modify(name,file_name_select)
		$("#file_name_input").css("display","none");
    	$("#file_name"+file_name_select).css("display","block");
    	file_name_select=7;
    	$("#file_name_input").val('');
		}
	}
});
var file_enter=function(){
	back_flag +=1;
	$("#table_name").text("< "+file_name_arr[file_num]+" >");
	$("#menu1-1").toggle();
	$("#menu1-2").toggle();
	display(word_arr[file_num],word_index[file_num]);
}
var file_delete=function(){
	check_delete_arr=true;
	db_file_index_set();
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
var file_select=function(){
	file_delete_arr=[false,false,false,false,false,false];
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
		console.log(file_delete_arr);
	});
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
	});
}