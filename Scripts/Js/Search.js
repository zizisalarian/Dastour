$(document).ready(function() {

    var CustomOption = {
        nextButtonIcon: "/images/timeir_next.png"
, previousButtonIcon: "/images/timeir_prev.png"
, forceFarsiDigits: true
, markToday: true
, markHolidays: true
, highlightSelectedDay: true
, sync: true
    };

    kamaDatepicker($("input.datePiker.Fdate").attr('id'), CustomOption);
    kamaDatepicker($("input.datePiker.Tdate").attr('id'), CustomOption);


    $("#txtSearch").bind('keypress', function(e) {
        if (e.which == 13)
            $("#btnSearch").click()

    })
    $("li.Sort").on("click", function() {
        $(this).animate({ "margin-right": "-200" }, 1500, function() {

        });
        evt.stopPropagation();
        evt.preventDefault();

    });
    $("li.Sort").on("mouseleave", function() {
        $(this).animate({ "margin-right": "-40" }, 1500, function() {
        });
        evt.stopPropagation();
        evt.preventDefault();

    });
    $("li.Number").on("click", function() {
        $(this).animate({ "margin-right": "-290" }, 1500, function() {

        });
        evt.stopPropagation();
        evt.preventDefault();

    });
    $("li.Number").on("mouseleave", function() {
        $(this).animate({ "margin-right": "-40" }, 1500, function() {
        });
        evt.stopPropagation();
        evt.preventDefault();

    });
    $(".Text").bind('keypress', function(e) {
        if (e.which == 13)
            $(".SearchKey").click()

    })

    $("#btnClear").click(function() {
        $("input.Text").val("");
        $("input.datePiker").val("");
        $(".ComboText.OP").val("AND*");
        $(".ComboText.PageSize").val("50")
        $(".ComboText.Sort").val("no")
    });
    $(".menubarLabel").click(function() {

        $("#" + $(this).data("menu")).slideToggle("slow");




    });
    if ($(".Adval").val() == 1)
        $(".menubarLabel").click();

});