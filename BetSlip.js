class BetSlip{
    
    constructor( cont,scene){

  this.parScene = scene;
    this.slip = cont;
    this.betSlip;
    this.infoSlip;
    this.create();
      }
  
    create(){
//    this.betSlip =this.parScene.add.newCo     
  var rect = new Phaser.Geom.Rectangle(0, 0, 1024, 768);
  var graphics = this.parScene.add.graphics({ fillStyle: { color: 0xFF44FFF } });
   graphics.fillRectShape(rect);


  var winCoin= this.parScene.add.sprite(920,728, "win_coins").setInteractive({ useHandCursor: true });
  winCoin.on('pointerover', function(){ this.setScale(2.2); });
  winCoin.on('pointerout', function(){ this.setScale(2);});
  winCoin.on('pointerdown', () =>   this.showBetScreen(this));
   winCoin.alpha = 1;
   winCoin.scaleX = winCoin.scaleY = 2;
   winCoin.setFrame(19);
   winCoin.depth = 5000;
//   this.parScene.add([winCoin]);
var infoCoin= this.parScene.add.sprite(985,728, "win_coins").setInteractive({ useHandCursor: true });
infoCoin.on('pointerover', function(){ this.setScale(2.2); });
infoCoin.on('pointerout', function(){ this.setScale(2);});
infoCoin.on('pointerdown', () =>   this.showInfoScreen(this));
infoCoin.alpha = 1;
infoCoin.scaleX = infoCoin.scaleY = 2;
infoCoin.setFrame(20);
infoCoin.depth = 5000;


    var bbs=this.parScene.add.image(500,(768/2)+150,"betSlip");
    var odds=this.parScene.add.image(1024/2,768/2,"theOdds");
    
    this.betSlip = bbs;
    this.betSlip.depth = 4000;
    this.infoSlip = odds;
    this.slip.alpha = 0;
    this.betSlip.alpha =0;
   this.slip.add([graphics,this.infoSlip]);
      
    }
   
    showBetScreen(scene){
        if(this.betSlip.alpha ==1){
            this.betSlip.alpha = 0;
        
        }else{
            this.betSlip.alpha = 1;
        }
        console.log(" SHOW THAT BEST SCREEN ");
      }
      showInfoScreen(scene){
        if(this.infoSlip.alpha ==1){
            this.infoSlip.alpha = 0;
           scene.slip.alpha = 0;
        }else{
            scene.slip.alpha = this.infoSlip.alpha = 1;
        }
        console.log(" SHOW THAT BEST SCREEN ");
      }
    getPosition(){
        
    }
    updatePositioning(size){
 
    }
 
  
    update() {
   
     }
  }
  