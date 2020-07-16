var userid;
var currentdate;
var options = {
    "key": "rzp_test_EyGa0zcq3FhVfv", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9912369903"
    },
    "theme": {
        "color": "#F37254"
    }
};
var rzp1 = new Razorpay(options);
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
        var mobile = user.phoneNumber;
         console.log(mobile);
       //  getTournaments();
        // gamesData();
       //  getWallet();
         
        } else {
            window.location.href = "http://localhost:7000/signup.html";
        }
      });
}


function goPay(){
        rzp1.open();
      
    
}

   
