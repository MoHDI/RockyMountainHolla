class PokerTest extends Phaser.Scene {
  constructor(){
    super("PokerTest");
  }
preload(){};
create(){
    this.init = false;
    this.hollagame = this;
    this.debugGame = true;
    this.titleScreen;
    this.infoScreen;
    this.curLevel;
    this.deck;
    this.players = [];
    this.gameActive =true;
    this.emitter= EventDispatcher.getInstance();
    this.cardPos= [[100,100],[200,100],[300,100]];
    this.curPlayer = 0;
    this.totalPlayers = 9;
   
    this.table;
    this.actionCopy=[];
   
    this.communityCards=[[13,1],[14,2]];
    console.log(this.communityCards);
    this.communityCards=[];
    console.log(this.communityCards);
    console.log('::::::::::::::::::::::::::::::::::::::');
this.table = this.add.container(0,0);
this.deck = new DeckOfCards(this);
this.poker = new PokerMath(this);
Phaser.Utils.Array.Shuffle(this.cardPos);
console.log("Holla Game! " +   this.cardPos);
this.deck.shuffleCards();
this.emitter=EventDispatcher.getInstance();
this.emitter.on('SHUFFLECARDS',this.shuffleCards.bind(this));
// this.emitter = EventDispatcher.getInstance();
// this.emitter.on('ATTACK',this.doAttack.bind(this));
this.emitter.emit("SHUFFLECARDS",{weapon:'sword',strength:5,monster:'dragon'});

this.emitter.emit("SHUFFLCARDS",'ok');
// this.emitter.emit("ATTACK",{weapon:'sword',strength:5,monster:'dragon'});
    this.actionCopy= [
        "Who's it' going to be?",
        "Pick me dealer, pick me!",
          "Ship it!",
          "I can't lose"
    ]
    var chip_btn = this.add.image(50,50,"chip_btn");

    var basic_bg = this.add.image(1024/2,(768/2)+300,"dither2_bg");
    
    basic_bg.depth = 25;
    this.table.depth = 30;
  this.table.add([basic_bg,chip_btn]);

    var config = {
      key: 'cardsAll',
      frames: this.hollagame.anims.generateFrameNumbers('cards', { start: 0, end: 54 }),
      frameRate: 3,
      repeat: -1
  };
  this.hollagame.anims.create(config);
  this.deck.depth = 111;
  this.makePlayers();
  var deb = true;
  var delaytoFlop = 0;
  this.dealHand(this.deck,this,this.players);
  if(deb != true){


  // gsap.delayedCall(5, this.delayedScoopTest2,[this.deck,this.hollagame]);
  // gsap.delayedCall(10, this.dealHand2,[this.deck,this.hollagame]);
  
  gsap.delayedCall(delaytoFlop, this.dealFlop,[this.deck,  this.hollagame]);
  /// AFTER FLOP IS DEALT SHOW PERCENTAGES ThEN DEAL THE TURN AND RIVER ;
  gsap.delayedCall(delaytoFlop + 5, this.showOdds,[this.deck,  this.hollagame]);
  gsap.delayedCall(delaytoFlop +9, this.dealTurn,[this.deck,  this.hollagame]);
  gsap.delayedCall(delaytoFlop +8, this.showOdds,[this.deck,  this.hollagame]);
  gsap.delayedCall(delaytoFlop +11, this.dealRiver,[this.deck,  this.hollagame]);
  gsap.delayedCall(delaytoFlop+16, this.showWinner,[this.deck,  this.hollagame]);
//  gsap.delayedCall(delaytoFlop +25, this.delayedScoop,[this.deck,this.hollagame]);
}
//  this.scale.on('resize', resize, this);
//  this.scale.on('resize', this.resize,this.hollagame);
  // gsap.delayedCall(5, this.flipCard);
}
dealToPlayers(){

}
cardHit(card,val){
  console.log(" CAARD HIT " + val);
    card.setFrame(val);
}
doAttack(parameter)
{
  console.log('777you attacked the '+parameter.monster+' with a '+parameter.weapon);
}
shuffleCards(params){
  console.log("ShuffleCards _>>>> " + params);
}
dealSomeCards(){
  
}
delayedScoopTest2(dc,sc){

  dc.scoopDeck();
}
delayedScoop(dc,sc){

   //   console.log(dc);
    //  console.log("---------------------")
    //  console.log(sc);
    sc.communityCards = [];
    sc.clearPlayersCards();
    sc.setCommunityCards();
    var startDTime = 0;
      dc.scoopDeck();
      
      dc.shuffleCards();
      gsap.delayedCall(startDTime-3, sc.dealHand,[dc,sc,sc.players]);
      gsap.delayedCall(startDTime+5, sc.dealFlop,[dc, sc]);
      /// AFTER FLOP IS DEALT SHOW PERCENTAGES ThEN DEAL THE TURN AND RIVER ;
      gsap.delayedCall(startDTime+7, sc.showOdds,[dc,  sc]);
      gsap.delayedCall(startDTime+13, sc.dealTurn,[dc,  sc]);
      gsap.delayedCall(startDTime+14, sc.showOdds,[dc,  sc]);
      gsap.delayedCall(startDTime+16, sc.dealRiver,[dc, sc]);
      gsap.delayedCall(startDTime+16, sc.showWinner,[dc, sc]);
      gsap.delayedCall(startDTime+25, sc.delayedScoop,[dc,sc]);
    }
showInfo(){
  this.levelmenu.setPos(0,-600);
// console.log("SHOW INFO");
this.menuMove(-600);
  // gsap.to(this.titleScreen, {y:-600, duration:1});
}
menuMove(y){
  gsap.killTweensOf(this.titleScreen );
  gsap.to(this.titleScreen, {y:y, duration:1});
}

makeTitleScreen(gam){

    // console.log("title");
    gam.titleScreen = gam.add.container(0,0);
    var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    var graphics = gam.add.graphics({ fillStyle: { color: 0xFFFFFF } });
     graphics.fillRectShape(rect);
   
    gam.titleScreen.add([graphics]);

}

  startNext(){
  }
  makePlayers(){
    var count = 0;
    var ypos = 155+(213/2)
    for(var i=0;i<this.totalPlayers;i++){
      //ADD THE PLAYERS TO THE TABLE - 
      // var player = this.add.image((151/2)+151*i,100+(213/2),"char_green");
      var playerContainer = this.add.container((80)+110*i,(170));
      var player = this.add.sprite(0,0,"char_new");
      player.depth = 11+i;
      playerContainer.add([player]);
            // var rano =Math.floor(Math.random()*3);
      var rano =Math.floor(Math.random()*3);
      player.setFrame(rano);
      // player.setFrame(0);
      var pp = new Player(player,playerContainer,"Player " + (i+1),this);

      //THIS IS THE PLAYERS CARD POSITION IN FRONT OF THEM> 
      ypos = 210+(213/2);
      count++;
      if(count==2 ) {
        // player.setPos((80)+110*i,180);
        // player.y = 200;
        ypos = 250+(213/2);
       count=0;
      }
    
      // pp.setCardPos((90/2)+151*i,ypos);
     
      pp.setCardPos(50+(110*i),ypos);
      this.players.push(pp);
    }
  }
  clearPlayersCards(){
    for(var i=0;i<this.totalPlayers;i++){
      var pp = this.players[i];
      pp.clearCards();
    }
  }
  dealHand(deck,scc,pl){
    console.log(" DEAL HAND OKAY ");
    var count = 0;
    var nextDelay = 4;
    for(var i=0;i<9;i++){
      // console.log();
      var pp = pl[i];
      // console.log("COUNT : " + count );
     // console.log(pp.getCardPos());
     ///TODO DELAY GIVING A CARD UNTIL THE ACTUAL CARD IS IN FRONT OF THEM
     pp.giveACard(deck.showOneCard(51-count));
     deck.getCard(51-count).showCard();
      var sc = .18;
     gsap.to( deck.getCard(51-count).getRefClip(),{
       x:pp.getCardPos()[0],y:pp.getCardPos()[1],
       rotation:Math.PI*2,
       scaleX:sc,scaleY:sc, 
       duration:1,
       delay:.2*i
        });
    count++;

    }
    count = 0;
    for(var ii=0;ii<scc.totalPlayers;ii++){
      // console.log("COUNT2 : " + count );
      var pp = scc.players[ii];
      // console.log(pp.getCardPos());
      var sc = .18;
      var cardnum = 51-9;
      pp.giveACard(deck.showOneCard(cardnum-count));
 

       gsap.to( deck.getCard(cardnum-count).getRefClip() , {
         x:pp.getCardPos()[2],
         y:pp.getCardPos()[1],
         rotation:Math.PI*2,scaleX:sc,
         scaleY:sc, 
         duration: 1,
         delay:nextDelay + (.2*ii), 
         onStart:scc.showCardDD, 
         onStartParams:[scc.deck,cardnum-count]
        });
       count++

    }
  }
  showCardDD(deck,num){
    // console.log("this card should Show " + num)
 deck.getCard(num).showCard();
  }

  dealFlop(dc,scene){
    var sc =.55;
    var startY = 355;
    // var pcount = this.players.length;
    var pcount = 9;


    scene.burnCard(33,1);
  // scene.flipCard(dc,33);
    gsap.to( dc.getCard(32).getRefClip() , {x:(225/2)+475,y:startY+(213/2),rotation: Math.PI*0,scaleX:sc,scaleY:sc, duration:1,delay:.2*0});
    gsap.to( dc.getCard(31).getRefClip() , {x:(225/2)+475,y:startY+(213/2),rotation:Math.PI0*0,scaleX:sc,scaleY:sc, duration: 1,delay:.2*1});
    gsap.to( dc.getCard(30).getRefClip() , {x:(225/2)+475,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 1,delay:.2*2});

    gsap.delayedCall(0, scene.flipCard,[dc,"32"]);
    gsap.delayedCall(0, scene.flipCard,[dc,"31"]);
    gsap.delayedCall(0, scene.flipCard,[dc,"30"]);

    gsap.to( dc.getCard(32).getRefClip() , {x:(225/2)+175,y:startY+(213/2),rotation: Math.PI*0,scaleX:sc,scaleY:sc, duration:1,delay:1+.2*0});
    gsap.to( dc.getCard(31).getRefClip() , {x:(225/2)+325,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 1,delay:1+.2*0});
    gsap.to( dc.getCard(30).getRefClip() , {x:(225/2)+475,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 1,delay:1+.2*0});



  scene.communityCards.push(dc.getCard(32).getValue());
  scene.communityCards.push(dc.getCard(31).getValue());
  scene.communityCards.push(dc.getCard(30).getValue());

  scene.setCommunityCards();
}

  burnCard(val,pos){
       //BURN 
       var sc =.55;
       var startY = 355;
       console.log("BURN CARD "+ val);
       if(pos==1){
        //  console.log(pos);
       }
       gsap.to( this.deck.getCard(val).getRefClip() , {x:(225/2)+155,y:startY+190+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:1,delay:.2*0});
       
  }
  dealTurn(dc,scene){
    console.log("TURN IT ");
    var sc =.55;
    var startY = 355;
    //BURN 
   
    gsap.to( dc.getCard(29).getRefClip() , {x:(225/2)+165,y:startY+200+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:.5,delay:.2*0});
   //TURN
   dc.getCard(28).getRefClip().depth=1110;
    gsap.to( dc.getCard(28).getRefClip() , {x:(225/2)+625,y:startY+(213/2),scaleX:sc,scaleY:sc, duration:.5,delay:.2*1});
     gsap.delayedCall(2, scene.flipCard,[dc,"28"]);
     scene.communityCards.push(dc.getCard(28).getValue());
     scene.setCommunityCards();
  }
  dealRiver(dc,scene){
    console.log("RIVER IT ");
    var sc =.55;
    var startY = 355;
    //BURN 

    gsap.to( dc.getCard(27).getRefClip() , {x:(225/2)+175,y:startY+210+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:.5,delay:.2*0});
   //TURN
   dc.getCard(26).getRefClip().depth=1110;
    gsap.to( dc.getCard(26).getRefClip() , {x:(225/2)+775,y:startY+(213/2),scaleX:sc,scaleY:sc, duration: .5,delay:.2*1});
     gsap.delayedCall(2, scene.flipCard,[dc,"26"]);
     scene.communityCards.push(dc.getCard(26).getValue());
     scene.setCommunityCards();
  }
  showWinner(dc,scene){
    for(var i=0;i<9;i++){
      console.log('_____CHECKING FOR WINNERS_________'+ i +" +++++++++++++++++++++");
      scene.poker.checkMyHand(i,scene.players[i].currentCards());
         console.log('_________WINNER__________________'+ i +" +++++++++++++++++++++");
    }
  }
  setCommunityCards(){
    this.poker.setCommunityCards(this.communityCards);
  }
  showOdds(dk,sc){
console.log("show odds:::: "+ sc.poker.getMyOdds());
 //   poker.showOdds();
    for(var i=0;i<9;i++){
      console.log('_____PLAYER NUMBER '+ i +" HAS +++++++++++++++++++");
      sc.poker.checkMyHand(i, sc.players[i].currentCards());
         console.log('___________________________'+ i +" +++++++++++++++++++++");
    }

  }
  bigWin(){

  }
  flipCard(deck,card){
    
    deck.showTheCard(card);
    // card.getRefClip().showCard();
   console.log(card);
  }
  adjustStreetY(){

  }
  resize (gameSize, baseSize, displaySize, resolution)
  {
    /// maybe set up later
      var width = gameSize.width;
      var height = gameSize.height;
  
     // this.cameras.resize(width, height);
    
     // this.bg.setSize(width, height);
     // this.logo.setPosition(width / 2, height / 2);
  }
    update() {
      if(this.curLevel && this.gameActive)this.curLevel.update();

   
  }
}
