class GameHUD{
  constructor(scene,levelname,goalcount){
      this.scene = scene;
      this.levelName = levelname;
      this.goalCount = goalcount;
      this.goalItems = [];
      this.create();
    }
    create(){

      // this.duck = new Duck2(this.scene,10,15);
      console.log("HUD SCREEN");
      this.hudScreen = this.scene.add.container(0,0);
      this.emitter= EventDispatcher.getInstance();
      this.healthBar = this.scene.add.image(750,20,"hearts");

      var labelStyle = { font: "16px courier", fill: "#000000", align: "left" };
      var info = this.levelName;
      this.label = this.scene.add.text(10, 10, info, labelStyle);
      this.goalText = this.scene.add.text(10, 55, " ", labelStyle);

      this.home_btn = this.scene.add.image(55,560,"home").setInteractive({ useHandCursor: true });
      this.home_btn.setScale(.75);
        this.home_btn.on('pointerover', function(){ this.setScale(.85); });
        this.home_btn.on('pointerout', function(){ this.setScale(.75);});
        this.home_btn.on('pointerdown', function (pointer) {
      this.home_btn.destroy();

      this.emitter.emit("HOMECLICKED");
        }, this);

      for(var i=0;i<this.goalCount;i++){
        console.log("GOAL COUNT "+ this.goalCount +  "  : " +i)
        var goalitem = this.makeGoalItem(i);
        this.hudScreen.add(goalitem[0]);
        this.goalItems.push(goalitem);
        console.log("GOAL ITEMS");
        // console.log(this.goalItems[0][0]);

      }
      // this.quack = new Duck2(this.scene,10,15);
      this.hudScreen.add([this.healthBar,this.home_btn,this.label, this.goalText]);

    }
    updateGoalSatus(num){


      var pawPrint =this.goalItems[num][2].setAlpha(1);
      // gsap.fromTo(label, .5,{scaleX:2,scaleY:2,delay:0,ease:Expo.easeNone});
        gsap.fromTo(pawPrint, {scaleY: 4,scaleX:4,rotation:4}, {scaleY:1,scaleX:1,alpha:1,rotation:0, duration: .25});
      // this.goalItems[0].add image()
    }
    showGoalInfo(info){
      this.goalText.setText(info);
      // quantity.setText(text);
    }
    makeGoalItemXXXX(num){
      console.log("make goal item " + num);
    var item = this.scene.add.container(0,40);

    var img = this.scene.add.image(25+(num*25),0,"goal_01").setInteractive({useHandCursor:true});
    img.on('pointerover', function(){
      this.scene.emitter.emit("SHOWGOALTEXT",{item:num});
      img.setScale(.85);
    },this);
    img.on('pointerout', function(){
      img.setScale(1);
      this.scene.emitter.emit("HIDEGOALTEXT",{item:-1});
    },this);

    var img2 = this.scene.add.image(25+(num*25),0,"goal_02").setInteractive({useHandCursor:true});
    img2.on('pointerover', function(){
      this.scene.emitter.emit("SHOWGOALTEXT",{item:num});
      img2.setScale(.85);
    },this);
    img2.on('pointerout', function(){
      img2.setScale(1);
      this.scene.emitter.emit("HIDEGOALTEXT",{item:-1});
    },this);
    item.add([img,img2]);
    img2.setAlpha(0);
    // item.add(img2);
      var goal_ar = [item,img,img2,false];

      return goal_ar;
    }
    showGoalTxt(img,num){
      console.log(img);
      console.log(num);
        this.scene.emitter.emit("SHOWGOALTEXT",{item:num});
    }
    hideGoalTxt(){
      this.goalText.setText(" ");
    }
    makeGoalItem(num){
      console.log("make goal item " + num);
    var item = this.scene.add.container(0,40);

    var img = this.scene.add.image(25+(num*25),0,"goal_01").setInteractive({useHandCursor:true});

    img.on('pointerover', () => this.showGoalTxt(img,num));

    img.on('pointerout', () => this.hideGoalTxt());

    var img2 = this.scene.add.image(25+(num*25),0,"goal_02").setInteractive({useHandCursor:true});

    item.add([img,img2]);
    img2.setAlpha(0);
    // item.add(img2);
      var goal_ar = [item,img,img2,false];


    // var labelStyle = { font: "16px courier", fill: "#000000", align: "left" };
    // var info = this.levelName;
    // var label = this.scene.add.text(10, 10, info, labelStyle);


      return goal_ar;
    }
    showGoalIntro(goals,x,y){
      console.log(goals+ " <<<<<<<< FGOALS ");
      for(var i=0;i<goals.length;i++){
        var labelStyle = { font: "16px courier", fill: "#000000", align: "left" };
        // var info = this.levelName;
        var label = this.scene.add.text(x, y, goals[i][0], labelStyle);
        label.x =x-label.width/2;

        gsap.fromTo(label, 1,{alpha:0},{alpha:1.5,y:"-=50",delay:1+(i*1), onComplete:this.destroyGoal,onCompleteParams:[label],ease:Expo.easeNone});

      }

  }

    showGoal(goal,x,y){
      var labelStyle = { font: "16px courier", fill: "#000000", align: "left" };
      // var info = this.levelName;
      var label = this.scene.add.text(x, y, goal, labelStyle);
      label.x =x-label.width/2;
      // gsap.to(label, .5,{y:"-=50",delay:0, onComplete:() => {sc.startGame2();},ease:Expo.easeNone});
      gsap.to(label, .5,{y:"-=50",delay:0, onComplete:this.destroyGoal,onCompleteParams:[label],ease:Expo.easeNone});
    }
    destroyGoal(ob){
      ob.destroy();

    }

    destroy(){
  //     this.label.destroy();
  //     for(var i=0;i<this.goalItems.length;i++){
  //
  //       this.goalItems[i][1].destroy();
  //       this.goalItems[i][2].destroy();
  //       this.goalItems[i][0].destroy();
  // Phaser.Utils.Array.Remove(this.goalItems, this.goalItems[i]);
  //     }
    this.home_btn.destroy();
  this.healthBar.destroy();
  this.label.destroy();
  this.goalText.destroy();
  this.hudScreen.destroy();
    }

}
