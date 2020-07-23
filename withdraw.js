var userid;
var currentdate;
var mobile;
var amount;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   currentdate = new Date();
   console.log(currentdate);
   $(".minamount").hide();   
   
});
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
          userid = uid;
          mobile = user.phoneNumber;
         console.log(mobile);
       //  getTournaments();
        // gamesData();
         getWallet();
         $(".pay_btn").hide();
        } else {
            window.location.href = "signup.html";
        }
      });
}

function setAmount(val){
    document.getElementById("walletInput").value = val;
    $(".pay_btn").show();
    amount = Number(val);
    console.log(amount);
    if(amount > walletBalance){
        $(".pay_btn").hide();
        alert("Amount Cannot Be more that wallet balance");
    }
}
function typeAmount(){
$("#walletInput").keyup(function(){
    amount = document.getElementById("walletInput").value;
    amount = Number(amount);
    if(amount<=walletBalance){
        $(".pay_btn").show();
    }
    else{
        $(".pay_btn").hide();
    }
    if(!amount){
        $(".pay_btn").hide();   
    }
    if(amount< 9){
        $(".pay_btn").hide();  
        $(".minamount").show();    

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
          $(".div_txt_step").text('Current Balance is: ' +walletBalance );
          document.getElementById("loader").style.display = "none";
        } else {
            // doc.data() will be undefined in this case
          
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function withdraw(){
    console.log(amount);
    amount = -amount;
    db.collection("Withdrawls").add({
        userId: userid,
        amount: amount,
        timeStamp: currentdate,
    })
    .then(function(docRef) {
        alert("Withdrwal Requested. Allow upto 24hrs to process payment");
        window.location.href = "home.html";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
   
}
