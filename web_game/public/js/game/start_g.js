var this_temp;
var select_word_dtn_num="NULL";

var start = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:
    function start ()
    {
        Phaser.Scene.call(this, { key: 'start' });
    },

    preload: function ()
    {

    	this_temp=this;
    	  
        this.load.spritesheet('sound_bt', 'image/game/start/sound_button.png',
                { frameWidth: 50, frameHeight: 50 });
    	this.load.audio('start_bgm','sound/bgm/start_main_bgm.mp3');

        this.load.image('layer0', 'image/game/start/bg.png');
        this.load.image('layer1', 'image/game/start/canvas_tree.png');
        this.load.image('layer2', 'image/game/start/prison.png');
        this.load.image('layer3', 'image/game/start/logo.png');
        this.load.image('start', 'image/game/start/start.png');


    	progressbar_set(this_temp);
    },

    create: function ()
    {
        start_bgm = this.sound.add('start_bgm');
    	//start_bgm.play({loop:true, mute:true});
        this.add.image(385, 285, 'layer0');
        layer1= this.add.sprite(700, 285, 'layer1');//700
        this.add.image(385, 285, 'layer2');
        this.add.image(385, 285, 'layer3');

        start=this.add.sprite(385, 500, 'start').setInteractive({useHandCursor : true});
        bgm_bt = this.add.sprite(740,540,'sound_bt',1).setInteractive({useHandCursor : true});
       bgm_bt_control(bgm_bt);
       start_bt_control(start);
      // game_select_box(file_count_global,file_name_arr);
        
    },
    update: function ()
    {
    	if(layer1.x <10)layer1.x=800;
    	layer1.x -= 0.2;

    }

});
var game_select_box = function(index,name){
	$("#select_word_dtn option").detach();
	$("#select_word_dtn").append('<option value="NULL" selected="selected">---단어장 선택---</option>');
	for(var i=0;i<index;i++){
	$("#select_word_dtn").append('<option value="'+i+'">---'+name[i]+'---</option>');
	}
}
$('#select_word_dtn').change(function() {
	select_word_dtn_num = $(this).val();
});
var bgm_bt_control= function(bgm_bt){
	bgm_bt.on('pointerdown', function (pointer) {
		if(this.frame.name==1){
	        this.setFrame(0);
	        if(start_bgm.mute==true){
	        	start_bgm.mute=false;
	        }
	        else{
		    start_bgm.play({loop:true});
	        }
		}
		else{
	        this.setFrame(1);
			start_bgm.mute=true
		}
		//bgm_bt.setTexture('key',프레임)
    });
}
var start_bt_control= function(start){
	 start.on('pointerdown', function (pointer) {
		 
		 console.log(word_index[select_word_dtn_num]);
		if(select_word_dtn_num=="NULL"){
			alert('단어장을 선택해주세요');
		}
		else if(word_index[select_word_dtn_num]<3){
			alert('단어장에 3개 단어 이상의 단어가 필요합니다');
		}
		else{
		this_temp.scene.stop('start');
		scene_allstop();
     	game.scene.start('main');
     	$("#select_word_dtn").toggle();
    	start_bgm.stop();
		}
	});
     start.on('pointerover', function (pointer) {
     	this.setTint(0xff0000);
     });
     start.on('pointerout', function (pointer) {
     	this.clearTint();
     });
}

var scene_allstop =function(){
	game.scene.stop('main');
	game.scene.stop('end');
	game.scene.stop('start');
}
function progressbar_set(this_add){
	let width = this_add.cameras.main.width;
	let height = this_add.cameras.main.height;
	let percentText = this_add.make.text({
	  x: width/2+20,
	  y: (height/2)+145,
	  text: '0%',
	  style: {
	    font: '18px monospace',
	    fill: '#ffffff'
	  }
	});

	percentText.setOrigin(0.5,  0.5);
	
	let progressBar =  this_add.add.graphics();
	let progressBox =  this_add.add.graphics();
	progressBox.fillStyle(0x222222,  0.8);
	progressBox.fillRoundedRect(240,  450,  320,  50,  5);
	this_add.load.on('progress',  function  (value)  {
		  progressBar.clear();
		  progressBar.fillStyle(0xFFFFFF, 1);
		  progressBar.fillRoundedRect(250, 460,  300*value, 30, 5);
		  percentText.setText(Math.floor(value*100) + '%');
		});
	this_add.load.on('complete',  function  ()  {
		  progressBar.destroy();
		  progressBox.destroy();
		  percentText.destroy();
		});
}
