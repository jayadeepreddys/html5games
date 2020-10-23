var userid;
var currentdate;
var scratchcard;
var currentday;
var currenthour;
var domain;
var showRewards = false;
$(document).ready(function () {
  console.log("ready!");
  currentUser();
  currentdate = new Date();
  currentday = currentdate.getDay();
  currenthour = currentdate.getHours();
  domain = window.location.hostname;
  console.log(domain);
  console.log(currentdate);
  console.log(currenthour);
 
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
      checkRewards();
      $(".three-block-item").hide();
    } else {
      window.location.href = "signup.html";
    }
  });
}
function checkRewards(){
      console.log("checking rewards")
      var startOfToday = new Date(); 
    startOfToday.setHours(0,0,0,0);
    var endOfToday = new Date(); 
    endOfToday.setHours(23,59,59,999);
    var rdata = [];
    db.collection("Rewards").where('timeStamp','>=',startOfToday).where('userId', '==' , userid)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          rdata.push(doc.data());
      });
      console.log(rdata.length);
      if(rdata.length > 0){
        $(".three-block-item").hide()
        showRewards = false;
      }
      else{
        $(".three-block-item").show()
        getOffer()
        showRewards = true;
      }
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}
function getOffer(){
  var oRef = db.collection("Config").doc("scratchcard");

  oRef.get().then(function (doc) {
    if (doc.exists) {
     var offerdata = doc.data();
     scratchcard = offerdata.offer; 
     console.log(scratchcard);
    } 
    if(scratchcard > 0){
      $(".copycouponcode").text("You Won Rs: " + scratchcard)
    }
    else{
      $(".copycouponcode").text("Better Luck Tomorrow")
    }
   
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}
$(document).on('click', '.cyno-closeBtn', function (e) {
  addPromo();

}); 
function addPromo(){
  if(showRewards){
  var rewardRef = db.collection("Rewards");
  rewardRef.add({
    userId: userid,
    reward: scratchcard,
    timeStamp: currentdate
})
.then(function() {
    console.log("Document successfully written!");
    checkRewards()
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
  }
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
  tourRef.where("gameId", "==", gameId).where("days", "array-contains", currentday).where("duration", ">", currenthour).where("domain", "==", domain).get().then(function (querySnapshot) {
 // tourRef.where("gameId", "==", gameId).where("endTime", ">", currentdate).get().then(function (querySnapshot) {
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
      //  var endtime = data[i].endtime;
       var endtime = data[i].duration - currenthour;
        var entryFee = data[i].entryFee;
        if(entryFee === 0){
          data[i].entryFee ='FREE'
        }
       // var endtime = moment(endtime).endOf('day').fromNow();
        //var currentTime= moment().format()
       // var endtime = moment(endtime).format("HH:mm");
       // var endtime = moment(endtime).calendar();
      // console.log(endtime);

        $("." + gamename + '').append('<a class="" href="tournament.html?tournamentId=' + data[i].tournamentId + '"><div class="f1ma0gg7"><div class="contestCardDeposit500" style="display: flex; height: 100%; position: relative;"><div class="f1ylnkmr"><div class="fshmzbu">Prize</div><div class="f1wmjatj"><img class="fpliu47"src="icons/multiple-rupee-note.svg" alt=""><spanstyle="margin-left: 7px;">' + data[i].Prize + '</span></div></div><div class="f1tq6dag" style="left: 30%;"><div class="f1mvdm5l" style="padding-top: 3px;"><img class="f1hn91pk"src="https://s3.ap-south-1.amazonaws.com/moneygames.app/images/faceless-player.svg" alt=""><div class="f1omk9ww">' + data[i].joined + ' <span style="padding-left: 2px; padding-right: 2px;">/</span>' + data[i].maxLimit + ' </div></div><div class="f1mvdm5l" style="padding-left: 0px; padding-bottom: 0px;"><img class="f1n7oroy"src="https://s3.ap-south-1.amazonaws.com/moneygames.app/images/timer.svg" alt=""><div class="clock_img">Ends ' + endtime + '</div></div></div><div class="f1dfiwkb"><img class="fo34vq9" src="icons/multiple-rupee-note.svg" alt=""><span>' + data[i].entryFee + '</span></div></div></div><a>');
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
  gameRef.where("domain", "==", domain).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      challengedata.push(doc.data());
      console.log(challengedata);
    });
    for(j=0;j<challengedata.length;j++){
      var entryFee = challengedata[j].entryFee;
      if(entryFee === 0){
        challengedata[j].entryFee ='FREE'
      }
      var gamename = challengedata[j].gameName;
      $("." + gamename + '').append('<a class="" href="challenges.html?challengeId=' + challengedata[j].challengeId + '"><div class="f1ma0gg7"><div class="contestCardDeposit500" style="display: flex; height: 100%; position: relative;"><div class="f1ylnkmr"><div class="fshmzbu">Prize</div><div class="f1wmjatj"><img class="fpliu47"src="icons/multiple-rupee-note.svg" alt=""><spanstyle="margin-left: 7px;">' + challengedata[j].prize + '</span></div></div><div class="f1tq6dag" style="left: 30%;"><div class="f1mvdm5l" style="padding-top: 3px;"><img class="battle_img_home"src="icons/battle_home.png" alt=""></div><div class="f1mvdm5l" style="padding-left: 0px; padding-bottom: 0px;"><div class="battle_txt_home">2 Player Battle</div></div></div><div class="f1dfiwkb"><img class="fo34vq9" src="icons/multiple-rupee-note.svg" alt=""><span>' + challengedata[j].entryFee + '</span></div></div></div><a>');
    }
 
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
   
}


