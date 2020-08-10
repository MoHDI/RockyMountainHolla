class LevelsFull{
  constructor(scene){
    this.scene = scene;
  this.create();
    }

  create(){

    var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
     this.graphics.fillRectShape(rect);



     this.barkCount =0;
    this.levelID  = 0;
    // this.goals = [
      //   ["Flower Power",false],
    //   ["Howl at the Moon!",false],
    //   ["Sing a Song: Bark 25 times! ",false],
    //   ["Dance with a duck!",false]
    // ];
    this.goals = [["Flower Power",false],
    ];
    // this.worldSpeed = .0003;
    // this.worldSize =300;
    var worldsize = 300;
    this.emitter= EventDispatcher.getInstance();
    this.worldSpeed = worldsize*.000008;
    this.frontWorlds =[];
    this.frontWorldCount = 2;
    this.backWorlds =[];
    this.backWorldCount = 1;
    this.init = true;
    this.levelname = "Hello World";

this.makeBackWorlds(worldsize);

    this.dogWorld = new DogWorld(this.scene,worldsize,this.worldSpeed,"active",1,10,3,15,true);
    this.dogWorld.setPos(400,405+worldsize);
    // this.dogWorld.addSingleItem(this.makeSingleItem("moon",0,worldsize+90),"moon",true);
    this.makeMiddleWorlds(worldsize);

    this.dog = new HeroDog(this.scene);
    this.dog.setPos(385,410);
    // this.allLevelObjects.push(this.dogWorld);

    this.makeFrontWorlds(worldsize);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // var combo = this.input.keyboard.createCombo('LEFT');
    this.gameHud = new GameHUD(this.scene, "Level 000", this.goals.length);
    this.allLevelObjects =[this.dogWorld,this.dog,this.gameHud];
    this.destroyed =false;
    this.emitter.on('SHOWGOALTEXT',this.updateGoalText.bind(this));
    this.emitter.on('HIDEGOALTEXT',this.updateGoalText.bind(this));
    this.emitter.on('BARKHIT',this.barkHit.bind(this));
    this.emitter.on('DUCK',this.duckHit.bind(this));
    this.gameHud.showGoalIntro(this.goals,400,310);


    // this.emitter.on('HOMECLICKED',this.clickedHome.bind(this));
  }
  makeFrontWorlds(worldsize){

    var dwf1 = new DogWorld(this.scene,worldsize*.9,this.worldSpeed*1.3,"front",1,1,1,1,true);
    var dwf2 = new DogWorld(this.scene,worldsize*.85,this.worldSpeed*1.35,"front",1,1,1,1,true);
     dwf1.setPos(400,405+worldsize);
    dwf2.setPos(400,405+worldsize);
    this.frontWorlds.push(dwf1);
    this.frontWorlds.push(dwf2);

  }
  makeMiddleWorlds(worldsize){
      this.dogWorld.addSingleItem(this.dogWorld.makeDuck(worldsize,0),"duck",true);
      this.dogWorld.addSingleItem(this.makeSingleItem("flower",0,worldsize-30),"flower",true);

  }

  makeBackWorlds(worldsize){

    var dw = new DogWorld(this.scene,worldsize,this.worldSpeed*.09,"back",1,1,false);
      dw.setPos(400,405+worldsize);
      var dw2 = new DogWorld(this.scene,worldsize,this.worldSpeed*.04,"blank",-10,10,false);
        dw2.setPos(400,405+worldsize);
        dw2.addSingleItem(this.makeSingleItem("moon",.35,worldsize+90),"moon",true);

    this.backWorlds.push(dw);
    this.backWorlds.push(dw2);
  }
  duckHit(){
  this.goalHit(3);
  }
  barkHit(params){
    if(this.destroyed){
      return;
    }
    console.log("BARK HIT LEVEL0000000 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> "+ params.type);

    if(params.type == "flower"){

          console.log(" FLOWER FRAME HIT:"+params.hitcount);
          if(params.hitcount>=2){
            params.item.visible = false;
          }else{
          params.item.anims.play("flowers");
          console.log(params.item.anims.currentFrame);
          this.goalHit(0);
          }

    }
    if(params.type == "moon"){
    if(this.dog.isSitting()){
    //    this.dog.howl(true);
        console.log(" YOU ARE SITTING AND HOWLED AT THE MOON : "+ this.dog.totalBarks );
        this.goalHit(1);
      }
    }

  }
  goalHit(id){
    this.goals[id][1] = true;
    this.gameHud.showGoal(  this.goals[id][0], 400,310);
    this.gameHud.updateGoalSatus(id);
    this.checkGoals();
  }
  checkGoals(){

    var wincount = 0;
    for(var i=0;i<this.goals.length;i++){
      if(this.goals[i][1]){
        wincount++;
      }else{
        return;
      }
    }
    if(wincount==this.goals.length ){
      var id=this.levelID;
      console.log(" WINNER WINNER "+ id);
      this.scene.emitter.emit("LEVELWIN",{id:id});
    }
  }
  updateGoalText(params){
    console.log(" GOAL TEXT IS "+ params.item);
    var info = "";
    if(params.item ==-1){
      info = " ";
    }else{
      info = this.goals[params.item][0];
    }
      this.gameHud.showGoalInfo(info);
  }

  makeSingleItem(item,rot,distancefromcenter,itemframe){
    console.log("make single item");
    var item = this.scene.add.sprite(0,0,item,itemframe);

    item.setDisplayOrigin((item.width/2),item.height+(distancefromcenter));
    item.rotation =rot;
    return item;
  }

  setPos(x,y){

  }

///##### DOG CONTROLS
dogControls(){
  if(!this.init || this.destroyed){

    return;
  }

    if(this.dogWorld.checkWin() && this.gameActive){

    }else if(this.gameActive){
      this.dogWorld.update();
    }
      //SPACE
    if(  Phaser.Input.Keyboard.JustDown(this.spacebar)){

      this.dog.bark(true);
      if(this.dog.totalBarks >=25 && this.dog.totalBarks<27){
      this.goalHit(1);
      }
        // this.dog.goLong(true);
      // this.dogWorld.checkAction(this.dog.isFlipped());
      this.checkAllActiveItems();
      // this.dogWorld.checkActiveItems(this.dog);
    }
      if(this.cursorKeys.space.isDown){
    //  console.log("SPACE KEY")

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
        this.spinWorlds(1.5);
      }else{    this.spinWorlds(1);}
      }
      }else if(this.cursorKeys.left.isUp && !this.cursorKeys.right.isDown){
      this.dog.walk("null");
    }
    if(this.cursorKeys.right.isDown){
        this.dog.walk("right");
        if(this.dog.iswalking){
          if(this.cursorKeys.up.isDown){

          this.spinWorlds(-1.5);
        }else{    this.spinWorlds(-1);}
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

destroyAll(){
// this.scene.input.keyboard.enabled = false;
this.graphics.destroy();
  this.scene.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
this.destroyed = true;
if(this.dogWorld){
  this.dogWorld.destroyWorld();
}
for(var i=0;i<this.frontWorlds.length;i++){
if(this.frontWorlds[i]){
  this.frontWorlds[i].destroyWorld();
}

}
for(var j=0;j<this.backWorlds.length;j++){
  if(this.backWorlds[j]){
    this.backWorlds[j].destroyWorld();
  }
}

  // this.dogWorld.destroy();

  this.dog.destroy();

  this.gameHud.destroy();
  //this.destroy();
this.destroyed = true;
// for(var i=0;i<this.allLevelObjects.length;i++){
// this.allLevelObjects[i].destroy();
// console.log(this.allLevelObjects[i])
// Phaser.Utils.Array.Remove(this.allLevelObjects, this.allLevelObjects[i]);
// }
 }
  walk(){
  }
  checkAllActiveItems(){

    this.dogWorld.checkActiveItems(this.dog);
    this.dogWorld.checkAction(this.dog.isFlipped());
    for(var i=0;i<this.frontWorlds.length;i++){
      this.frontWorlds[i].checkActiveItems(this.dog);
    }
    for(var j=0;j<this.backWorlds.length;j++){
      this.backWorlds[j].checkActiveItems(this.dog);
    }
  }
  spinWorlds(sp){
    // this.dogWorldBG.spinWorld(sp*.8);
    this.dogWorld.spinWorld(sp);
    for(var i=0;i<this.frontWorlds.length;i++){
      var siz = sp*((i+1.1)/1);
      this.frontWorlds[i].spinWorld(siz);
    }
    for(var j=0;j<this.backWorlds.length;j++){
      var siz = sp;
      this.backWorlds[j].spinWorld(siz);
    }

  }
  update() {
    if(this.dogWorld && !this.destroyed){
      this.dogControls();
    this.dogWorld.update();
      // this.dogWorld.spinWorld(-.0003);
    }



  }
}
