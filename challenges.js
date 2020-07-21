var gameData;
var userid;
var phoneNumber;
var tournamentId;
var docid;
var userJoined = false;
var walletBalance;
var tokens;
var userTournament;
var userName;
var status;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   let searchParams = new URLSearchParams(window.location.search);
   challengeId = searchParams.get('challengeId');
   getChallenge(challengeId);
   playersOnline();
   
  
});

function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var mobile = user.phoneNumber;
          $("#name").text(mobile);
          userName = user.displayName;
         if(!userName){
         var phoneNumber = user.phoneNumber;
         var str1 = phoneNumber.substring(0,6);
         var str2 = phoneNumber.substring(9,13);
         var str3 = "XXX";
         userName = str1.concat(str3,str2)
         
         }
         
       //  getTournaments(tournamentId);
       //  getScores(tournamentId);
          var uid = user.uid;
          userid = uid;
          getWallet();
       //   checkUser();
         console.log(uid);
       //  getTournaments();
      // $(".f1am1fq4").hide();
       $(".cancelled").hide();
         
        } else {
            window.location.href = "http://localhost:7000/signup.html";
        }
      });
}

function getWallet(){
    var balRef = db.collection("Users").doc(userid);

    balRef.get().then(function(doc) {
        if (doc.exists) {
          console.log(doc.data());
          userdata = doc.data();
          walletBalance = userdata.walletBalance;
          walletBalance = parseInt(walletBalance);
          tokens = userdata.tokens;
          $("[id=walletbalance]").text( walletBalance );
          $('.demo').hide();


        } else {
            // doc.data() will be undefined in this case
          
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
function getChallenge(challengeId){
  var gameRef = db.collection("Challenges").doc(challengeId);

  gameRef.get().then(function(doc) {
      if (doc.exists) {
        console.log(doc.data());
        gameData = doc.data();
        var gamename = gameData.gameName;
        var gameImg = gameData.gameImg;
        var prize = gameData.prize;
        $(".flozei5").text( gamename );
        $("#prize").text( prize );
        $(".fnlldhj").attr("src",gameImg);
        $('.demo').hide();


      } else {
          // doc.data() will be undefined in this case
        
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  


function joinGame(){
  if(walletBalance >= gameData.entryFee){
   
        db.collection('Battles').doc(userid).set(
          {
             
            'gameName':gameData.gameName,
            'entryFee': gameData.entryFee,
            'gameId': gameData.gameId,
            'timeStamp': new Date(),
            'challengeId' :challengeId,
            'userId': userid,
            'name': userName
          })
         
            db.collection('ChallengeQueue').doc(userid).set(
              {
                'challengeId' :challengeId,
                'timeStamp': new Date(),
                'userId': userid
              })
              console.log("Added to Queue");
              checkStatus();
       
      }
      else{
        alert('Your wallet balance is low. Please recharge');
      }
   
  }

function checkStatus(){
  console.log("Matching with a user");
  db.collection("Battles").doc(userid)
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
function goToGame(){
    var url = data.gameUrl;
    var str1 = "?gameId="+userTournament;
   // var str2 = "&userId="+userid;
   // var str3 = "&tournamentId="+tournamentId;
   // var str4 = "&mobile="+phoneNumber;
    var finalurl = url.concat(str1);
   // console.log(finalurl);
    window.location.href= finalurl;
}
  function leaderBoard(tourdata){
  if(tourdata.length > 0){
    for(var i=0;i<tourdata.length;i++ )
  $(".minprizes").append('<div class="f1d4a11x"><div class="f1mi6qxz">'+tourdata[i].name+'</div><span class="fkhz08q" style="position: absolute; right: 15px;"><div class="fewc13u" style="right: 15px; width: 40px;"><span>'+tourdata[i].Score+'</span></div></span><span class="fkhz08q" style="position: absolute; right: 15px;"><div class="fewc13u" style="right: 15px; width: 177px;"><span>'+(i+1)+'</span></div></span></div>');
  }
  
} 
function playersOnline(){
  db.collection("ChallengeQueue").where("challengeId", "==", challengeId)
    .onSnapshot(function(querySnapshot) {
        var challenges = [];
        querySnapshot.forEach(function(doc) {
            challenges.push(doc.data().name);
        });
       var playersOnline = challenges.length;
       $("#playercount").text( playersOnline );
    });

}
function logout(){
  firebase.auth().signOut();
}
 


  