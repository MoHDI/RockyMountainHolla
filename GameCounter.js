class GameCounter{
    
    constructor( scene){

  this.parScene = scene;
  this.gameHistory= []
  this.txtLabel;
  this.top;
    this.create();
      }
  
    create(){
    var top = this.parScene.add.container(1024,13);
    var gc = this.parScene.add.image(0,0,"game_counter");
       gc.alpha =0;

    var labelStyle = { font: "24px courier", fill: "#000000",align: "right"};
    var labelStyle2 = { font: "12px courier", fill: "#000000",align: "right"};
    var st ="Hand : 00000";
    var label2 = this.parScene.add.text(0, -10, "Bad Beat: $37,890.00", labelStyle);
    var label = this.parScene.add.text(0, -10, st, labelStyle);
    label.x -= label.width;
    label2.x -=1000;
    
    this.txtLabel = label;
    top.add([gc,label,label2]);
    top.depth = 2000;
    this.top = top;
    

     // console.log("Player Made"  + this.playerName);
    }
    gameCount(txt){
        
        this.txtLabel.text = txt;   
    }
    setTxt(txt){
        this.txtLabel.text = txt;
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
  