function word(){
	var word='';
	var mean='';
	var favorite=false;
	var memo='';
}
var timer;
var time=30;
var door=new Array();
var word=new Array();
var main = new Phaser.Class({

	    Extends: Phaser.Scene,

	    initialize:

	    function main ()
	    {
	        Phaser.Scene.call(this, { key: 'main' });
	    },
	    preload: function ()
	    {
	    	this_temp=this;
	    	this.load.image("tiles", "image/game/main/map/map_tile.png");
	    	this.load.image("tiles2", "image/game/main/map/Castle2.png");
	    	this.load.tilemapTiledJSON("map", "image/game/main/map/json/map2.json");
	    	this.load.image("enter_image", "image/game/main/enter.png");
	        this.load.spritesheet('dude', 
	                'image/game/main/dude.png',
	                { frameWidth: 32, frameHeight: 48 });
	        this.load.audio('start1','sound/bgm/a.mp3');

	    },

	    create: function ()
	    {
	    	animation_set();
	    	var enter=new Array();
	    	var wordPoint=new Array();
	    	
	    	game_wd_index=set_arr(select_word_dtn_num,word_index[select_word_dtn_num],game_wd_arr);
	    	ex_wd_index=set_arr(select_word_dtn_num,word_index[select_word_dtn_num],ex_wd_arr);

	    	
	    	
	    	map = this.make.tilemap({ key: "map" });
		    tileset = map.addTilesetImage("colony", "tiles");
		    tileset2 = map.addTilesetImage("door", "tiles2");
		    belowLayer = map.createStaticLayer("road", tileset, 0, 0);
		    doorLayer = map.createStaticLayer("door", tileset2, 0, 0);
		    worldLayer = map.createStaticLayer("obstac", tileset, 0, 0);
		    wordedgeLayer = map.createStaticLayer("word_edge", tileset, 0, 0);
	        
	        spawnPoint = map.findObject("Object Layer 4", obj => obj.name === "spawn_player");
	        for(var i=0;i<3;i++){
	        wordPoint[i] = map.findObject("Object Layer 4", obj => obj.name === "choice_word"+(i+1));
	        }
	        questionp = map.findObject("Object Layer 4", obj => obj.name === "question");
			for(var i=0;i<3;i++){
		    enter[i] = map.findObject("enter", obj => obj.name === "enter"+(i+1));
			}
		    for(var i=0;i<3;i++){
		    door[i] = this.physics.add.staticGroup().create(enter[i].x, enter[i].y, 'enter_image'); 
		    }
	        player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y,'dude');
		    
		    worldLayer.setCollisionByProperty({ collision: true });
	        doorLayer.setCollisionByProperty({ collision: true });

		    

	        this.physics.world.setBounds(0, 0, 960, 960);
	        this.cameras.main.setBounds(0, 0, 960, 960);
		    this.cameras.main.startFollow(player, true, 1, 1);
		    player.setCollideWorldBounds(true);
		    this.physics.add.collider(player, worldLayer);
		    this.physics.add.collider(player, doorLayer);

	    	cursors = this.input.keyboard.createCursorKeys();
	    	
	    	for(var i=0;i<3;i++){
	    	word[i] = this.add.text(wordPoint[i].x,wordPoint[i].y).setFontSize(20).setColor('#000000');
	    	}
	        question = this.add.text(questionp.x,questionp.y).setFontSize(20).setColor('#000000');
	        info = this.add.text(320, 10).setScrollFactor(0).setFontSize(32).setColor('#000000');
	        timer = this.time.addEvent({ delay: 30000, callback: gameOver, callbackScope: this ,repeat:10000});
 

	    	game_wd_index=game_proc(game_wd_arr,game_wd_index);
	    	door_set();
	    	//start_bgm1 = this.sound.add('start1');
        	//start_bgm1.play({loop:true});
	    },
	    update: function ()
	    {
	    	info.setText('Time: ' + Math.floor(time - timer.getElapsed()/1000));
        
	        player_move();
	        player_ani();
	       
	    }
});
function gameOver ()
{
}