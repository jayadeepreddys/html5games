var currentday;
$(document).ready(function () {
    console.log("ready!");
    currentUser();
});
function currentUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            userid = uid;
            mobile = user.phoneNumber;
            user_game_history(userid)
        } else {
            window.location.href = "http://localhost:7000/signup.html";
        }
    });
}
function user_game_history(userid) {
    var userhistory = db.collection("TournamentUser");
    userhistory.where("userId", "==", userid).get().then(function (querySnapshot) {
        var data = [];
        querySnapshot.forEach(function (doc) {
            data.push(doc.data());
        });
        console.log(data);
        display_user_games(data);
    })
}
function display_user_games(data) {
    for (i = 0; i < data.length; i++) {
        var ondate = data[i].timeStamp.toDate();
        var ondate_day = moment(ondate).format("D");
        var ondate_month = moment(ondate).format("MMM");
        console.log(ondate_day, ondate_month);
        //$(".main_order_div").append('<div class="order_history_box_main"><div class="date_div"><div class="date_day">' + ondate_day + '</div><div>' + ondate_month + '</div></div><a class="navigate_tid" href="http://localhost:7000/tournament.html?tournamentId='+data[i].tournamentId+'"><div class="game_img_div"></div> <div class="game_img_sub_div"><div style="display: flex; flex-direction: row; align-items: center;"><div class="f16t7t75"><img src="https://static.gamezop.com/H1WmafkP9JQ/s/square.png"class="img_game_main"></div><div class="game_txt">' + data[i].gameName + '</div></div></a></div>');
        
    }
   
}
