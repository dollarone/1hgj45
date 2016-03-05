var PlatformerGame = PlatformerGame || {};

//loading the game assets
PlatformerGame.Preload = function(){};

PlatformerGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.game.load.spritesheet('logo-tiles', 'assets/images/logo-tiles.png', 17, 16);
    this.game.load.spritesheet('cake', 'assets/images/cake.png', 141, 66);
    this.game.load.image('sky', 'assets/images/sky_new.png');
    this.game.load.image('cakeman', 'assets/images/cakeman.png');
    this.game.load.image('bananaface', 'assets/images/bananaface.png');
    this.game.load.spritesheet('cakebits', 'assets/images/cakebits.png', 6, 13);

    this.game.load.audio('music', 'assets/audio/music.ogg');

  },
  create: function() {
    this.state.start('Logo');
  }
};
