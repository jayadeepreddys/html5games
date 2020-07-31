 var firebaseConfig = {
        apiKey: "AIzaSyCDMtEUQspGxiE_rR_Z1-v2MyMUr8MOVY8",
        authDomain: "moneygames-56fe2.firebaseapp.com",
        databaseURL: "https://moneygames-56fe2.firebaseio.com",
        projectId: "moneygames-56fe2",
        storageBucket: "moneygames-56fe2.appspot.com",
        messagingSenderId: "675519415495",
        appId: "1:675519415495:web:7b233b918172c299946ae2",
        measurementId: "G-XFX68V4K6K"
      };
    
        // Initialize Firebase
        var app = firebase.initializeApp(firebaseConfig);
        var db;
        //var app = firebase.initializeApp(firebaseConfig);
       db = firebase.firestore(app);
