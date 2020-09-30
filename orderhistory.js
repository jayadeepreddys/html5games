var currentday;
var imageUrl;
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
            window.location.href = "signup.html";
        }
    });
}
function user_game_history(userid) {
    var userhistory = db.collection("TournamentUser");
    userhistory.where("userId", "==", userid).orderBy("timeStamp","desc").limit(100).get().then(function (querySnapshot) {
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
       // console.log(ondate_day, ondate_month);
        if(data[i].gameImg){
            imageUrl = data[i].gameImg;
        }else{
            imageUrl = "icons/music-and-multimedia.png"
        }
        $(".main_order_div").append('<div class="order_history_box_main"><div class="date_div"> <div class="date_day">'+ondate_day+'</div><div>'+ondate_month+'</div></div><div class="game_img_div"></div> <a href="tournament.html?tournamentId='+data[i].tournamentId+'" class="game_img_sub_div_ord"><div style="display: flex; flex-direction: row; align-items: center;"><div class="f16t7t75_ord"><img src="'+imageUrl+'" class="img_game_main_notif"></div><div class="game_txt_notif_ord">'+data[i].gameName+' Game </div></div></a><div class="div_display_result_notif"><div class="div_result_img"><div style="font-size: 0.9em;"></div><span class="result_in_number" style="margin-left: 0px;">'+data[i].Score+'</span></div><span class="div_entry_fee">Score</span> </div></div>')
    }
   
}
