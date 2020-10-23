 var firebaseConfig = {
        apiKey: "YOURAPI",
        authDomain: "YOURAPP.firebaseapp.com",
        databaseURL: "YOURDATABASE.firebaseio.com",
        projectId: "YOUR PROJECT ID",
        storageBucket: "YOUR PROJECT ID.appspot.com",
        messagingSenderId: "YOUR SENDER ID",
        appId: "YOUR APP ID",
        measurementId: "YOUR MESUREMENT ID"
      };
    
        // Initialize Firebase
        var app = firebase.initializeApp(firebaseConfig);
        var db;
        //var app = firebase.initializeApp(firebaseConfig);
       db = firebase.firestore(app);
