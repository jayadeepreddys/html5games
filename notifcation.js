var userid;
var currentday;
$(document).ready(function () {
    console.log("ready!");
    currentUser();
    
})
function currentUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            userid = uid;
            mobile = user.phoneNumber;
            UserNotifcation();
        } else {
            window.location.href = "signup.html";
        }
    });
}
function UserNotifcation(){
    console.log(userid);
var userNotifcation = db.collection("GameHistory");
userNotifcation.where("userId", "==", userid).get().then(function (querySnapshot) {
    var data = [];
    querySnapshot.forEach(function (doc) {
        data.push(doc.data());
    });
    console.log(data);
    if(data){
        for(let i=0;i<data.length;i++){
        var ondate = data[i].timeStamp.toDate();
        var ondate_day = moment(ondate).format("D");
        var ondate_month = moment(ondate).format("MMM");
        console.log(ondate_day, ondate_month);
        $(".main_order_div").append('<div class="order_history_box_main"><div class="date_div"><div class="date_day">'+ondate_day+'</div><div>'+ondate_month+'</div></div> <div class="game_img_div"></div><div class="game_img_sub_div"><div style="display: flex; flex-direction: row; align-items: center;"><div class="f16t7t75_notif"><img src="icons/notification.png" class="img_game_main_notif"></div> <div class="game_txt_notif">'+data[i].message+'</div></div></div><div class="div_display_result_notif"><div class="div_result_img"><div style="font-size: 0.9em;"></div><img class="cash_notif"src="icons/multiple-rupee-note.svg" alt=""><span class="result_in_number_notif" style="margin-left: 0px;">'+data[i].amount+'</span></div></div> </div>')
        }
    } 
    
})
}