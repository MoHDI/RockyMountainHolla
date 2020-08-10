class Card{
    
    constructor(val, ob){

  this.destroyed=false;
  this.suit; 
  this.value = val;
  this.range = 0;
  this.refClip = ob;
  this.cardBack = 54;
  // this.feedbacktxt = txt;
  
    this.create();
      }
  
    create(){
        // for(var i=0;i<52;i++){
        //     this.deck.push(i);
        // }  
        // this.value = val;
        // this.suit = suit;
    //   console.log("Card Made" + this.value);
    }
    setPos(x,y){
    this.x = x;
    this.y = y; 
    }
    // shuffleCards(){
    //     Phaser.Utils.Array.Shuffle(this.deck);
    // }
   showCard(){
        // this.refClip.depth
        this.refClip.setFrame(this.value);

    }
    swapCard(id){
      this.value = id;
      // this.refClip.setFrame(id);
    }
    getRefClip(){
        return this.refClip;
    }
    getValue(){
        return this.value;
    }
    showOneCard(){

    }
    getCard(){
        return this.refClip;
        // return this.deck;
    }
    updatePositioning(size){
      // this.duckbody.setDisplayOrigin((this.duckbody.width/2),size);
      // this.duckeyes.setDisplayOrigin((this.duckbody.width/2),size);
      // this.duckmouth.setDisplayOrigin((this.duckbody.width/2),size);
    }
    setSpeed(speed){
        this.speed = speed;
      }
  
    update() {
   
     }
  }
  