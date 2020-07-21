var userid;
var currentdate;
var mobile;
var amount=0;
var battleId;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   currentdate = new Date();
   console.log(currentdate);
   let searchParams = new URLSearchParams(window.location.search);
   battleId = searchParams.get('battleId');
   console.log(battleId);
   
   
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
      console.log(opponentId);
       if(opponentId){
         console.log(" I am matched with a user. Proceed to play");
       }
    });
  }