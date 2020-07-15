var data;
var userid;
var phoneNumber;
var tournamentId;
var docid;
var userJoined = false;
var walletBalance;
var tokens;
var userTournament;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   let searchParams = new URLSearchParams(window.location.search);
   tournamentId = searchParams.get('tournamentId');
   console.log(tournamentId);
   
  
});

function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         phoneNumber = user.phoneNumber;
         phoneNumber = phoneNumber.slice(3);
         docid = phoneNumber.concat(tournamentId);
         
         getTournaments(tournamentId);
          var uid = user.uid;
          userid = uid;
          getWallet();
          checkUser();
         console.log(uid);
       //  getTournaments();
       
         
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
          tokens = userdata.tokens;
          $("[id=walletbalance]").text( walletBalance );
         


        } else {
            // doc.data() will be undefined in this case
          
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
function checkUser(){
    var docRef = db.collection("TournamentUser");
    docRef.where("tournamentId", "==", tournamentId).where("userId", "==", userid).get().then(function(querySnapshot) {
      var data = [];
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if(doc.exists){
          userTournament = doc.id;
          }
          data.push(doc.data());
         
      });
      if (data.length >0) {
           userJoined = true;
           $(".playbutton").show();
           $(".joinbutton").hide();
        } else {
            // doc.data() will be undefined in this case
           userJoined = false;
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
function getTournaments(id){
    db.collection("Tournaments").where("tournamentId", "==", id)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           console.log(doc.data());
           data = doc.data();
          // $(".tournamentfull").hide();
           //$(".playbutton").hide();
         //  $(".gamecompleted").hide();
           $(".fnlldhj").attr("src",""+data.gameImg+"");
           $(".flozei5").replaceWith( ""+data.gameName+"" );
           $(".status").replaceWith( ""+data.status+"" );
           var x = document.getElementsByClassName("f5g9r1v");
          console.log(x.length);
           if(x.length==0){
           $(".prize").append( '<div class="f5g9r1v">'+data.Prize+'</div>' );
           }
           else{
            $(".f5g9r1v").hide();
            $(".prize").append( '<div class="f5g9r1v">'+data.Prize+'</div>' );
           }
           $(".playercount").append( '<div class="f5g9r1v">'+data.joined+'<span style="margin: 0px 3px;">/</span>'+data.maxLimit+'</div>' );
           if(userJoined){
            $(".playbutton").show();
            $(".joinbutton").hide();
            
          }
           else{
            $(".playbutton").hide();
            $(".joinbutton").show();
        }
        });
    
       
    });
    $('.demo').hide();

}

function joinGame(){
  if(walletBalance >= data.entryFee){
    db.collection('TournamentUser').add(
        {
           
          'gameName':data.gameName,
          'entryFee': data.entryFee,
          'gameId': data.gameId,
          'timeStamp': new Date(),
          'tournamentId' :data.tournamentId,
          'userId': userid,
          'Score': 0
        })
      checkUser();
      }
      else{
        alert('Your wallet balance is low. Please recharge');
      }
   
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



  