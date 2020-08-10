window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    // mode: Phaser.Scale.RESIZE,

    // width: '100%',
    // height: '100%',
    backgroundColor: 0xFFFFFF,
    scene: [TitleScene,HollaGame],
    autoCenter: Phaser.Scale,

    physics: {

        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
  }

  var game = new Phaser.Game(config);
//   this.game.scale.pageAlignHorizontally = true;
// this.game.scale.pageAlignVertically = true;
// this.game.scale.refresh();



}
