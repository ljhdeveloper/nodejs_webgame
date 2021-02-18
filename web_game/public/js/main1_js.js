	var file_count_global=0;
	var back_flag=0;
	var file_num=0;
	var file_name_select=7;
	$(document.body).delegate("#start_button","click",function(){
    	$("#start").toggle();
    	$("#main_bg").css('background-image','url("image/bg/background2.png")');
    	$("#menu").toggle();
    })
	$("body").click(function(){
		if(file_name_select<7){
    	$("#file_name_input").css("display","none");
    	$("#file_name"+file_name_select).css("display","block");
    	file_name_select=7;
    	$("#file_name_input").val('');
		}
    });
	$("body").ready(function(){
		//ex_word_file_add();
		dtn_set();
    });
	function dtn_set(){
		$.ajax({
            async: true,
            type : 'POST',
            url : "/users/dtn_down",
            dataType : "json",
            success : function(data) {
				//var word = JSON.stringify(data[0].word);
				//console.log(data[0].word);
				//console.log(word);
				set_user_dtn(data);
			},
			error : function(error){
				alert("error: "+error);
			}
		});
	
	}
    $(document.body).delegate("#all_file_name span","click",function(e){
    	e.stopPropagation();
    	if(file_name_select<7){
        	$("#file_name"+file_name_select).css("display","block");
        	$("#file_name_input").val('');
        }
    	file_name_select=$(this).index();
    	var pos=$(this).position();
    	$("#file_name_input").css({display:"block",left:pos.left,top:pos.top});
    	$(this).css("display","none");
    });
	$(document.body).delegate("#menu img","click",function(){
		$("#menu").toggle();
		var menu_num=$(this).index();
		if(menu_num===0){
			$("#enter_menu1").toggle();
		}
		else if(menu_num===1){
			location.href='game';
		}
	});
	$(document.body).delegate("#file_add","click",function(){
		
		if(file_count_global<6){
		file_add(file_count_global);
		file_count_global++;
		}
	});
	$(document.body).delegate("#refresh","click",function(){
		display(word_arr[file_num],word_index[file_num]);
	});
	$(document.body).delegate("#memo_icon","click",function(){
		var spalling=$(this).parent().prev().prev().prev().prev().prev();
		var memo=$(this).prev();
		insert_memo(spalling.text(),memo.val());
	});
	$(document.body).delegate("#tts","click",function(){
		var spalling=$(this).parent().prev().prev();
		speak(spalling.text());
	});
	$(document.body).delegate("input:checkbox","click",function(){
		var spalling=$(this).parent().prev().prev().prev().prev();
		favorite_set(spalling.text(),this);
	});
	$(document.body).delegate("#all_file img","click",function(){
		file_num=$(this).index();
		file_enter();
	});
	$(document.body).delegate("#back","click",function(){
		if(back_flag==0){
			$("#menu").toggle();
	    	$("#enter_menu2").css("display","none");
	    	$("#enter_menu1").css("display","none");
	    	start_bgm.stop();
		}
		if(back_flag==1){
			$("#menu1-1").toggle();
	    	$("#menu1-2").toggle();
	    	back_flag -=1;
    	}
	});
	$(document.body).delegate("#word_delete","click", function(){
    	var spalling=$(this).parent().prev().prev().prev();
    	delete_word(spalling.text());
    });
	$(document.body).delegate("#search_icon","click", function(){
		search_word($("#search_wd").val());
    });
	$(document.body).delegate("#file_select","click",function(){
		$("#file_delete").toggle();
		$("#file_select").toggle();
		file_select();
	});
	$(document.body).delegate("#file_delete","click",function(){
		$("#file_delete").toggle();
		$("#file_select").toggle();
		file_delete();
	});
