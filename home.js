var userid;
var currentdate;
$(document).ready(function () {
  console.log("ready!");
  currentUser();
  currentdate = new Date();
  console.log(currentdate);
});

var newArray = [];
function currentUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.

      var uid = user.uid;
      userid = uid;
      var mobile = user.phoneNumber;
      $("#name").text(mobile);
      console.log(mobile);
      //  getTournaments();
      gamesData();
      getWallet();

    } else {
      window.location.href = "http://localhost:7000/signup.html";
    }
  });
}
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function getWallet() {
  var balRef = db.collection("Users").doc(userid);

  balRef.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc.data());
      userdata = doc.data();
      walletBalance = userdata.walletBalance;
      walletBalance = parseInt(walletBalance);
      $("[id=walletbalance]").text(walletBalance);


    } else {
      // doc.data() will be undefined in this case

    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}
function getTournaments(gameId) {
  var tourRef = db.collection("Tournaments");

  tourRef.where("gameId", "==", gameId).where("endTime", ">", currentdate).get().then(function (querySnapshot) {
    var data = [];
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots

      data.push(doc.data());

    });
    console.log(data);
    if (data.indexOf(data) === -1 && data.length) {
      $(".games").append('<div class="f1yhyggr"><div class="gamename"><img id = "gameIMG" class="gameImg" src=' + data[0].gameImg + ' alt="game card"><span class="game_name_txt">' + data[0].gameName + '</span></div><div class=' + data[0].gameName + ' </div></div>');
      for (var i = 0; i < data.length; i++) {
        var gamename = data[0].gameName;
        var endtime = data[i].endTime.toDate();
        //var endtime = moment(endtime).endOf('day').fromNow();
        //var currentTime= moment().format()
       // var endtime = moment(endtime).format("HH:mm");
        var endtime = moment(endtime).calendar();
        console.log(endtime);

        $("." + gamename + '').append('<a class="" href="http://localhost:7000/tournament.html?tournamentId=' + data[i].tournamentId + '"><div class="f1ma0gg7"><div class="contestCardDeposit500" style="display: flex; height: 100%; position: relative;"><div class="f1ylnkmr"><div class="fshmzbu">Prize</div><div class="f1wmjatj"><img class="fpliu47"src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><spanstyle="margin-left: 7px;">' + data[i].Prize + '</span></div></div><div class="f1tq6dag" style="left: 30%;"><div class="f1mvdm5l" style="padding-top: 3px;"><img class="f1hn91pk"src="https://static.gamezop.com/peach/assets/img/faceless-player.svg" alt=""><div class="f1omk9ww">' + data[i].joined + ' <span style="padding-left: 2px; padding-right: 2px;">/</span>' + data[i].maxLimit + ' </div></div><div class="f1mvdm5l" style="padding-left: 0px; padding-bottom: 0px;"><img class="f1n7oroy"src="https://static.gamezop.com/peach/assets/img/timer.svg" alt=""><div class="clock_img">Ends ' + endtime + '</div></div></div><div class="f1dfiwkb"><img class="fo34vq9" src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><span>' + data[i].entryFee + '</span></div></div></div><a>');
      }
      $('.demo').hide();
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

}
function gamesData() {
  var gameRef = db.collection("Games");

  gameRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var gameData = doc.data();
      var gameId = gameData.gameId;
      // console.log(gameData.gameId);
      getTournaments(gameId);
    });
   getChallenges();
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

}
function logout(){
  firebase.auth().signOut();
}
function getChallenges(){
  var gameRef = db.collection("Challenges");
  challengedata = [];
  gameRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      challengedata.push(doc.data());
      console.log(challengedata);
    });
    for(j=0;j<challengedata.length;j++){
      var gamename = challengedata[j].gameName;
      $("." + gamename + '').append('<a class="" href="http://localhost:7000/challenges.html?challengeId=' + challengedata[j].challengeId + '"><div class="f1ma0gg7"><div class="contestCardDeposit500" style="display: flex; height: 100%; position: relative;"><div class="f1ylnkmr"><div class="fshmzbu">Prize</div><div class="f1wmjatj"><img class="fpliu47"src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><spanstyle="margin-left: 7px;">' + challengedata[j].prize + '</span></div></div><div class="f1tq6dag" style="left: 30%;"><div class="f1mvdm5l" style="padding-top: 3px;"><img class="f1hn91pk"src="https://static.gamezop.com/peach/assets/img/faceless-player.svg" alt=""></div><div class="f1mvdm5l" style="padding-left: 0px; padding-bottom: 0px;"><img class="f1n7oroy"src="https://static.gamezop.com/peach/assets/img/timer.svg" alt=""><div class="clock_img">1-1 Challenge</div></div></div><div class="f1dfiwkb"><img class="fo34vq9" src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><span>' + challengedata[j].entryFee + '</span></div></div></div><a>');
    }
 
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
   
}


