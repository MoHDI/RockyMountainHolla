class DeckOfCards{
            constructor(scene){
                this.scene = scene;
                this.destroyed=false;
                this.deck  = [];
                this.deckContainer;
                this.range = 0;
                this.playerPos = [];
                this.cardStartX = 512;
                this.cardStartY =710;
                this.cardStartScale = .35; 
                this.cardBack = 53;
                this.currentHand = 2;
                this.mode;
                this.wonk;
                // this.cont = sc.add.container(0,0);
                    this.create();
                    }
            create(){
                var cardspace = 10;
                var handspace = 15;
                var xpos = 250;
                this.wonk =  new WonkHands();
                this.mode="WONKMODE";
                console.log("WONKY " + this.wonk.getDeck(this.currentHand));
                // for( var p=0;p<9;p++){
                //     this.playerPos.push([250,152+(152*p)]);
                // }
                // var fakeDeck=[]
                for(var i=0;i<52;i++){
                
                      this.deckContainer = this.scene.add.container(0,0);
                      var cardUI = this.scene.add.sprite(this.cardStartX,this.cardStartY, "cards");
                      cardUI.setScale(this.cardStartScale);
                      cardUI.setFrame(this.cardBack);
                      this.deck.push(new Card(i,cardUI));
                    //   fakeDeck.push(this.deck[i].value);
                  }
                 
              
                // console.log("FD=["+fakeDeck+"]");     
            console.log("Deck Made");
            }
            setPos(x,y){
            this.deckContainer.x = x;
            this.deckContainer.y = y;
            }
            
            wonkShuffle(){
                // this.currentHand =0;
               
                console.log("CURRENT HAND : "+ this.currentHand + " ::: " + this.wonk.getDeck(this.currentHand));
                
                for(var i=0;i<52;i++){
                this.deck[i].swapCard(this.wonk.getDeck(this.currentHand)[0][i]);
                this.deck[i].getRefClip().depth =1200+ i;
                }
                var handAction = [this.wonk.getDeck(this.currentHand)[1],this.wonk.getDeck(this.currentHand)[2],this.wonk.getDeck(this.currentHand)[3]];
                this.scene.setHandAction( handAction);
                this.currentHand++;
                if(this.currentHand>=6){
                    this.mode = "RANDO";
                }
            }
            getMode(){
                return this.mode;
            }
            shuffleCards(nn){
                // this.mode = "GET";
                console.log("THIS MODE"+ this.mode);
                if(this.mode == "WONKMODE" ){
                    this.wonkShuffle();
                   return;
                }
                // console.log("dd"+nn+"=["+deck+"]");
                var fakeDeck = [];
                Phaser.Utils.Array.Shuffle(this.deck);
                for(var i=0;i<52;i++){
                 this.deck[i].getRefClip().depth =200+ i;
                //  console.log(this.deck[i].value);
                //  fakeDeck.push(this.deck[i].value);
                  };
                //   console.log("FD"+nn+"=["+fakeDeck+"]");
            }
       
            offTheTop(){
                /// return the card on the top of the deck... throw it into position. 
            }
            getCard(val){
                // console.log(this.deck[val].getRefClip())
               var card = this.deck[val];
               card.depth =1000 -val ;
              return card;
            }
            showOneCard(val){
                // console.log("show one card " + this.deck[val].getValue());
                // console.log("show one " + val);
                var card = this.deck[val].getValue()
              return card;
            }
            showTheCard(val){
                // console.log("show the card" + val);
                // this.deck
                this.deck[val].showCard();
                
            }
            dealOneCard(player){
               // player
            }
            getCards(){

                return this.deck;
            }
            updatePositioning(size){
            // this.duckbody.setDisplayOrigin((this.duckbody.width/2),size);
            // this.duckeyes.setDisplayOrigin((this.duckbody.width/2),size);
            // this.duckmouth.setDisplayOrigin((this.duckbody.width/2),size);
            }
            setSpeed(speed){
                this.speed = speed;
            }
            scoopDeck(){
                console.log("SCOOP DECK");
                for(var i=0;i<26;i++){
                    this.deck[51-i].getRefClip().setFrame(this.cardBack);
                    gsap.to( this.deck[51-i].getRefClip() , {x:this.cardStartX,y:this.cardStartY,rotation:Math.PI*2,scaleX:this.cardStartScale,scaleY:this.cardStartScale, duration: 1,delay:.1*(i/2)});
    
                    }
            }
            update() {
        
            }
  }
  