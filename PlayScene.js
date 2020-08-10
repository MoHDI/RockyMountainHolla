class PlayScene extends Phaser.Scene {


  preload(){
    this.titleScreen;
    this.init = false;
    this.doggame = this;
    //820 is a good size
    this.levelSize =820;
    this.dognews;
    this.debugGame = true;
    this.worldSpeed = this.levelSize*.000003;
    this.load.image("ui_level_bg", "images/ui/level_bg2.png");
    this.load.image("ui_arrow_down", "images/ui/down_arrow.png");
    this.load.image("ui_arrow_up", "images/ui/up_arrow.png");
    this.load.spritesheet("ui_level_number", 'images/ui/level_numbers.png', { frameWidth: 37, frameHeight: 48});
    this.load.spritesheet("smells", 'images/sprites/smells.png', { frameWidth: 16, frameHeight: 16});
    this.load.spritesheet("street", 'images/sprites/street_items2.png', { frameWidth: 272, frameHeight: 315});
    this.load.spritesheet("streetforground", 'images/sprites/foreground_asets.png', { frameWidth: 29, frameHeight: 31});
    this.load.spritesheet("streetflat", 'images/sprites/flat_items.png', { frameWidth: 24, frameHeight: 55});
    this.load.spritesheet("grounds", 'images/sprites/grounds.png', { frameWidth: 103, frameHeight: 7});
    this.load.spritesheet("grounds2", 'images/sprites/ground2.png', { frameWidth: 104, frameHeight: 44});
    this.load.spritesheet("water", 'images/sprites/water.png', { frameWidth: 105, frameHeight: 114});

        this.load.spritesheet("duckbod", 'images/characters/duck/duck_bod_legs_clean.png', { frameWidth: 46, frameHeight: 46});

        this.load.spritesheet("duckmouth", 'images/characters/duck/duck_mouth_clean.png', { frameWidth: 46, frameHeight: 46});
        this.load.spritesheet("duckeyes", 'images/characters/duck/duck_eyes_clean.png', { frameWidth: 46, frameHeight: 46});
        this.load.spritesheet("ducksit", 'images/characters/duck/ducksitter.png', { frameWidth: 46, frameHeight: 46});
        this.load.spritesheet("duckexplode", 'images/characters/duck/explode2.png', { frameWidth: 46, frameHeight: 46});

        this.load.spritesheet("big_duck", 'images/characters/duck/big_duck.png', { frameWidth: 169, frameHeight: 175});


    this.load.image("dog_title", "images/screens/dog_txt2.png");
    this.load.image("bark_title", "images/screens/bark_txt2.png");
    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

      this.line = new Phaser.Geom.Line(200, 300, 600, 300);

      this.text = this.add.text(100, 50, '');
      this.levelmenu =new LevelMenu(this,12,800);
      // this.levelmenu.x = 100;
      // this.Levelmenu.setPos(0,0);
      this.emitter= EventDispatcher.getInstance();
      // this.emitter.emit("MY_EVENT","String_Data")
      // this.emitter.emit("ATTACK",{weapon:'sword',strength:5,monster:'dragon'})
      this.emitter.on('MENUCLICKED',this.goLevel.bind(this));
        this.emitter.on('ATTACK',this.doAttack.bind(this));
        this.dogWorld;
  }

create(){
    this.cursorKeys = this.input.keyboard.createCursorKeys();
this.makeTitleScreen(this);
this.curLevel;
this.levelmenu.create();
// .on('levelSel', func, this);
var emitter = new Phaser.Events.EventEmitter();
// this.levelmenu.events.on('levelSelect',this.goLevel,this);
this.startNext();
}
doAttack(parameter)
{
  console.log('you attacked the '+parameter.monster+' with a '+parameter.weapon + ' strength of '+ parameter.strength);
}
goLevel(parameters)
    {
      var worldsize = 820;
      console.log(parameters);
    // this.dogWorld = new DogWorld(this,worldsize,"active");
    //   this.dogWorld.setPos(400,405+worldsize);
    this.curLevel = new Level000(this);
      console.log("GO LEVEL AWESOME !!!!!! " + parameters );
this.init = true;
    }
startGame(){


}
buildLevelMenu(){


}
makeTitleScreen(gam){
  console.log("title");

    gam.titleScreen = gam.add.container(0,0);
    var dogt = gam.add.image(400,1000,"dog_title");
    var barkt = gam.add.image(400,1000,"bark_title");
    gam.titleScreen.add(dogt);
    gam.titleScreen.add(barkt);

  gsap.to([dogt,barkt], {y:300, duration:2,ease: "bounce",onComplete:gam.startGame,onCompleteParams:[gam],stagger: {
    from: "front",
  amount:.5
    }});
    gsap.delayedCall(4,this.fadeTitle,[this]);
}

fadeTitle(gam){
// console.log(this.parent)
  gsap.to(gam.titleScreen, {y:-600, duration:4});
}



  listener(){
    // this.scene.start("BuildScene");
  }
  startNext(){






  }

  adjustStreetY(){


  }
  dogControls(){
    if(!this.init){

      return;
    }

        //SPACE
        if(this.cursorKeys.space.isDown){
          console.log(" SPACE "+ this.curLevel);
          if(this.curLevel){
            this.curLevel.destroyAll();
          }
        }
        if(this.cursorKeys.space.isUp){

        }
        //UP
        if(this.cursorKeys.up.isDown){

        }

        if(this.cursorKeys.down.isDown){

        }
        if(this.cursorKeys.down.isUp){

      }

      if(this.cursorKeys.left.isDown){

      }
      if(this.cursorKeys.right.isDown){

        }

  }
  drawLine(){
    Phaser.Geom.Line.Rotate(  this.line, 0.02);

    this.graphics.clear();

            this.graphics.strokeLineShape(  this.line);

    var angle = Phaser.Geom.Line.Angle(  this.line);

      this.text.setText('Line Angle: ' + Phaser.Math.RadToDeg(angle));
  }
  spinWorlds(sp){

  }
    update() {
      if(this.curLevel)this.curLevel.update();

      if(this.dogWorld){
      this.dogWorld.update();
        this.dogWorld.spinWorld(-.0003);
      }
      this.dogControls();
  }
}
