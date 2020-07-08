$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
  
});
var newArray = [];
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
         console.log(uid);
       //  getTournaments();
         gamesData();
         
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
 function getTournaments(gameId){
    var tourRef = db.collection("Tournaments");

tourRef.where("gameId", "==", gameId).get().then(function(querySnapshot) {
    var data = [];
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        
        data.push(doc.data());
       
    });
    console.log(data);
    $( ".f1yhyggr" ).append( '<img id = "gameIMG" src="https://androidcommunity.com/wp-content/uploads/2016/02/featured-stack.jpg" alt="game card"><div class="gamename">'+data[0].gameName+'</div><div class='+data[0].gameName+' </div>' );
    if(data.indexOf(data) === -1 && data.length){
 //   newArray.push(data);
    //  console.log(newArray);
    for(var i = 0; i < data.length;i++){
        var gamename = data[0].gameName
      $("."+gamename+'').append('<div class="f1ma0gg7"><div class="contestCardDeposit500" style="display: flex; height: 100%; position: relative;"><div class="f1ylnkmr"><div class="fshmzbu">Prize</div><div class="f1wmjatj"><img class="fpliu47"src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><spanstyle="margin-left: 7px;">'+data[i].Prize+'</span></div></div><div class="f1tq6dag" style="left: 37%;"><div class="f1mvdm5l" style="padding-top: 10px;"><img class="f1hn91pk"src="https://static.gamezop.com/peach/assets/img/faceless-player.svg" alt=""><div class="f1omk9ww">'+data[i].joined+' <span style="padding-left: 2px; padding-right: 2px;">/</span>'+data[i].maxLimit+' </div></div><div class="f1mvdm5l" style="padding-left: 8px; padding-bottom: 5px;"><img class="f1n7oroy"src="https://static.gamezop.com/peach/assets/img/timer.svg" alt=""><div class="clock_img">'+data[i].starttime+'-'+data[i].endtime+'</div></div></div><a href="http://localhost:7000/tournament.html?tournamentId='+data[i].tournamentId+'"><div class="f1dfiwkb"><img class="fo34vq9" src="https://static.gamezop.com/peach/assets/img/multiple-rupee-note.svg" alt=""><span>'+data[i].entryFee+'</span></div></a></div></div>');
    }
      
    } 
}).catch(function(error) {
    console.log("Error getting document:", error);
});
   
}
function gamesData(){
    var gameRef = db.collection("Games");

    gameRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
             var gameData = doc.data();
             var gameId = gameData.gameId;
            // console.log(gameData.gameId);
             getTournaments(gameId);
        });
       
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
       
}


