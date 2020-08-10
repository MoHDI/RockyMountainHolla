class PokerMath{
    constructor(scene){
    this.scene = scene;
    this.communityCards = [];
    this.cardsValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
    this.cardsSuits = ["clubs", "diamonds", "spades", "hearts"];
    this.handsOrder = ["High Card", "Pair", "Double Pair", "Three of Kind", "Straight", "Flush", "Full House", "Four of Kind", "Straight Flush", "Royal Flush"];
        this.create();
      }
  
    create(){
  
      console.log("Poker Math");
    }

    getUnknownCards(){

    }
    setCommunityCards(cards){
        this.communityCards = cards;

    }
    /// PUZZLE WORK AROUND IS TO DETERMINE BEST 5 CARD HAND THEN RUN ALL POSSIBLE HANDS THROUGH IT. 
    checkMyHandFIX(playernum, hand){

        var myHand = [];
        for(var i=0;i<hand.length;i++){
            // myHand.push(this.communityCards[i]);
            var cardVal= this.getCardValue(hand[0]);
            var suit = this.getSuit(Math.floor((hand[0])/13));
           console.log("Card 1++++++++++++++"+ cardVal + "  of "+ suit)
           myHand.push([cardVal,suit]);
        }
        checkFiveCards();

    }
    checkFiveCards(hand){

    }
    checkMyHand(playernum, hand){
        
        var myHand = [];
        console.log("++++++++PLAYER "+ playernum +"++++++");
        console.log(this.communityCards);
           console.log(hand); 
           var cardVal= this.getCardValue(hand[0]);
            var suit = this.getSuit(Math.floor((hand[0])/13));
           console.log("Card 1++++++++++++++"+ cardVal + "  of "+ suit)
            cardVal= this.getCardValue(hand[1]);
            suit = this.getSuit(Math.floor((hand[1])/13));
           console.log("Card 2++++++++++++++"+  cardVal + "  of "+ suit )
          
           myHand.push(hand[1]);
           for(var i=0;i<this.communityCards.length;i++){
            myHand.push(this.communityCards[i]);
            console.log("Card" + i +" ++++++++++++++"+  this.getCardValue(this.communityCards[i]) + "  of "+ this.getSuit(Math.floor(this.communityCards[i]/13)));
           }
      console.log( this.getHandValue(myHand));
    }
    
    getHandValue(hand){
        //COUNT NUMBER OF SUIT IN HAND
        var diamondNum =0;
        var heartNum = 0;
        var clubNum = 0;
        var spadeNum = 0;
        var match =0;
        var straight = 0;
        var handString = "";
        var myCardValues = []
        var cardBroke = []
        for(var i=0;i<hand.length;i++){
            var suit = this.getSuitName(Math.floor(hand[i]/13));
            var cardVal = this.getCardValue(hand[i]);
            cardBroke.push([cardVal,suit]);
            myCardValues.push(cardVal);
         console.log("My hand is " + i +": "+ cardVal+ "  of "+ suit);
          if(suit =="Diamonds"){
              diamondNum++;
          }
         if(suit =="Hearts"){
                heartNum++;
            }
          if(suit =="Clubs"){
                clubNum++;
            }
         if(suit =="Spades"){
                spadeNum++;
            }
        }

        console.log("_________ _________"); 
        // console.log(myCardValues);
        myCardValues.sort((a,b)=>a-b);

        this.checkForPairs(myCardValues);
        // this.checkForStraight(myCardValues);
        // myCardValues.sort()

        // function(a, b){return a-b}
        console.log(myCardValues);
    
        console.log("_________ _________"); 
            if(diamondNum>=5){
                handString = " PLayer has a Diamond Flush"
            }
            if(heartNum>=5){
                handString = " PLayer has a Heart Flush"
            }
            if(clubNum>=5){
                handString = " PLayer has a Club Flush"
            }
            if(spadeNum>=5){
                handString = " PLayer has a Spade Flush"
            }
            console.log(" THIS PLAYER HAS " + diamondNum + " Diamonds");
       
        return handString;

    }
    checkForFlush(hand){

    }
    checkForPairs(hand){
         var newHand = hand;
         var myPairs = [];
         var pairCount =0;
        ///REMOVE ANY PAIRS  
        console.log("MULTIPLE CHECK ___________________________");
        for(var i =0;i<hand.length;i++){
            pairCount=0;
            for(var j=0;j<=hand.length;j++){
                if(hand[i]==hand[j] && i !=j){
                    newHand.splice(j,1);
                    pairCount++;

                    console.log(pairCount +"removed " +hand[j]);
                }
            }
            myPairs.push([hand[i],pairCount]);
          
        }

        console.log(myPairs);
        console.log(" YOU HAVE : " +pairCount + "pairs");
        console.log("PAIR COUNT  CHECK __________###############__");
    }
    checkForStraight(hand){
        var newHand = hand;
        ///REMOVE ANY PAIRS  
        console.log("STRAIGHT CHECK ___________________________");
        for(var i =0;i<hand.length;i++){
            for(var j=0;j<=hand.length;j++){
                if(hand[i]==hand[j] && i !=j){
                    newHand.splice(j,1);
                    console.log("removed " +hand[j]);
                }
            }
        }
        console.log(newHand);
        console.log("STRAIGHT CHECK __________###############__");
    }
    getCardValue(num){
        var cardVal = (num+1)%13;
        if(cardVal==0)cardVal = 13;
        return cardVal
    }
    getSuit(num){
        return num;
    }
    getSuitName(num){
     
        var suit = "----"
        if(num ==0 ){
            suit = "Diamonds";
        }else if(num ==1){
            suit = "Hearts";
        }else if(num ==2){
            suit = "Clubs";
        }else if(num ==3){
            suit = "Spades";
        }
        return suit;
    }


    getMyOdds(){
        var odds = "75%";
        return odds;
    }
    update() {
        //poker math
    }   
  }
  