var userid;
var currentdate;
var mobile;
var amount=0;
$( document ).ready(function() {
    console.log( "ready!" );
   currentUser();
   currentdate = new Date();
   console.log(currentdate);
   
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
       //  getWallet();
         
        } else {
            window.location.href = "signup.html";
        }
      });
}

function setAmount(val){
    document.getElementById("walletInput").value = val;
}

function goPay(){
    amount = document.getElementById("walletInput").value;
  //  Razor pay payment gateway
  if(amount){
    var options = {
        "key": "rzp_test_EyGa0zcq3FhVfv", // Enter the Key ID generated from the your razorpay Dashboard
        "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "description": "Recharge",
        "handler": function (response){
            capturePayment(response);
           // alert(response.razorpay_payment_id);
          //  alert(response.razorpay_order_id);
          //  alert(response.razorpay_signature)
        },
        "prefill": {
            "contact": mobile
            
        },
        "theme": {
            "color": "#3e51b5"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  else{
      alert("enter amount");
  }    
    
}

function capturePayment(response){
    if(response){
    console.log(response);
    amount = Number(amount);
    db.collection("Payments").add({
        userId: userid,
        amount: amount,
        timeStamp: currentdate,
        paymentId: response.razorpay_payment_id
    })
    .then(function(docRef) {
        alert("Money Added To Your Wallet");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
    else{
        alert("Payment Failed.Please Retry");
    }
}

   
