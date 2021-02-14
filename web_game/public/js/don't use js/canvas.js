var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');
var lastUpdateTime = 0;
var acDelta = 0;
var msPerFrame = 15;
var isGameOver=false;
var raf=null;
var bool_start_game=false;
var bool_main=true;
var keysDown = {}
var standard_time=0;

this.bgimage_tree =new Image();
this.bgimage_tree.src="image/canvas/bg/canvas_tree.png";
this.bgimage_main =new Image();
this.bgimage_main.src="image/canvas/bg/canvas_main.png";


var gamestart = new Audio("sound/bgm/main_bgm.mp3");

function main_bgm_control(flag){
	if(flag){
	gamestart.volume = 0.5;
	gamestart.load();
	gamestart.play();
	gamestart.loop=true;
	}
	else{
	gamestart.pause();
	gamestart.currentTime=0;
	}
}
class background{
	constructor(){
	/*this.bgimage_map =new Image();
	this.bgimage_map.src="image/canvas/bg/canvas_map.png";
	this.map_bd_width=this.bgimage_map.width-canvas.width;
	this.map_bd_height=this.bgimage_map.height-canvas.height;
	this.m_x=this.map_bd_width/2-480,this.m_y=this.map_bd_height-577;*/
	this.map_top =new Image();
	this.map_top.src="image/canvas/bg/map_top.png";
	this.map_mid =new Image();
	this.map_mid.src="image/canvas/bg/map_mid.png";
	this.map_bottom =new Image();
	this.map_bottom.src="image/canvas/bg/map_bottom.png";
	this.m_x=0,this.m_y=0;
	}
    render() {
        //ctx.drawImage(this.bgimage_map, -this.m_x, -this.m_y);
    	for(var i=0;i<3;i++){
    	ctx.drawImage(this.map_top, -this.m_x+300*i, -this.m_y);
    	}
    	ctx.drawImage(this.map_mid, -this.m_x, -this.m_y+1000);
    	ctx.drawImage(this.map_bottom, -this.m_x, -this.m_y+1250);
    }
	timer(){
    	var timer=(Date.now()-standard_time)/1000;
    	timer=timer.toFixed();
    	var timer_hour=Math.floor(timer/3600);
    	var timer_min=Math.floor(timer%3600/60);
    	var timer_sec=Math.floor(timer%60);
    	if(timer>=3600) {
    		$("#timer").text(timer_hour+" 시"+timer_min+" 분"+timer_sec+" 초");
    	}
    	else if(timer>=60){
        	$("#timer").text(timer_min+" 분"+timer_sec+" 초");
    	}
    	else{
        	$("#timer").text(timer_sec+" 초");
    	}
	}
	/*update(unit) {
	    var canvas_ct_y=canvas.height/2-unit.un.height;
	    var canvas_ct_x=canvas.width/2-unit.un.width;
	    //console.log(this.m_x+this.x,this.m_y+this.y);
	    // up w
	    if (87 in keysDown) {
	    	unit.sprite_select=1;
	    	if(unit.y > canvas_ct_y)unit.y -= unit.speed;
	    	else{
		    	if(this.m_y <= 0 && unit.y >=0){
		    		unit.y -= unit.speed;
		    	}
		    	else this.m_y -= unit.speed;
	    	}
	    }
	    
	    // down s
	    if (83 in keysDown) {
	    	unit.sprite_select=2;
	    	if(unit.y < canvas_ct_y)unit.y += unit.speed;
	    	else{
		    	if(this.m_y >= this.map_bd_height && unit.y <=canvas.height-unit.un.height){
		    		unit.y += unit.speed;
		    	}
		    	else this.m_y += unit.speed;
	    	}
	    }
	    //left a
	    if (65 in keysDown) {
	    	unit.sprite_select=3;
	    	if(unit.x > canvas_ct_x)unit.x -= unit.speed;
	    	else{
		    	if(this.m_x <= 0 && unit.x >=0){
		    		unit.x -= unit.speed;
		    	}
		    	else this.m_x -= unit.speed;
	    	}
	    }
	    // right d
	    if (68 in keysDown) {
	    	unit.sprite_select=4;
	    	if(unit.x < canvas_ct_x)unit.x += unit.speed;
	    	else{
		    	if(this.m_x >= this.map_bd_width && unit.x <=canvas.width-unit.un.width){
		    		unit.x += unit.speed;
		    	}
		    	else{
		    	this.m_x += unit.speed;
		    	}
	    	}
	    }
	    
	    // boundery limit
	    if (this.m_x <= 0) {
	    	this.m_x=0;
	    }
	    if (this.m_x >= this.map_bd_width) {
	    	this.m_x= this.map_bd_width;
	    }
	    if (this.m_y <= 0) {
	    	this.m_y=0;
	    }
	    if (this.m_y >= this.map_bd_height) {
	    	this.m_y = this.map_bd_height;
	    }    
	}*/
}
class unit{
	constructor(){
	this.un =new Image();
	this.un.src="image/canvas/game/unit/unit1.png";
	this.ex =new Image();
	this.ex.src="image/canvas/game/unit/ex.png";
    this.x = canvas.width/2-this.un.width , this.y = canvas.height/2-this.un.height , this.speed=2;
    this.spriteCount=0,this.frame=0;
    this.sprite_select=0;
	}
    render(){
    	if(this.sprite_select!=4){
            ctx.drawImage(this.un, this.x,this.y);
    	}
    	else{
	    	ctx.drawImage(this.ex,this.spriteCount*32,120,32,50,this.x,this.y,32,50);
	    	if(this.frame===5){
	    		this.spriteCount++;
	    		this.frame=0;
	    	}
	    	this.frame++;
			if(this.spriteCount > 9){
				this.spriteCount=0;
			}
    	}
	}
    sprite_set(keyCode){
		this.sprite_select=0;
    	// up w
    	if (87 == keyCode) {
		this.sprite_select=1;
	    }
	    // down s
	    if (83 == keyCode) {
		this.sprite_select=2;
	    }
	    //left a
	    if (65 == keyCode) {
		this.sprite_select=3;
	    }
	    // right d
	    if (68 == keyCode) {
		this.sprite_select=4;
	    }
    }
    sprite_delete(){
        if (87 in keysDown) {
	    	return;
        }
	    // down s
	    if (83 in keysDown) {
	    	return;
	    }
	    //left a
	    if (65 in keysDown) {
	    	return;
	    }
	    // right d
	    if (68 in keysDown) {
	    	return;
	    }
		this.sprite_select=0;
	    
    }
}
var main_display=function(){
	this.x = 0, this.y = 0;
	this.render=function(){  
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.drawImage(bgimage_tree, this.x--, 0);
	    ctx.drawImage(bgimage_main, 0, 0);
	    if(this.x<= -1300){
	    	this.x=0;
	    }
	}
}
var update = function () {
    // up w
    if (87 in keysDown) {
    	bg.m_y -= unit13.speed;
    }
    // down s
    if (83 in keysDown) {
    	bg.m_y += unit13.speed;
    }
    //left a
    if (65 in keysDown) {
    	bg.m_x -= unit13.speed;
    }
    // right d
    if (68 in keysDown) {
    	bg.m_x += unit13.speed;
    }
    if (this.m_x <= 0) {
    	this.m_x=0;
    }
    if (this.m_x >= this.map_bd_width) {
    	this.m_x= this.map_bd_width;
    }
    if (this.m_y <= 0) {
    	this.m_y=0;
    }
    if (this.m_y >= this.map_bd_height) {
    	this.m_y = this.map_bd_height;
    }    
}
$(document.body).delegate("#canvas_start","click",function(){
	$("#timer").toggle();
	$(this).toggle();
	//main_bgm_control(false);
	standard_time=Date.now();
	bool_start_game=true;
	bool_main=false;
});
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	unit13.sprite_set(e.keyCode);
},false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	unit13.sprite_delete();
}, false);

var reset =function(){
};
var render = function () {
    var delta = Date.now() - lastUpdateTime;
    if (acDelta > msPerFrame) {
        acDelta = 0;
        if(bool_main){
        	md.render();
        }
        if(bool_start_game){
        	bg.render();
        	bg.timer();
        	unit13.render();
        }
    } else {
        acDelta += delta;
    }
    lastUpdateTime=Date.now();
};
var main = function () {
	update();
	//bg.update(unit13);
    if (!isGameOver) {
        render();
    }
    raf=requestAnimationFrame(main);
};
let md=new main_display();
let unit13=new unit();
var bg=new background();