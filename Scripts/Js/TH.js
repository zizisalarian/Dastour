$(document).ready(function() {
    var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    $(document).delegate('.SearchReasult ul li', 'click', function() {

        ShowTree($(this).children("input").val())
    });
    function ShowTree(TermID) {
        $.ajax({
            datatype: "html",
            url: "/Thesaurus/Data",
            data: { tid: TermID },
            success: function(data) {

                if (data.length > 0)
                    $(".irTreeContainer").replaceWith(data)
                $("li[data-id=" + TermID + "] a").first().addClass("selected")



            }
        });


    }

    $(document).delegate('.hc', 'click', function() {
        var obj = $(this)
        //alert("asas")
        if ($(this).has("ul").length > 0) {
            //  alert("hasu")
            if (obj.attr('aria-expanded') == "true") {
                //  alert(obj.data("id"))
                obj.children("ul").slideUp("normal");
                obj.attr('aria-expanded', 'false');



            }
            else {
                //  alert("now show")
                obj.children("ul").slideDown("normal");
                obj.attr('aria-expanded', 'true');


            }
        }
        else {

            $.ajax({
                datatype: "html",
                url: "/Thesaurus/Data",
                data: { tcid: $(this).data("id") },
                success: function(data) {

                    if (data.length > 0)

                        obj.append(data);
                    obj.children("ul").slideDown("normal");
                    obj.attr('aria-expanded', 'true');





                }
            });

        }

        evt.stopPropagation();
        evt.preventDefault();



    });
    $(document).delegate("input:checkbox", "click", function() {
        evt.stopPropagation();
        evt.preventDefault();

    });
    $("#thSearch").on('keypress', function(e) {


        if (e.which == 13) {

            e.stopPropagation();
            e.preventDefault();
            return
        }
    });

    $("#thSearch").on('keyup', function() {


        var q = $(this).val();
        if (q.length < 2)
            return


        delay(function() {

            $.ajax({
                datatype: "html",
                url: "/Thesaurus/Data",
                data: { query: q },
                success: function(data) {

                    if (data.length > 0)
                        $(".SearchReasult").replaceWith(data)
                }
            });
        }, 500);



    });


    $("#btnSelectedSearch").on('click', function() {

        var SearchLink = "/Search/?kl=";
        var selected = "";
        $("input:checked").each(function() {

            selected = selected + $(this).val() + ","


        });

        if (selected.length == 0)
            return
        SearchLink = SearchLink + selected;

        var win = window.open(SearchLink)
        if (win)
            win.focus()
        else
            window.location.href = SearchLink



    });


    $('.TableCell.Search').prepend('<label for="customToggler" class="customToggler"> <input type="checkbox" id="customToggler"/> </label>')

// function goto(link){
//     let url = window.location.origin
//     window.location.href = url + "#" + link
// }

    $('.SearchReasult ul li').on('click' , (e)=>{
        console.log(e.target);
            location = "#ShowTree";
    })
    $(window).scroll(function(){
        $('body').toggleClass('scrolled', $(this).scrollTop() > 100);
    });
    $('body').append('<a href="#" class="goup"><i class="fa fa-bars" aria-hidden="true"></i></a>')

});