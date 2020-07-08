$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   let searchParams = new URLSearchParams(window.location.search);
   let tournamentId = searchParams.get('tournamentId');
   console.log(tournamentId);
   getTournaments(tournamentId);
  
});
var newArray = [];
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
         console.log(uid);
       //  getTournaments();
       
         
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
  function getTournaments(id){
    db.collection("Tournaments").where("tournamentId", "==", id)
    .onSnapshot(function(querySnapshot) {
      
        querySnapshot.forEach(function(doc) {
           console.log(doc.data());
           var data = doc.data();
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
           if(data.joined == data.maxLimit){
            $(".gamecompleted").hide();
            $(".playbutton").hide();
            $(".tournamentfull").show();
           }
           else{
            $(".playbutton").show();
            $(".tournamentfull").hide();
            $(".gamecompleted").hide();
           }
           if(data.status == "Tournament Completed"){
            $(".playbutton").hide();
            $(".tournamentfull").hide();
            $(".gamecompleted").show();
           }
        });
       
    });

}

  