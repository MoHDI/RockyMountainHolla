class PopUpTalk{
    
    constructor( scene){

  this.parScene = scene;
  this.txtLabel;
  this.top;
  this.curChar;
  this.player;
  this.talkBox;
//   this.playerContainer;
    this.create();
      }
  
    create(){
    // var top = this.parScene.add.container(1024,13);

    var playerContainer = this.parScene.add.container(100,630);
    var player = this.parScene.add.sprite(0,0,"char_new");
    player.scaleX = player.scaleY = 2.5;
    player.depth =112;
  
    var rano =Math.floor(Math.random()*12);
    player.setFrame(rano);
    // player.setFrame(0);
    

        
    var talk_box = this.parScene.add.image(300,35,"talk_box");
    //    gc.alpha =0;
        this.talkBox = talk_box;
    var labelStyle = { font: "16px courier", fill: "#000000",align: "left"};
    var st ="GAME NUMBER : 0";
    var label = this.parScene.add.text(350, -15, st, labelStyle);
    label.width = 360;
    label.x -= label.width/2;
    this.txtLabel = label;
    playerContainer.depth = 2002;
    
    playerContainer.add([player,talk_box,label]);
    var pp = new Player(player,playerContainer,"Player Pop UP" ,this.parScene);
    pp.setTxt(" ")
    this.player = pp;
    this.hidePlayer();
     // console.log("Player Made"  + this.playerName);
    }
    hidePlayer(){
        gsap.to( this.player.playerContainer, {
            y:1300,
            duration: 2.5,
            ease: "power2.out"
            });
    }
    popTalk(txt,id,dur=2){
        this.txtLabel.text = txt;
        if(txt == "hide" || txt  ==""){
            this.talkBox.alpha = 0;
        }else{
            this.talkBox.alpha =1;
        }
        this.player.setPlayerSprite(id);
        gsap.to( this.player.playerContainer, {
            y:630,
            duration: 1,
            ease: "power2.out"
            });
            gsap.to( this.player.playerContainer, {
                y:1300,
                duration: 2.5,
                delay:dur,
                ease: "power2.out"
                });
    }
  
    changePlayer(playerId){
       // this.player.setFrame(playerId);
    }
   
    setPos(x,y){
        // this.cardPosX = x;
        // this.cardPosY = y; 
  
    }
    logHistory(hist){
        this.gameHistory.push(hist);
    }
    getHistory(){
        return this.gameHistory;
    }
    getPosition(){
        
    }
    updatePositioning(size){
 
    }
 
  
    update() {
   
     }
  }
  