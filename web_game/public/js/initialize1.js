	var high=21,fonthigh=280;
    var weight=30,result=0,fontweight=525;
    
	for(var i=0;i<3;i++){
		$("#menu").append('<img id="menu'+i+'" class ="menu'+i+'_img_c" src="image/button/menu'+(i+1)+'.png" onmouseover="this.src=\'image/button/menu'+(i+1)+'_hover.png\'" onmouseout="this.src=\'image/button/menu'+(i+1)+'.png\'"/>');
		$(".menu"+i+"_img_c").css({
		left:"26%",
		top:3+i*15+"em",
		position : "absolute", 
	});
	}
	