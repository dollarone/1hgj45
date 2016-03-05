var PlatfomerGame = PlatformerGame || {};

//title screen
PlatformerGame.Game = function(){};

PlatformerGame.Game.prototype = {
    create: function() {

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');

        this.players = this.game.add.group();
        
        this.leftdude = this.game.add.sprite(100, 300, 'cakeman');
        this.rightdude = this.game.add.sprite(600, 300, 'bananaface');
        this.leftdude.number = 1;
        this.rightdude.number = 2;

        this.players.add(this.leftdude);
        this.players.add(this.rightdude);
        this.game.physics.arcade.enable(this.leftdude);
        this.game.physics.arcade.enable(this.rightdude);

        this.leftdude.body.setSize(30, 30, 60, 47);
        this.rightdude.body.setSize(30, 30, 40, 37);
        this.player = this.game.add.sprite(120, 150, 'cake');
        this.player.frame = 0; 
        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5);
        this.player.body.setSize(40, 40, 13, 17);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
        this.player.anchor.setTo(0.5);
        this.player.body.collideWorldBounds = false;


        //  Our two animations, walking left and right.
        this.player.animations.add('crush', [0, 1, 2], 40, false);

        this.music = this.game.add.audio('music');
        this.music.loop = true;
//        this.music.play();

        this.instruction = 'Cakeslap!\nHold mouse to set speed - and release button to throw the cake';
        this.scoreText = this.game.add.text(16, 16, this.instruction, { fontSize: '16px', fill: '#f88' });
        this.score1 = 0;
        this.score2 = 0;
            this.scores = "Player 1 has been hit with " + this.score1 + " cakes\n" +
                "Player 2 has been caked " + this.score2 + " times.";
        this.scoreText2 = this.game.add.text(116, 516, this.scores, { fontSize: '16px', fill: '#f88' });

        this.currentPlayer = 1;
        this.timer = 0;
        this.state = true;
        this.showDebug = false; 
        this.thrown = false;
        this.resetCounter = 0;
    },

    update: function() {
        this.timer++;

        if (this.resetCounter == 1) {
                        this.player.body.gravity.y = 0;
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
            this.player.angle = 0;
            this.thrown = false;
            if (this.currentPlayer == 2) {
                this.currentPlayer = 1;
                this.player.x = 40 + this.game.rnd.integerInRange(0, 160);
                this.player.y = 100 + this.game.rnd.integerInRange(0, 100);

            }
            else {
                this.currentPlayer = 2;
                this.player.x = 500 + this.game.rnd.integerInRange(0, 160);
                this.player.y = 100 + this.game.rnd.integerInRange(0, 100);
            }

        }
        if (this.resetCounter > 0) {
            this.resetCounter--;
        }
        else {
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(this.player, this.players, this.win, null, this);

        this.speedX = this.game.input.x - 400;

        this.speedY = this.game.input.y - 300;
        this.speedY ++;
        this.scoreText.text = this.instruction
        + "\n" + "                                     Horizontal speed: " + this.speedX
        + "\n" + "                                     Vertical speed: " + this.speedY; 

        if (this.game.input.mousePointer.isDown && !this.thrown) {
            
            this.player.body.velocity.x = this.speedX;
            this.player.body.velocity.y = this.speedY;
            this.player.body.gravity.y = 400;
            
            this.player.frame = 0;


            if (this.currentPlayer == 1) {
                this.player.angle = 30;
            }
            else {
                 this.player.angle = -30;   
            }
            this.thrown = true;
            
        }

        if (this.thrown) {
            if (this.currentPlayer == 1) {
               this.player.angle += 1;
            }
            else {
                this.player.angle -= 1;
            }
        }

        if (this.player.y > 600) {
            this.player.body.gravity.y = 0;
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
            this.player.angle = 0;
            this.thrown = false;
            if (this.currentPlayer == 2) {
                this.currentPlayer = 1;
                this.player.x = 120;
                this.player.y = 150;

            }
            else {
                this.currentPlayer = 2;
                this.player.x = 580;
                this.player.y = 150;
            }

}
        }
        // if cake out of screen, reset
    },

    win: function(cake, player) {
        if (this.thrown) {   
            cake.body.gravity.y = 0;
            cake.body.velocity.y = 0;
            cake.body.velocity.x = 0;
            this.thrown = false;

            cake.animations.play("crush", false);

            this.resetCounter = 100;
            console.log(player.number);
            if (player == this.leftdude) {
                this.score1 += 1;
            }
            else {
                this.score2 += 1;
            }
            this.scores = "Player 1 has been hit with " + this.score1 + " cakes\n" +
                "Player 2 has been caked " + this.score2 + " times.";
            this.scoreText2.text = this.scores;


        }
        

    },

        render: function() {

        if (this.showDebug) {
            this.game.debug.body(this.leftdude);
            this.game.debug.body(this.rightdude);
            this.game.debug.body(this.player);
        }
    },


};