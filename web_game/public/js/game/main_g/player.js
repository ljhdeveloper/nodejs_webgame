function animation_set(){
	game.anims.create({
        key: 'up',
        frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	game.anims.create({
        key: 'down',
        frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
	game.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
	game.anims.create({
        key: 'left',
        frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
	game.anims.create({
        key: 'right',
        frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}
function player_move(){
 	player.setVelocity(0);
	 if (cursors.up.isDown)
     {
         player.setVelocityY(-300);
     }
     else if (cursors.down.isDown)
     {
         player.setVelocityY(300);
     }
     if (cursors.left.isDown)
     {
         player.setVelocityX(-300);
     }
     else if (cursors.right.isDown)
     {
         player.setVelocityX(300);//160
     }
    
}
function player_ani(){
	if(cursors.left.isDown){
        player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
    {
        player.anims.play('right', true);
    }
	else if (cursors.up.isDown){
        player.anims.play('up', true);
     }
	else if (cursors.down.isDown){
        player.anims.play('down', true);
    } 
	if ((!this.cursors.down.isDown && !this.cursors.up.isDown && !this.cursors.right.isDown && !this.cursors.left.isDown))
    {
        player.anims.play('turn', true);
    }
}