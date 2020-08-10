class UIControls{
  constructor(scene,dog,dw, level){
      this.scene = scene;
      this.dog = dog;
      this.dogWorld = dw;
      this.pointerRightDown = false;
      this.pointerLeftDown = false;
      this.pointerAction = false;
      this.pointerReady = true;
      this.pointerSitAction = false;
      this.pointerDownAction = false
      this.init = true;
      this.destroyed = false;
      this.level = level;
      this.uifade = .17;
      this.allui = [];
        this.create();
    }
    create(){
      this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
      this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.makePhoneControls(this);
      gsap.to(this.allui, {alpha:this.uifade,duration:1,delay:3,ease: "sine",stagger: {
        from: "front",
      amount:1.75
        }});

    }
    makePhoneControls(sc){
      console.log("MAKE PHONE CONTROLS ____ ")
      this.right_btn = this.scene.add.image(600,425,"ui_touch").setInteractive({ useHandCursor: true });
        this.right_btn.on('pointerdown', function (pointer) {
          // sc.dog.walk("right");
          // gsap.fromTo(this, {alpha:.5}{alpha:sc.uifade,duration:1,ease: "sine"});
          gsap.fromTo(this, {alpha: .5}, {alpha: sc.uifade, duration: .5});
          sc.pointerRightDown =true;
      sc.pointerLeftDown =false;
    });
    this.right_btn.on('pointerup', function (pointer) {
    // sc.dog.walk("right");
      sc.pointerRightDown =false;

    });
    this.mid_up_btn = this.scene.add.image(400,350,"ui_touch").setInteractive({ useHandCursor: true });
    this.mid_up_btn.setScale(.5);
      this.mid_up_btn.on('pointerdown', function (pointer) {
            gsap.fromTo(this, {alpha: .5}, {alpha: sc.uifade, duration: .5});
        if(!sc.pointerDownAction){
              sc.pointerDownAction = true;
        }else{
              sc.pointerDownAction = false;
        }

      if(sc.pointerReady){
        sc.dog.dogdown(true);

    // sc.pointerAction=true;
    // sc.pointerReady = false;
      }
    });
    this.mid_up_btn.on('pointerup', function (pointer) {
    // sc.pointerAction=false;
    // sc.pointerReady = true;
    });

    this.mid_down_btn = this.scene.add.image(400,440,"ui_touch").setInteractive({ useHandCursor: true });
    this.mid_down_btn.setScale(.5);
      this.mid_down_btn.on('pointerdown', function (pointer) {
    gsap.fromTo(this, {alpha: .5}, {alpha: sc.uifade, duration: .5});
        if(!sc.pointerSitAction){
              sc.pointerSitAction = true;
        }else{
              sc.pointerSitAction = false;
        }
        // console.log("pointersit "+ sc.pointerSitAction);
      if(sc.pointerReady){
      sc.dog.sit(true);

    // sc.pointerAction=true;
    // sc.pointerReady = false;
      }
    });
    this.mid_down_btn.on('pointerup', function (pointer) {
    // sc.pointerAction=false;
    // sc.pointerReady = true;

    });

    this.mid_btn = this.scene.add.image(400,550,"ui_touch").setInteractive({ useHandCursor: true });
      this.mid_btn.on('pointerdown', function (pointer) {
            gsap.fromTo(this, {alpha: .5}, {alpha: sc.uifade, duration: .5});
      if(sc.pointerReady){
    sc.pointerAction=true;
    sc.pointerReady = false;
      }
    });
    this.mid_btn.on('pointerup', function (pointer) {
    sc.pointerAction=false;
    sc.pointerReady = true;
    });
    this.left_btn = this.scene.add.image(200,425,"ui_touch").setInteractive({ useHandCursor: true });
      this.left_btn.on('pointerdown', function (pointer) {
            gsap.fromTo(this, {alpha: .5}, {alpha: sc.uifade, duration: .5});
        sc.pointerLeftDown =true;
          sc.pointerRightDown =false;
    });
    this.left_btn.on('pointerup', function (pointer) {
    // sc.dog.walk("right");
      sc.pointerLeftDown =false;

    });
  this.allui = [this.right_btn,this.left_btn,this.mid_btn,this.mid_down_btn,this.mid_up_btn];
    }
///##### DOG CONTROLS
      dogControls(){
        if(!this.init || this.destroyed){

          return;
        }
        // console.log(" ACTIVE: "+ this.gameActive);
          if(this.dogWorld.checkWin() && this.scene.gameActive){
              // this.bigWin();
          }else if(this.scene.gameActive){
          this.dogWorld.update();
          }
            //SPACE
          if(  Phaser.Input.Keyboard.JustDown(this.spacebar) || this.pointerAction){
            this.pointerAction = false;
            this.dog.bark(true);
              // this.dog.goLong(true);
            // this.dogWorld.checkAction(this.dog.isFlipped());
            this.level.checkAllActiveItems();
            // this.dogWorld.checkActiveItems(this.dog);
          }
            if(this.cursorKeys.space.isDown){
          //  console.log("SPACE KEY")

            }
            if(this.cursorKeys.space.isUp  || !this.pointerAction){
            this.dog.bark(false);
                this.dogWorld.enableAction(true);
            }
            //UP
            if(this.cursorKeys.up.isDown || this.pointerDownAction){
             this.dog.dogdown(true);

           }else if(this.cursorKeys.up.isUp || !this.pointerDownAction){
           this.dog.dogdown(false);
            }
            if(this.pointerDownAction &&  !this.pointerLeftDown && !this.pointerRightDown &&!this.cursorKeys.right.isDown && !this.cursorKeys.left.isDown){
                    // this.dog.walk("null");
                    // this.level.takeAction();
                     this.dog.dogdown(true);
            }
            if(!this.pointerDownAction && !this.pointerLeftDown && !this.pointerRightDown &&!this.cursorKeys.right.isDown && !this.cursorKeys.left.isDown){
                    // this.dog.walk("null");
                     this.dog.dogdown(false);
            }
            if(this.cursorKeys.down.isDown || this.pointerSitAction){
              // console.log("sit")
              this.dog.sit(true);
            }
            if(this.cursorKeys.down.isUp && !this.pointerSitAction){
            this.dog.sit(false);
          }

          if(this.cursorKeys.left.isDown || this.pointerLeftDown){
              this.pointerRightDown = false;
              this.dog.walk("left");
              if(this.dog.iswalking){
              // this.dogWorld.checkAction(this.dog.isFlipped());
              if(this.cursorKeys.up.isDown || this.pointerDownAction){
              this.level.spinWorlds(1.5);
            }else{     this.level.spinWorlds(1);}
            }
            }else if(this.cursorKeys.left.isUp && !this.cursorKeys.right.isDown && !this.cursorKeys.left.isDown && !this.pointerLeftDown && !this.pointerRightDown){
            this.dog.walk("null");
          }
          if(this.cursorKeys.right.isDown || this.pointerRightDown){
        this.pointerLeftDown = false;
              this.dog.walk("right");

              if(this.dog.iswalking ){
                if(this.cursorKeys.up.isDown || this.pointerDownAction){

                this.level.spinWorlds(-1.5);
              }else{     this.level.spinWorlds(-1);}
            }
          }else if(this.cursorKeys.right.isUp && !this.cursorKeys.left.isDown && !this.pointerLeftDown && !this.pointerRightDown  ){
            this.dog.walk("null");
            }
            // if(this.cursorKeys.right.isDown && this.cursorKeys.left.isDown){
            //     this.dog.goLong(true);
            //   }
              // console.log("down :" + this.cursorKeys.up.isDown + " :::: and right::"+ this.cursorKeys.right.isDown);
              if(this.pointerDownAction){
                console.log(" PR :"+this.pointerRightDown + " : : PL : "+ this.pointerLeftDown);

                if(!this.pointerRightDown && !this.pointerLeftDown){
                      this.dog.walk("null");
                }
              }
              if(!this.cursorKeys.right.isDown && !this.cursorKeys.left.isDown && !this.pointerLeftDown && !this.pointerRightDown){
                    this.dog.walk("null");
            }
            if(this.cursorKeys.right.isUp && this.cursorKeys.left.isUp && !this.pointerLeftDown && !this.pointerRightDown){
            this.dog.walk("null");
          }
      }
///##### DOG CONTROLS
    destroyAll(){
    for(var i=0;i<  this.allui.length;i++){
        this.allui[i].destroy();
    }
    // REMOVE EVERYTHING ---
    }

}
