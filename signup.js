
$( document ).ready(function() {
    console.log( "ready!" );
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    $("#wrapper").hide();
    currentUser();
});
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
         
          var uid = user.uid;
         console.log(uid);
         window.location.href = "http://localhost:7000/home.html";
        } else {
            
        }
      });
}


function loadRecaptcha() {
   // alert("Load recaptcha");
   $("#phone_number").hide();
   $(".otpbutton").hide();
   $(".opposite-btn1").hide();


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
    var phoneNumber = "+91" + phone;
    console.log(" I have reched authentication");
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("send otp");
          $(".wrapper").hide();
          $("#wrapper").show();
          window.confirmationResult = confirmationResult;
          optVerify()
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
    var second = document.getElementById('2').value;
    var third = document.getElementById('3').value;
    var fourth = document.getElementById('4').value;
    var fifth = document.getElementById('5').value;
    var sixth = document.getElementById('6').value;
    var code = first.concat(second, third, fourth, fifth,sixth);
    console.log(code);
    window.confirmationResult.confirm(code).then(function (result) {
      // User signed in successfully.
      var user = result.user;
      console.log(user);
      window.location.href = "http://localhost:7000/home.html";
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
function optVerify(){
  
  
    var body = $("body");
  
    function goToNextInput(e) {
      var key = e.which,
        t = $(e.target),
        sib = t.next("input");
  
      if (key != 9 && (key < 48 || key > 57)) {
        e.preventDefault();
        return false;
      }
  
      if (key === 9) {
        return true;
      }
  
      if (!sib || !sib.length) {
        sib = body.find("input").eq(0);
      }
      sib.select().focus();
    }
  
    function onKeyDown(e) {
      var key = e.which;
  
      if (key === 9 || (key >= 48 && key <= 57)) {
        return true;
      }
  
      e.preventDefault();
      return false;
    }
  
    function onFocus(e) {
      $(e.target).select();
    }
  
    body.on("keyup", "input", goToNextInput);
    body.on("keydown", "input", onKeyDown);
    body.on("click", "input", onFocus);
  };
  