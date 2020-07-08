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
        });
      
    });

}

  