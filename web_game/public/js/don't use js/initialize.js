/**
 * 
 */
 		var high=21,fonthigh=280;
        var weight=30,result=0,fontweight=525;
        var file=["파일1","파일2","파일3","파일4","파일5","파일6"];
        
        /*for(var i=0;i<10;i++)
        	$("#t_body").append('<tr class="tr_c"> <td>apple</td> <td>사과</td> <td><img id="tts" class ="tts_img" src="image/button/tts.png""/></td><td> <img id="word_delete"  class="word_delete_img" src="image/button/delete_word.png" /></td>  <td><input type="checkbox" id="favorite'+i+'" class="favorite_box"/><label for="favorite'+i+'"><span></span>즐겨찾기</label></td> <td>메모: <input type="text" value="">&nbsp&nbsp&nbsp</td> </tr>');
*/
        for(var i=0; i<6;i++){
        	result=fontweight+(i%3)*250;
        	if(i==3){
        		high=48;
        		fonthigh=490;
        	}
            $("#allfile").append('<img id="file'+i+'" class ="file_img'+i+'" src="image/folder/file.png"/>');
            $("#allfile_name").append('<span id="file_name'+i+'" class ="file_name_span'+i+'"">'+file[i]+'</span>');
            $("#file_name"+i).css({
            	position : "absolute", 
        		top:fonthigh+"px",
        		left:result+"px",/*350*/
        		display:"none",
        		fontSize : "20px"
            })
        	result=weight+(i%3)*15;
            $("#file"+i).css({
            	position : "absolute", 
            	width:"10%",
        		top:high+"%",
        		left:result+"%",/*350*/
        		display:"none"
            });
        }
               