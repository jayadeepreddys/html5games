var userid;
var currentdate;
var mobile;
var battleId;
var challengeId;
var playerscore;
var opponentScore;
var mode;
var userName;
var gameData;
$(document).ready(function () {
  console.log("ready!");
  currentUser();
  currentdate = new Date();
  console.log(currentdate);
  let searchParams = new URLSearchParams(window.location.search);
  battleId = searchParams.get('battleId');
  mode = searchParams.get('mode');
  console.log(battleId);
  $(".afterBattle").hide();

});
function currentUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var mobile = user.phoneNumber;
         var phoneNumber = user.phoneNumber;
         var str1 = phoneNumber.substring(0,6);
         var str2 = phoneNumber.substring(9,13);
         var str3 = "XXX";
         userName = str1.concat(str3,str2)

      var uid = user.uid;
      userid = uid;
      mobile = user.phoneNumber;
      console.log(mobile);
      getWallet();
      if(!mode){
      checkStatus(battleId);
      $("#invite").show();
      $("#accept").hide();

      } 
      else {
      //  createBattle();
      $("#invite").hide();
      $("#accept").show();
      getData();
      }

    } else {
      window.location.href = "signup.html";
    }
  });
}
function getWallet() {
  var balRef = db.collection("Users").doc(userid);

  balRef.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc.data());
      userdata = doc.data();
      walletBalance = userdata.walletBalance;
      walletBalance = parseInt(walletBalance);
    } else {
      // doc.data() will be undefined in this case
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}
function getData(){
  var bRef = db.collection("Battles").doc(battleId);

  bRef.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc.data());
      gameData = doc.data();
    } else {
      // doc.data() will be undefined in this case
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}

function checkStatus(gameId) {
  console.log("Matching with a user");
  db.collection("Battles").doc(gameId)
    .onSnapshot(function (doc) {
      console.log(doc.data());
      var data = doc.data();
      var opponentId = data.opponent;
      var status = data.status;
      playerscore = data.Score;
      challengeId = data.challengeId;
      var gameUrl = data.gameUrl;
      console.log(gameUrl);
      if (opponentId) {
        console.log(" I am matched with a user. Proceed to play");
        $("#label_try").hide();
        $("#opponent").text('Friend Matched');
        opponentScore(opponentId);
      }
      if (opponentId && !playerscore) {
        window.location.href = gameUrl + '?battleId=' + gameId + '';
      }
     
      if (playerscore > 0) {
        $("#label").hide();
        $(".afterBattle").show();
        $("#load-wrapper").hide();
        $("#playerscore").text(playerscore);
        $("#tip").text('Once the opponent score is updated winner will be declared');
        $("#invite").hide();
        $("#accept").hide();

      }
    });
}
function createBattle(){
  if(walletBalance >= gameData.entryFee){
    var bRef =  db.collection('Battles');
        bRef.add(
          {
             
            'gameName':gameData.gameName,
            'entryFee': gameData.entryFee,
            'gameId': gameData.gameId,
            'timeStamp': new Date(),
            'challengeId' :gameData.challengeId,
            'userId': userid,
            'name': userName,
             'Prize': gameData.prize,
             'gameUrl': gameData.gameUrl,
             'opponent': battleId
          })
          .then(function(newRef) {
           var opponentId =  newRef.id;
           setOpponent(opponentId); 
           $("#accept").hide();
            
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
             
      }
      else{
        alert('Your wallet balance is low. Please recharge');
      }
       
  }

async function setOpponent(opponentId){
  var res =await db.collection('Battles').doc(battleId).update(
    {
      opponent: opponentId
    })
    .then(res=>{
      checkStatus(opponentId);
    })
}
function opponentScore(opponentId) {
  console.log("I am checking oponent score")
  db.collection("Battles").doc(opponentId)
    .onSnapshot(function (doc) {
      console.log(doc.data());
      var data = doc.data();
      opponentscore = data.Score;
      var name = data.name;
      $("#opponentname").text(name);
      if (opponentscore) {
        $("#opponentscore").text(opponentscore);
        declareWinner();
        //updateScores();
      }
    });

}

function declareWinner() {
  console.log(playerscore, opponentscore);
  if (playerscore > opponentscore) {
    $("#result").text("You Won");
    $("#tip").text('Hurray!! Keep winning');

  }
  if (playerscore < opponentscore){
    $("#result").text("You Lost");
    $("#tip").text('You shoud win this time! Try Again');
  }
  if (playerscore === opponentscore){
    $("#result").text("Game Draw");
    $("#tip").text('You were close! Try Again');
  }
}


function goToHome() {
  window.location.href = "home.html";

}
function playAgain() {
  window.location.href = 'challenges.html?challengeId=' + challengeId + '';

}