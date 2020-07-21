var userid;
var currentdate;
var mobile;
var amount=0;
var battleId;
var challengeId;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   currentdate = new Date();
   console.log(currentdate);
   let searchParams = new URLSearchParams(window.location.search);
   battleId = searchParams.get('battleId');
   console.log(battleId);
   $(".afterBattle").hide();
   
});
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
          userid = uid;
          mobile = user.phoneNumber;
         console.log(mobile);
         checkStatus();
         
        } else {
            window.location.href = "http://localhost:7000/signup.html";
        }
      });
}

function checkStatus(){
    console.log("Matching with a user");
    db.collection("Battles").doc(battleId)
    .onSnapshot(function(doc) {
      console.log(doc.data());
      var data = doc.data();
      var opponentId = data.opponent;
      var status = data.status;
      var score = data.Score;
      challengeId = data.challengeId;
      console.log(opponentId);
       if(opponentId){
         console.log(" I am matched with a user. Proceed to play");
         $("#opponent").text( 'Opponent Matched');
       }
       if(status === 0){
        console.log(" No player found");
        $("#opponent").text( 'No Opponent found. Try after sometime');
       }
       if(score > 0){
        $("#opponent").text( 'Game Completed. Waiting for Oponent score');
        $(".afterBattle").show();
        $("#load-wrapper").hide();
       }
    });
  }

function retryBattle(){
    db.collection('ChallengeQueue').doc(userid).set(
        {
          'challengeId' :challengeId,
          'timeStamp': new Date(),
          'userId': userid,
           'battleId': battleId
        })
        console.log("Added to Queue");
}