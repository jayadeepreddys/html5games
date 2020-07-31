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
var surl;
$(document).ready(function () {
  console.log("ready!");
  currentdate = new Date();
  console.log(currentdate);
  let searchParams = new URLSearchParams(window.location.search);
  battleId = searchParams.get('battleId');
  mode = searchParams.get('mode');
  console.log(mode);
  console.log(battleId);
  $(".afterBattle").hide();
  $("#accept").hide();
  $("#hide").hide();
  getMode();
  

 
});
currentUser();
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
    }

     else {
      window.location.href = "signup.html";
    }
  });
}
function getMode(){
  if(mode == 1){
    $("#invite").hide();
    checkStatus(battleId);
    generateUrl()
  

  } 
  if(mode == 2){
  //  createBattle();
  $("#invite").hide();
  console.log("Mode 2")
  $("#opponent").text('Join & Play With Freind');
  $("#retry-tip").text('Once accepted You will be taken to play the game');

  getData();
  }
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
      $("#accept").show();

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
        $("#accept").hide();
        $("#label_try").hide();
        $("#opponent").text('Friend Matched');
       // opponentScore(opponentId);
      }
      if (opponentId && !playerscore) {
        window.location.href = gameUrl + '?battleId=' + gameId + '';
      }
     
      if (playerscore > 0) {
        window.location.href = 'https://moneygames.app/battle.html?battleId=' + gameId + '';

      }
    });
}
function createBattle(){
  $("#accept").hide();
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
             'Prize': gameData.Prize,
             'gameUrl': gameData.gameUrl,
             'opponent': battleId,
             'mode': 2
          })
          .then(function(newRef) {
           var opponentId =  newRef.id;
           setOpponent(opponentId); 
            
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
function inviteFreind(){
  var str1= "https://wa.me/?text=Hey, I am playing this fun game. Click on this link and play with me "+surl;
  window.location.href = str1;
}

function generateUrl(){
  var string = encodeURIComponent("https://moneygames.app/friendbattle.html?battleId="+battleId+'&mode=2');
  var params = {
  "longDynamicLink": "https://mgame.page.link/?link="+string,
  "suffix": {
  "option": "SHORT"
  }
  }
  $.ajax({
  url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCDMtEUQspGxiE_rR_Z1-v2MyMUr8MOVY8',
  type: 'POST',
  data: JSON.stringify(params) ,
  contentType: "application/json",
  success: function (response) {
  surl  = response.shortLink;
  console.log(surl);
  $("#invite").show();
  },
  error: function () {
  alert("error");
  }
  });
  }