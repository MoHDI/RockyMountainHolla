class HollaGame extends Phaser.Scene {
  constructor(){
    super("HollaGame");
  }
preload(){};
create(){
    this.init = false;
    this.hollagame = this;
    this.debugGame = false;
    this.titleScreen;
    this.infoScreen;
    this.curLevel;
    this.deck;
    this.players = [];
    this.gameActive =true;
    this.gameCount = 20948;
    this.wonkTrace = new WonkHands();
    this.emitter= EventDispatcher.getInstance();
    // this.cardPos= [[100,100],[200,100],[300,100]];
    this.curPlayer = 0;
    this.totalPlayers = 9;
    this.betScreen;
    this.table;
    this.actionCopy=[];
    this.handAction=[];
    this.communityCards=[[13,1],[14,2]];
    console.log(this.communityCards);
    this.communityCards=[];
    console.log(this.communityCards);
    console.log('::::::::::::::::::::::::::::::::::::::');
this.table = this.add.container(0,0);
this.deck = new DeckOfCards(this);
this.poker = new PokerMath(this);
this.gameData = new GameCounter(this);
this.playerPop = new PopUpTalk(this);
console.log(this.deck);

// this.deck.shuffleCards();
//console.log(this.deck);
this.emitter=EventDispatcher.getInstance();
this.emitter.on('SHUFFLECARDS',this.shuffleCards.bind(this));
// this.emitter = EventDispatcher.getInstance();
// this.emitter.on('ATTACK',this.doAttack.bind(this));
this.emitter.emit("SHUFFLECARDS",{weapon:'sword',strength:5,monster:'dragon'});

this.emitter.emit("SHUFFLCARDS",'ok');

this.emitter.on('HANDEVENT',this.handEvent.bind(this));

// this.emitter.emit("ATTACK",{weapon:'sword',strength:5,monster:'dragon'});
    this.actionCopy= [
        "Who's it' going to be?",
        "Pick me dealer, pick me!",
          "Ship it!",
          ""
    ]
    this.actionPreCopy= [
      "I like these hole cards",
      "Pick me dealer, pick me!",
        " ",
        "I can't lose"
  ]
    this.actionFlopCopy= [
      "Here we go.",
      "My favorite hand.",
        "Come on dealer.",
        "Only two more streets.",
        "Going to be some coin toss."
  ]

  this.actionTurnCopy= [
    "I like my chances",
    " ",
      "Just getting good. ",
      "It's not over yet."
]
this.actionRiverCopy= [
  "Nice River",
  "My emotions.",
    "Ship it!",
    "Not what I expected."
]
    // var chip_btn = this.add.image(50,50,"chip_btn");

    var basic_bg = this.add.image(1024/2,(768/2)+2300,"dither2_bg");
    
    basic_bg.depth = 25;
    this.table.depth = 30;
  // this.table.add([basic_bg,chip_btn]);

    var config = {
      key: 'cardsAll',
      frames: this.hollagame.anims.generateFrameNumbers('cards', { start: 0, end: 54 }),
      frameRate: 3,
      repeat: -1
  };
  this.hollagame.anims.create(config);
  this.deck.depth = 111;
  this.makePlayers();
  this.makeBetSlip();
  var deb = false;
  // var deb = true;
  var delaytoFlop = 8;

/*

POKER MATH>>>>> TIME TO GET IT GOING 
####################################
####################################
####################################
####################################
####################################
####################################
*/
if(deb){
// this.players[0].setTxt("nice ");
// // this.randomPlayer();
// for(var i=0;i<=20; i++){
// // console.log(this.randomPlayer().getPlayerName());
// this.deck.shuffleCards(i);
// console.log(this.deck);

// }

for(var ii=0;ii<1; ii++){
  // console.log(this.randomPlayer().getPlayerName());
  // this.players[ii].handResult(30);
  console.log(" HAND # ##### " + ii + "############");
  console.log(this.wonkTrace.getDeck(ii)[0]);
  // this.player[ii].give//ACard(0)

  var cardVal= this.poker.getCardValue(this.wonkTrace.getDeck(ii)[0][19]);
  if(cardVal == 11)cardVal = "Jack";
  if(cardVal == 12)cardVal = "Queen";
  if(cardVal == 13)cardVal = "King";
  if(cardVal == 0)cardVal = "Ace";
  var suit = this.poker.getSuitName(Math.floor((this.wonkTrace.getDeck(ii)[0][19])/13));

  console.log(cardVal + " of " + suit);
  // this.communityCards = [this.wonkTrace.getDeck(ii)[0][19],this.wonkTrace.getDeck(ii)[0][20],this.wonkTrace.getDeck(ii)[0][21],this.wonkTrace.getDeck(ii)[0][23],this.wonkTrace.getDeck(ii)[0][25]]
  // this.poker.setCommunityCards();
  console.log(" HAND # ##### " + ii + "############");

  }

  // ACE IS 1 King is 13 
  // 1-13 is Diamonds
  //14-26 is Hearts
  //27-39 is Spades
  //40-52 is Clubs
//this.poker.setCommunityCards([1,1,2,2,27]);
//this.poker.checkMyHand(1,[0,52]);
//console.log(this.deck);
console.log('----------------------------------------');
//this.deck.shuffleCards();
// console.log(this.deck);
console.log('----------------------------------------');

// this.dealHand(this.deck,this,this.players);
// this.poker.checkMyHand(2,[14,15]);
// this.poker.checkMyHand(3,[15,8]);
}
/*
####################################
####################################
####################################
####################################
####################################
####################################
POKER MATH>>>>> TIME TO GET IT GOING 

*/
  
  if(deb != true){
    var rando = Math.floor(Math.random()*9);
    console.log(rando);
    rando = Math.floor(Math.random()*9);
    console.log(rando)
    rando = Math.floor(Math.random()*9);
    console.log(rando)
    rando = Math.floor(Math.random()*9);
    console.log(rando)
    this.deck.shuffleCards();
    this.dealHand(this.deck,this,this.players);

//   gsap.delayedCall(delaytoFlop+2, this.dealFlop,[this.deck,  this.hollagame]);
//   /// AFTER FLOP IS DEALT SHOW PERCENTAGES ThEN DEAL THE TURN AND RIVER ;

//   gsap.delayedCall(delaytoFlop + 5, this.showOdds,[this.deck,  this.hollagame]);
//   gsap.delayedCall(delaytoFlop +9, this.dealTurn,[this.deck,  this.hollagame]);
//   gsap.delayedCall(delaytoFlop +8, this.showOdds,[this.deck,  this.hollagame]);
//   gsap.delayedCall(delaytoFlop +11, this.dealRiver,[this.deck,  this.hollagame]);
//   gsap.delayedCall(delaytoFlop+20, this.showWinner,[this.deck,  this.hollagame]);
//  gsap.delayedCall(delaytoFlop +25, this.delayedScoop,[this.deck,this.hollagame]);
}
//  this.scale.on('resize', resize, this);
//  this.scale.on('resize', this.resize,this.hollagame);
  // gsap.delayedCall(5, this.flipCard);
}
getRandomCopy(cpy){
  var copy = " "
switch(cpy){
  case "PRE":
    copy = this.actionPreCopy[Math.floor(Math.random()*this.actionPreCopy.length)];
    break;
  case "FLOP":
    copy = this.actionFlopCopy[Math.floor(Math.random()*this.actionFlopCopy.length)];
  break;
  case "TURN":
    copy = this.actionTurnCopy[Math.floor(Math.random()*this.actionTurnCopy.length)];
    break;
  case "RIVER":
    copy = this.actionRiverCopy[Math.floor(Math.random()*this.actionRiverCopy.length)];
      break;
    default:
     copy = this.actionCopy[Math.floor(Math.random()*this.actionCopy.length)];
    break;
}
  return copy;
}
dealToPlayers(){

}
randomPlayer(){
 return  this.players[Math.floor(Math.random()*this.players.length)]
}
makeBetSlip(){
  var bs = this.add.container(0,0);
    bs.depth =3000;

  this.betScreen = new BetSlip(bs,this);

}

/*
####################################
####################################
####################################
####################################
####################################
################4444################
*/
handEvent(params){
  console.log(params);
  var delay = 4;
  switch(params){
    case "CARDSOUT":
    //  this.players[3].handResult(9);
      console.log("DEAL IS DONE EMITTER!!!! ");
          //char reactions 
      // this.randomPlayer().tableTalk(" I LIKE MY HAND");
      var rano =Math.floor(Math.random()*11);
      this.playerPop.popTalk(this.getRandomCopy("PRE"),rano,4);
      //deal flop 
      this.dealFlop(this.deck,this);  
      break;
    case "FLOPOUT":
      this.newGameStarting();
       //char reactions 
      //deal flop 
      delay = 6;
      this.playerPop.popTalk(this.getRandomCopy("FLOP"),rano);
      this.showOdds(this.deck, this);
      gsap.delayedCall(delay, this.dealTurn,[this.deck,  this]);
      break;
    case "TURNOUT":
      
      this.newGameStarting();
      this.playerPop.popTalk(this.getRandomCopy(),rano,1.54);
      this.showOdds(this.deck, this);
      gsap.delayedCall(delay, this.dealRiver,[this.deck,  this]);
      break;
    case "RIVEROUT":
      delay =0;
      this.newGameStarting();
      gsap.delayedCall(0, this.showWinner,[this.deck,  this]);
      // this.scoopDeck();
   
      break;
     case "WINNERDONE":
       delay = 10;
        this.newGameStarting();
        this.playerPop.popTalk(this.getRandomCopy("RIVER"),rano);
        // if(!this.debugGame)
        gsap.delayedCall(delay, this.delayedScoop,[this.deck,  this]);
        // this.scoopDeck();
     
        break;
    default: break;

  }
}
setHandAction(arr){ 
  this.handAction = [];
  this.handAction.push(arr[0][0]);
  this.handAction.push(arr[0][1]);
  this.handAction.push(arr[0][2]);
  console.log(this.handAction);
  console.log("_____>>>>>> HHHHHHH ")
}
newGameStarting(){
this.gameCount++;
this.gameData.gameCount("GAME : "+ this.gameCount);
this.gameData.logHistory([this.gameCount,this.randomPlayer()]);
}
/*
####################################
####################################
####################################
####################################
####################################
####################################
*/
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

delayedScoop(dc,sc){

   //   console.log(dc);
    //  console.log("---------------------")
    //  console.log(sc);
    sc.communityCards = [];
    sc.clearPlayersCards();
    sc.setCommunityCards();
    var startDTime = 5;
      dc.scoopDeck();
      if(!sc.debugGame){
        dc.shuffleCards();
      }
    
      gsap.delayedCall(startDTime+3, sc.dealHand,[dc,sc,sc.players]);
      // gsap.delayedCall(startDTime+5, sc.dealFlop,[dc, sc]);
      // /// AFTER FLOP IS DEALT SHOW PERCENTAGES ThEN DEAL THE TURN AND RIVER ;
      // gsap.delayedCall(startDTime+7, sc.showOdds,[dc,  sc]);
      // gsap.delayedCall(startDTime+13, sc.dealTurn,[dc,  sc]);
      // gsap.delayedCall(startDTime+14, sc.showOdds,[dc,  sc]);
      // gsap.delayedCall(startDTime+16, sc.dealRiver,[dc, sc]);
      // gsap.delayedCall(startDTime+16, sc.showWinner,[dc, sc]);
      // gsap.delayedCall(startDTime+20, sc.delayedScoop,[dc,sc]);
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
    var tempPlayers = [];
    var ypos = 155+(213/2)
    //chamge this numebr for moer chars
    for(var xx=0;xx<12;xx++){
          tempPlayers.push(xx);
      }
    Phaser.Utils.Array.Shuffle(tempPlayers);
    for(var i=0;i<this.totalPlayers;i++){
      this.newGameStarting();
      //ADD THE PLAYERS TO THE TABLE - 
      // var player = this.add.image((151/2)+151*i,100+(213/2),"char_green");
      var playerContainer = this.add.container((80)+110*i,(170));
      var matchCount =0;
      if(i==0){
        var barline = this.add.image(1024/2,0,"line_bg");
        barline.depth=1;
        playerContainer.add([barline]);
        }
      var player = this.add.sprite(0,0,"char_new");
    
      player.depth = 112+i;
      
      playerContainer.add([player]);
            // var rano =Math.floor(Math.random()*3);
      var rano =tempPlayers[i];
      // while(matchCount <=0){
      //   matchCount ==0;
      //   
      
      player.setFrame(rano);
        console.log("RANDO "+ rano);
        
      // player.setFrame(0);
      var pp = new Player(player,playerContainer,"Player " + (i+1),this, rano);

      //THIS IS THE PLAYERS CARD POSITION IN FRONT OF THEM> 
      ypos = 210+(213/2);
      count++;
      if(count==2 ) {
        // player.setPos((80)+110*i,180);
        // player.y = 200;
        ypos = 250+(213/2);
       count=0;
      }
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
       duration:.5,
       delay:.1*i
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

        if(ii==scc.totalPlayers-1){
            gsap.to( deck.getCard(cardnum-count).getRefClip() , {
              x:pp.getCardPos()[2],
              y:pp.getCardPos()[1],
              rotation:Math.PI*2,scaleX:sc,
              scaleY:sc, 
              duration: .5,
              delay:nextDelay + (.2*ii), 
              onStart:scc.showCardDD, 
              onStartParams:[scc.deck,cardnum-count],
              onComplete:scc.sectionDone,
              onCompleteParams:["deal",scc]
              });
            count++

          }else{
            gsap.to( deck.getCard(cardnum-count).getRefClip() , {
              x:pp.getCardPos()[2],
              y:pp.getCardPos()[1],
              rotation:Math.PI*2,scaleX:sc,
              scaleY:sc, 
              duration: .5,
              delay:nextDelay + (.2*ii), 
              onStart:scc.showCardDD, 
              onStartParams:[scc.deck,cardnum-count]
              });
            count++
          }
        }
   
  }

  sectionDone(part,scen){

    
    switch(part){
      case "deal":
        scen.emitter.emit("HANDEVENT",'CARDSOUT');
        console.log("DEAL IS DONE !!!! ");
        break;
      case "flop":
        scen.emitter.emit("HANDEVENT",'FLOPOUT');
        console.log("FLOP IS DONE !!!! ");
        break;
      case "turn":
        scen.emitter.emit("HANDEVENT",'TURNOUT');
        console.log("TURN IS DONE !!!! ");
        break;
      case "river":
          scen.emitter.emit("HANDEVENT",'RIVEROUT');
          console.log("RIVER IS DONE !!!! ");
        break;
        
      //  gsap.delayedCall(0,scen.dealFlop,[deck,  scen]);
        default: break;
    }
  
  }

  showCardDD(deck,num){
    // console.log("this card should Show " + num)
 deck.getCard(num).showCard();
  }

  dealFlop(dc,scene){
    var sc =.55;
    var startY = 410;
    // var pcount = this.players.length;
    var pcount = 9;


    scene.burnCard(33,1);
  // scene.flipCard(dc,33);
    gsap.to( dc.getCard(32).getRefClip() , {x:475+40,y:startY+(213/2),rotation: Math.PI*0,scaleX:sc,scaleY:sc, duration:1,delay:.2*0});
    gsap.to( dc.getCard(31).getRefClip() , {x:475+40,y:startY+(213/2),rotation:Math.PI0*0,scaleX:sc,scaleY:sc, duration: 1,delay:.2*1});
    gsap.to( dc.getCard(30).getRefClip() , {x:475+40,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 1,delay:.2*2});

    gsap.delayedCall(2.1, scene.flipCard,[dc,"32"]);
    gsap.delayedCall(2.0, scene.flipCard,[dc,"31"]);
    gsap.delayedCall(2.0, scene.flipCard,[dc,"30"]);

    gsap.to( dc.getCard(32).getRefClip() , {x:175+40,y:startY+(213/2),rotation: Math.PI*0,scaleX:sc,scaleY:sc, duration:2,delay:4.4+.2*0});
    gsap.to( dc.getCard(31).getRefClip() , {x:325+40,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 2,delay:4.4+.2*0});
    gsap.to( dc.getCard(30).getRefClip() , {x:475+40,y:startY+(213/2),rotation:Math.PI*0,scaleX:sc,scaleY:sc, duration: 2,delay:4.4 +.2*0,onComplete:scene.sectionDone,onCompleteParams:["flop",scene]});


    dc.getCard(32).getRefClip().depth=109;
    dc.getCard(31).getRefClip().depth=109;
    dc.getCard(30).getRefClip().depth=109;
  scene.communityCards.push(dc.getCard(32).getValue());
  scene.communityCards.push(dc.getCard(31).getValue());
  scene.communityCards.push(dc.getCard(30).getValue());

  scene.setCommunityCards();
}

  burnCard(val,pos){
       //BURN 
       var sc =.55;
       var startY = 410;
       console.log("BURN CARD "+ val);
       if(pos==1){
        //  console.log(pos);
       }
       this.deck.getCard(val).getRefClip().depth=14;
       gsap.to( this.deck.getCard(val).getRefClip() , {x:155,y:startY+190+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:1,delay:.2*0});
       
  }
  dealTurn(dc,scene){
    console.log("TURN IT ");
    var sc =.55;
    var startY = 410;
    //BURN 
    dc.getCard(29).getRefClip().depth=104;
    gsap.to( dc.getCard(29).getRefClip() , {x:165,y:startY+200+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:1,delay:.2*0});
   //TURN
   dc.getCard(28).getRefClip().depth=1110;
    gsap.to( dc.getCard(28).getRefClip() , {x:625+40,y:startY+(213/2),scaleX:sc,scaleY:sc, duration: 1,delay:.2*1,onComplete:scene.sectionDone,onCompleteParams:["turn",scene]});
     gsap.delayedCall(2, scene.flipCard,[dc,"28"]);

     
     scene.communityCards.push(dc.getCard(28).getValue());
     scene.setCommunityCards();
  }
  dealRiver(dc,scene){
    console.log("RIVER IT ");
    var sc =.55;
    var startY = 410;
    //BURN 
    dc.getCard(27).getRefClip().depth=124;
    gsap.to( dc.getCard(27).getRefClip() , {x:175,y:startY+210+(213/2),rotation: Math.PI*0,scaleX:sc*.5,scaleY:sc*.5, duration:1,delay:.2*0});
   //TURN
   dc.getCard(26).getRefClip().depth=1112;
    gsap.to( dc.getCard(26).getRefClip() , {x:775+40,y:startY+(213/2),scaleX:sc,scaleY:sc, duration: 1,delay:.2*1,onComplete:scene.sectionDone,onCompleteParams:["river",scene]});
     gsap.delayedCall(2, scene.flipCard,[dc,"26"]);
     scene.communityCards.push(dc.getCard(26).getValue());
     scene.setCommunityCards();
   
  }
  showWinner(dc,scene){
    var winP =  scene.randomPlayer().getPlayerID();
    var rando = Math.floor(Math.random()*9);
    for(var i=0;i<9;i++){
      console.log('_____CHECKING FOR WINNERS_________'+ i +" +++++++++++++++++++++");
      if(dc.mode == "WONKMODE"){
     // console.log("HAND " + scene.handAction[2][0]);
      //CHOP POTS? 12348
      if(i  == scene.handAction[2][0]){
       scene.players[i].handResult(9);
      scene.playerPop.popTalk(scene.handAction[2][1],i,4);
      }else{
       scene.players[i].handResult(0);
      }
      //scene.poker.checkMyHand(i,scene.players[i].currentCards());

         console.log('_________WINNER__________________'+ i +" +++++++++++++++++++++");
    }else{
      console.log('_________WINNERWWWWWWXXXX_RANDO ' + rando +  '_________________'+ i +" +++++++++++++++++++++");
      if(i== winP){
        scene.players[i].handResult(9);
       }else{
        scene.players[i].handResult(0);
       }
    }
    }

   
  scene.emitter.emit("HANDEVENT",'WINNERDONE');
   
  }
  setCommunityCards(){
    this.poker.setCommunityCards(this.communityCards);
  }
  showOdds(dk,sc){
// console.log("show odds:::: "+ sc.poker.getMyOdds());
 //   poker.showOdds();
    for(var i=0;i<9;i++){
      console.log('_____PLAYER NUMBER '+ i +" HAS +++++++++++++++++++");
      // sc.poker.checkMyHand(i, sc.players[i].currentCards());
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
