$(function() {
    $("div[id^='section-part'").click(function() {
        ShowOrHideBoxContent(this);
    });

    function ShowOrHideBoxContent(btn) {
        var id = $(btn).attr("id");
        if ($(btn).hasClass("current")) {
            $(btn).removeClass("current");
            $("." + id).hide(500)
        } else {
            $(btn).addClass("current");
            $("div[class*='section-part']").hide();
            $("." + id).show(500)
        }
    }
});