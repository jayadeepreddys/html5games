
$( document ).ready(function() {
    console.log( "ready!" );
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    $("#wrapper").hide();
    currentUser();
    button_disable();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )     
{
  console.log("on mobile");

}
 else {
   alert("Demo App only works on Mobile Devices. Try from a mobile deivice")
  var url = "https://moneygames.app/";    
   $(location).attr('href',url);
 }
});
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
         console.log(uid);
         window.location.href = "home.html";
        } else {
            
        }
      });
}


function loadRecaptcha() {
   // alert("Load recaptcha");
   $("#phone_number").hide();
   $(".otpbutton").hide();
   $(".opposite-btn1").hide();
   $("#select_country").hide();


    var phone = document.getElementById('phone_number').value;
   // alert(phone);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    if (window.recaptchaVerifier) {
        console.log("Recaptch verified");
    authentication(phone);
    }
    else{
       $("#phone_number").show();
       $(".otpbutton").show();
       $(".opposite-btn1").show();
    }
  }

  function authentication(phone) {
      
   // var phoneNumber = phone;
    var appVerifier = window.recaptchaVerifier;
    var countryCode = document.getElementById('select_country').value;
    console.log(countryCode);
    var phoneNumber = countryCode + phone;
    console.log(phoneNumber);
    console.log(" I have reched authentication");
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("send otp");
          $(".wrapper").hide();
          $("#wrapper").show();
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          // Error; SMS not sent
          console.log(error);
          $(".wrapper").show();
          $("#wrapper").hide();
          // ...
        });

  }
  function enterOTP(){
    var first = document.getElementById('1').value;
    var code = first;
    console.log(code);
    window.confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user);
      window.location.href = "home.html";
      // ...
    }).catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
      alert(error);
    });
  }

  function reload(){
    location.reload();
  }

   function button_disable(){
   $('#phone_number').keyup(function () {
      if ($(this).val() == '') {
          $('.otpbutton').prop('disabled', true);
      } else {
          $('.otpbutton').prop('disabled', false);
      }
  });
  } 
 


  