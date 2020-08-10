class Player{
    
    constructor(pl,plc,plname, scene,ID){
    
  this.destroyed=false;
  this.playerSprite = pl;
  this.playerName = plname;
  this.holdScene = scene;
  this.playerContainer = plc;
  this.cardPos1X;
  this.cardPose1Y;
  this.cardPos2X;
  this.cardPose2Y;
  this.txtLabel;
  this.winCoins= [];
  this.coinsHolder;
  this.holeCards = [];
  this.playerID = ID;
  this.emotions = ["horrible","bad","could be better","not too bad","hopefull","optimistic","awesome","Whooooo Hooo I'm the best at everything ever no one could ever bring me down!"]
  this.currentEmotion = 3;
    this.create();
      }
  
    create(){
    // coinsHolder = this.scene.add.container(1024/2,768/2);
    // for(var i=0;i<5;i++){
    //     var winCoin= this.holdScene.add.sprite(-45,65-(35*i), "win_coins");
    //     winCoin.alpha = 1-(i/5);
    //     // winCoin.depth = 10;
    //     // winCoin.scaleX = winCoin.scaleY = .5;
    //     this.playerContainer.add([winCoin]);
    //     this.winCoins.push(winCoin);
    // }

   
    // this.playerContainer.add([coinsHolder]);
    var labelStyle = { font: "12px courier", fill: "#000000",align: "center"};
    var st = this.playerName;
    var label = this.holdScene.add.text(0, 97, st, labelStyle);
    label.alpha = .5;
        label.x -= label.width/2;
    this.txtLabel = label;
   // this.winCoin = winCoin;
    this.playerContainer.add([label]);
    
     // console.log("Player Made"  + this.playerName);
    }
    addGameCoin(num){
        for(var i=0;i<this.winCoins.length;i++){
            if(this.winCoins[i].alpha <=0){
                this.winCoins.splice(-1);
            }
        }
        var winCoin= this.holdScene.add.sprite(-45,60+35, "win_coins");
        winCoin.alpha = 1;
        winCoin.setFrame(num);
        this.playerContainer.add([winCoin]);
        this.winCoins.unshift(winCoin);
    }
    addMultGameCoins(n,nn){
     
        var winCoin= this.holdScene.add.sprite(-55,60+35, "win_coins");
        winCoin.alpha = 1;
        winCoin.setFrame(n);
        this.playerContainer.add([winCoin]);
        this.winCoins.unshift(winCoin);

        var winCoin= this.holdScene.add.sprite(-25,60+35, "win_coins");
        winCoin.alpha = 1;
        winCoin.setFrame(nn);
        this.playerContainer.add([winCoin]);
        this.winCoins.unshift(winCoin);

    }
    handResult(num){
      switch(num){
          case 9:
            this.addGameCoin(num-1)
            
          break;
        case 1:
            this.addGameCoin(num-1)
        break;
        case 2:
            this.addGameCoin(num-1)
        break;
        case 3:
            this.addGameCoin(num-1)
         break;
         case 30:
            this.addMultGameCoins(8,13);
         break;
        default:
            this.addGameCoin(17);
            break;

      }
      for(var i=0;i<this.winCoins.length;i++){
          console.log("WIN COINS " + i);
          var fade = "1";
          if(i>0)fade="-=.25";
        gsap.to( this.winCoins[i], {
            y:"-=35",
            alpha:fade,
            duration: .5,
            ease: "power2.out"
            });
      }
   
    }
    setTxt(txt){
        this.txtLabel.text = txt;
    }
   tableTalk(words){
        this.txtLabel.text = words;
    }
    setCardPos(x,y){
        this.cardPos1X = x;
        this.cardPos1Y= y;
        this.cardPos2X = x+47;
     
        // console.log(this.playerName + " : "+ this.cardPos1X + " : " + this.cardPosY);
    }
    getCardPos(){
        var pos = [this.cardPos1X, this.cardPos1Y,this.cardPos2X];

        return pos;
    }
    setPos(x,y){
        // this.cardPosX = x;
        // this.cardPosY = y; 
  
    }
    setPlayerSprite(id){
        this.playerID = id;
        this.playerSprite.setFrame(id);
    }
    getPlayerContainer(){
        return this.playerContainer;
    }
    getPlayerID(){
        return this.playerID;
    }
    getPlayerName(){
        return this.playerName;
    }
    showWin(){
        
    }
    clearCards(){
        this.holeCards = [];
    }
    giveACard(card){
        console.log(" PARD " + this.getHoleCardValue(card));
        // console.log("GIVE A CARD ");
        // console.log(card);
        this.holeCards.push(card);
        if(this.holeCards.length==2){
            if(this.getHoleCardValue(this.holeCards[0])==this.getHoleCardValue(this.holeCards[1])){
            
                gsap.delayedCall(6, this.reaction,[5,this]);
                //DELAY THIS UNTIL THE CARD ACTUALLY COMES OUT ... or at have hit when card is finished.
            }
        }
    }
    reaction(emotion,scene){
     
        switch(emotion){
            case 5:
                console.log(" ALRIGHT I GOT A POCKET PAIR of" + scene.getHoleCardValue(scene.holeCards[1])+"'s !!!!");
                // scene.playerSprite.y-=10;
               // scene.tableTalk("Alright!!");
                break;
            default: break;
        }
        scene.currentEmotion = scene.emotions[emotion];
     
    }
    getHoleCardValue(num){
        var cardVal = (num+1)%13;
        if(cardVal==0)cardVal = 13;
        return cardVal
    }
    currentCards(){
        return this.holeCards;
    }
    setEmotion(){

    }
    getPosition(){
        
    }
    updatePositioning(size){
 
    }
 
  
    update() {
   
     }
  }
  