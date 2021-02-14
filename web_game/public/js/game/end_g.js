var end = new Phaser.Class({

	    Extends: Phaser.Scene,

	    initialize:

	    function end ()
	    {
	        Phaser.Scene.call(this, { key: 'end' });
	    },
	    preload: function ()
	    {
	        this.load.image('end', 'image/game/start/bg.png');
	    },

	    create: function ()
	    {
			console.log("end 스타트3");
	        this.add.sprite(400, 340, 'end');
	    }
});

var config = {
        type: Phaser.AUTO,
        width: 767,
        height: 571,
        parent: 'game',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: [start,main,end],
        audio: {
            disableWebAudio: true
        }
    };

var game = new Phaser.Game(config);