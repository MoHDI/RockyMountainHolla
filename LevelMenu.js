class LevelMenu extends Phaser.Scene {

  constructor(scene,menucount,menuwidth){
      super("LevelMenu");
    //#idea CHANGE MENU COUNT TO AN ARRAY LATER?
    this.scene = scene;
    this.menuCount = menucount;
      this.menuWidth = menuwidth;
  //  this.create();
    this.levelMenu = this;
    this.menu;
    // this.menuCount = 12;
    this.dogNames = [
      "Ace",
      "Beanie",
      "Beetle",
      "Bindi",
      "Bow Tie",
      "Carly",
      "Dotty",
      "Drifter",
      "Ducky",
      "Emilia",
      "Finch",
      "Ginger",
      "Goldie",
      "Grover",
      "Hammy",
      "Henrietta",
      "Isis",
      "Jarvis",
      "Jinxy",
      "Kepler",
      "Kit",
      "Lili",
      "Ann",
      "Lola",
      "Lyla",
      "Mamie",
      "Maxine",
      "Michelangelo",
      "Mikey",
      "Peyton",
      "Pigeon",
      "Pink",
      "Rhapsody",
      "River",
      "Roebling",
      "Roger",
      "Romeo",
      "Rudy",
      "Sancho",
      "Scruffy",
      "Siggy",
      "Simba",
      "Snow",
      "White",
      "Tag",
      "Aurthur",
      "Sampson",
      "Spencer",
      "Stinky",
      "Dog",
      "Topper"
    ]
    this.arrow_up;
    this.arrow_down;
    this.myMenuItems = [];
    this.pageCount=0;
    this.menuActive = false;

    }

  create(){
    // Setup listener
    // var rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
    // var graphics = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
    // // //
    //  graphics.fillRectShape(rect);
    this.emitter=EventDispatcher.getInstance();
    console.log("CREAT LEVEL MENUT")
    var labelStyle = { font: "16px courier", fill: "#000000", align: "center" };
    // var info = "LEVEL MENU: "
    // var label = this.scene.add.text(100, 30, info, labelStyle);
    var itemsWidexx = this.menuWidth-83/83;
    console.log(itemsWidexx);
    var itemsWide = 1;
    this.currentLevel=0;
    this.menu = this.scene.add.container(0,0);
    // this.menu.setScale(.32);
    var rowCount =itemsWide;
    var colCount =  Math.floor(this.menuCount/itemsWide);
    console.log("rows:"+ rowCount + " :cols:"+colCount);

      var tcount = 0;
    for(var i=0;i<rowCount;i++){
      for(var x=0;x<=colCount;x++){
        if(tcount<=this.menuCount){
          var dogtag = this.makeMenuItem({x:(100)+(x*200),y:285+i*227},tcount);


          this.myMenuItems.push(dogtag);

    //  this.menu.add(this.makeMenuItem({x:(234/2)+(x*185),y:185+i*227},tcount));

        tcount++;
      }
      }
    }

    this.menu.add(this.myMenuItems);
//       var circle = this.scene.add.circle((100)+(0*200),285+0*227 , 80, 0x878787,.25).setInteractive();
// circle.on('pointerdown', this.dogTagHit, circle);
this.arrow_up = this.scene.add.sprite(375,550,"ui_arrow_down").setInteractive();
this.arrow_down = this.scene.add.sprite(425,550,"ui_arrow_up").setInteractive();
    // button.on('pointerup', openExternalLink, this);
    this.arrow_up.rotation=Math.PI/2;
    this.arrow_down.rotation=Math.PI/2;
this.arrow_down.on('pointerdown', this.arrowDownHit, this);
this.arrow_up.on('pointerdown', this.arrowUpHit, this);
gsap.to(this.arrow_up, {alpha:0, duration:.75,ease: "sine"});
this.home_btn = this.scene.add.image(55,560,"home").setInteractive({ useHandCursor: true });
this.home_btn.setScale(.75);
  this.home_btn.on('pointerover', function(){ this.setScale(.85); });
  this.home_btn.on('pointerout', function(){ this.setScale(.75);});
  this.home_btn.on('pointerdown', function (pointer) {
// this.home_btn.destroy();

this.emitter.emit("CLOSEMENU");
  }, this);

  }
dogTagHit(value){
  this.currentLevel = value;
  this.emitter.emit("MENUCLICKED",{level:value})

  // gsap.to(this.myMenuItems, {y:"-=800",duration:1.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this],stagger: {
  //   from: "front",
  // amount:1.75
  //   }});

}
hideArrow(){

}

arrowDownHit(){

  if(!this.menuActive){
      gsap.to(this.arrow_up, {alpha:1, duration:.75,ease: "sine"});
    var max = (this.menuCount/4 );
      console.log(this.pageCount + ": "+ this.myMenuItems[0].x+" :"+max  + " ARROW DOWN");
    if(this.pageCount<max){
      this.pageCount++;
        if(this.pageCount==max)  gsap.to(this.arrow_down, {alpha:0, duration:.75,ease: "sine"});
        this.menuActive = true;
    // gsap.to(this.myMenuItems, {x:"-=800",duration:.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this],stagger: {
    //   from: "front",
    // amount:1.75
    //   }});
    gsap.to(this.menu, {x:"-=800", duration:.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this]});
  }else{
        gsap.to(this.arrow_down, {alpha:0, duration:.75,ease: "sine"});
  }
  }
}
arrowUpHit(){
  if(!this.menuActive){
  gsap.to(this.arrow_down, {alpha:1, duration:.75,ease: "sine"});
  var max =this.menuCount/4;
    console.log(this.pageCount + ": "+ this.myMenuItems[0].x+" : >>>>>>>>>>>> ARROW UP"+ max );
  if(this.pageCount>0){
    this.pageCount--;
    if(this.pageCount==0)  gsap.to(this.arrow_up, {alpha:0, duration:.75,ease: "sine"});
      this.menuActive = true;
  // gsap.to(this.myMenuItems, {x:"+=800", duration:.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this],stagger: {
  //   from: "front",
  // amount:1.75
  //   }});
    gsap.to(this.menu, {x:"+=800", duration:.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this]});
  }else{
      gsap.to(this.arrow_up, {alpha:0, duration:.75,ease: "sine"});
  }
}
}
setPos(x,y){
console.log(this.menu.y);
// gsap.to(this.myMenuItems, {y:300,duration:1.75,ease: "sine",onComplete:this.toggleActive,onCompleteParams:[this],stagger: {
//   from: "front",
// amount:1.75
//   }});
this.menu.x = x;
this.menu.y = y;
  }
  toggleActive(ob){
console.log(ob.menuActive);
    if(ob.menuActive){
      ob.menuActive=false;
    }
  }
  showMeItem(itemnum) {
    console.log("click" + itemnum);
   // this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
 }
  makeMenuItem(pos,zd){
var numplacementY = 20;
    var myZ = zd%100/10;
    console.log("remz: "+ myZ);
    var clickCount = 0;
    ///##TODO MAKE IT ABLE TO OFFSET THE Y
    var cont= this.scene.add.container(pos.x,pos.y);

    var menuBG = this.scene.add.image(0,0,"ui_level_bg").setInteractive({ useHandCursor: true });

      // menuBG.on('pointerdown', () => this.showMeItem(zd) );
      menuBG.on('pointerdown', () => this.dogTagHit(zd));
      //https://medium.com/tfogo/advantages-and-pitfalls-of-arrow-functions-a16f0835799e
      //###WHY THE ABOVE WORK AND NOT BELOW
      // menuBG.on('pointerdown', function(){this.showMeItem(zd);});

    // var menuData = {value:zd};
    // // menuBG.on('pointerdown', this.dogTagHit, this);
    // menuBG.on('pointerdown', this.dogTagHit, this);
    var myItems = [menuBG];

if(zd <10){
    for(var i=0;i<3;i++){
      // console.log("Add Number "+ i);
      var ran = Phaser.Math.Between(0,9);
      if(i<2){
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",0);
      }else{
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",zd);
      }
      myItems.push(num);
    }
  }else if(zd<100){
    for(var i=0;i<3;i++){
      // console.log("Add Number "+ i);
      if(i==0){
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",0);
      }else if(i==1){
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",Math.floor(zd/10));
      }else if(i==2){
          var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",zd%10);
      }
      myItems.push(num);
    }
  }else if(zd<1000){
    for(var i=0;i<3;i++){
      // console.log("Add Number "+ i);
      if(i==0){
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",Math.floor(zd/100));
      }else if(i==1){
        var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number", Math.floor(zd%100/10));
      }else if(i==2){
          var num = this.scene.add.sprite(-37+(i*36),numplacementY,"ui_level_number",zd%10);
      }
      myItems.push(num);
    }
  }
  var labelStyle = { font: "19px courier", fill: "#000000", align: "center", backgroundColor:"#ffffff"};

  var num = Phaser.Math.Between(0,this.dogNames.length);
    var dogName = this.dogNames[num];
// Phaser.Math.RND.pick(this.dogNames.length);
  var label = this.scene.add.text(-10, numplacementY+30, dogName, labelStyle);
  console.log("LLABEL:"+ label.width);
  label.x = -label.width/2;
  myItems.push(label);
    cont.add(myItems);

    // cond.add(label)
    // cont.setDepth(zd);
  //   var menuBG = this.scene.add.sprite(0,0,group);
  // streetitem.setScaleX = 2.5
  //   streetitem.setFrame(type);
  //     // this.streetitem.setDisplayOrigin(0,this.streetitem.height);
  //   streetitem.setDisplayOrigin((streetitem.width/2),streetitem.height+(size-30));
  //   streetitem.rotation =rot;
    return cont;
  }
  walk(){
  }
  update() {
    // dont do a thing for now.
    }
}
