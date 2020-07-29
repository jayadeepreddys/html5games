(function ($) {
    
    $('.demo4').scratchCard({
        width: '300',
        height: '300',
        scratched: '40',
        coverImage: 'icons/cover-1.png',
        brushImage: 'scratchCart_Files/scratchCard_Icons/brush.png',
        inpopup: true,
        autoTrigger: false,
        triggerAfter: 1,
        triggerOn: "#popupopen2"
    });


/* 
     $(document).on('click', '.cyno-closeBtn', function (e) {
         alert("offer availed");

       /*  var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).parent().closest('div').find(".copycouponcode").text()).select();
        document.execCommand("copy");
        $(this).parent().closest('div').find(".myTooltip").html("Copied: " + $temp.val());
        $temp.remove(); 
    });  */
    $(document).keydown(function (e) { return 123 == e.keyCode ? !1 : e.ctrlKey && e.shiftKey && 73 == e.keyCode ? !1 : e.ctrlKey && 85 == e.keyCode ? !1 : 83 == e.keyCode && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? !1 : void 0 }), $(document).on("contextmenu", function (e) { e.preventDefault() });  


}(jQuery));