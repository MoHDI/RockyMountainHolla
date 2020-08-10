class Level{
  constructor(scene){
    this.scene = scene;
  
  this.create();
    }

  create(){

    var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    var graphics = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
     graphics.fillRectShape(rect);
    var labelStyle = { font: "16px courier", fill: "#000000", align: "center" };
    var info = "LEVEL 000"
    var label = this.scene.add.text(100, 30, info, labelStyle);
    this.level  = 0;

    var worldsize = 300;
    this.emitter= EventDispatcher.getInstance();
    this.worldSpeed = worldsize*.000003;
    this.allLevelObjects =[label];
    this.init = true;
    this.levelname = "Hello World";
    this.dogWorld = new DogWorld(this.scene,worldsize,"active");
    this.dogWorld.setPos(400,405+worldsize);
    this.dogWorld.addSingleItem(this.makeSingleItem("moon",0,worldsize+100))
    this.dog = new HeroDog(this.scene);
    this.dog.setPos(385,410);
    this.allLevelObjects.push(this.dogWorld);
    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.gameHud = new GameHUD(this.scene);
    // this.emitter.on('HOMECLICKED',this.clickedHome.bind(this));
  }
  makeSingleItem(item,rot,distancefromcenter){
    console.log("make single item");
    var item = this.scene.add.sprite(0,0,item);
    item.setDisplayOrigin((item.width/2),item.height+(distancefromcenter));

    return item;
  }
  // clickedHome(){
  //   console.log("CLICKED HOME LEVEL 0000");
  //   this.emitter.emit("HOMECLICKED");
  // }
  setPos(x,y){

  }
  /// build game interface

///##### DOG CONTROLS
dogControls(){
  if(!this.init){

    return;
  }
  // console.log(" ACTIVE: "+ this.gameActive);
    if(this.dogWorld.checkWin() && this.gameActive){
        this.bigWin();
    }else if(this.gameActive){
      this.dogWorld.update();
    }
      //SPACE
      if(this.cursorKeys.space.isDown){
        console.log("SPACE KEY")
        this.dog.bark(true);
        this.dogWorld.checkAction(this.dog.isFlipped());
      }
      if(this.cursorKeys.space.isUp){
      this.dog.bark(false);
          this.dogWorld.enableAction(true);
      }
      //UP
      if(this.cursorKeys.up.isDown){
       this.dog.dogdown(true);
      }else if(this.cursorKeys.up.isUp){
     this.dog.dogdown(false);
      }

      if(this.cursorKeys.down.isDown){
        this.dog.sit(true);
      }
      if(this.cursorKeys.down.isUp){
      this.dog.sit(false);
    }

    if(this.cursorKeys.left.isDown){
        this.dog.walk("left");
        if(this.dog.iswalking){
        // this.dogWorld.checkAction(this.dog.isFlipped());
        if(this.cursorKeys.up.isDown){
        this.spinWorlds(this.worldSpeed*1.5);
      }else{    this.spinWorlds(this.worldSpeed);}
      }
      }else if(this.cursorKeys.left.isUp && !this.cursorKeys.right.isDown){
      this.dog.walk("null");
    }
    if(this.cursorKeys.right.isDown){
        this.dog.walk("right");
        if(this.dog.iswalking){
          if(this.cursorKeys.up.isDown){

          this.spinWorlds(-this.worldSpeed*1.5);
        }else{    this.spinWorlds(-this.worldSpeed);}
      }
      }else if(this.cursorKeys.right.isUp && !this.cursorKeys.left.isDown){
      this.dog.walk("rnull");
      }
      // if(this.cursorKeys.right.isDown && this.cursorKeys.left.isDown){
      //     this.dog.goLong(true);
      //   }
        // console.log("down :" + this.cursorKeys.up.isDown + " :::: and right::"+ this.cursorKeys.right.isDown);

}
///##### DOG CONTROLS
spinWorlds(sp){
  // this.dogWorldBG.spinWorld(sp*.8);
  this.dogWorld.spinWorld(sp);
  // for(var i=0;i<this.frontWorlds.length;i++){
  //   var siz = sp*((i+1.1)/1);
  //   this.frontWorlds[i].spinWorld(siz);
  // }

}
destroyAll(){
  this.dogWorld.destroyWorld();
// for(var i=0;i<this.allLevelObjects.length;i++){
// this.allLevelObjects[i].destroy();
//
// console.log(this.allLevelObjects[i])
// Phaser.Utils.Array.Remove(this.allLevelObjects, this.allLevelObjects[i]);
// }
 }
  walk(){
  }
  update() {
    if(this.dogWorld){
      this.dogControls();
    this.dogWorld.update();
      // this.dogWorld.spinWorld(-.0003);
    }
  }
}
