$(document).ready(function () {
    $(document).delegate('.AddNode', 'click', function (e) {
        e.stopImmediatePropagation();


        var opline = $(this).parents(".opline")

        var id = $(this).parent(".LCItem").attr("id")
        $(".DataForm").remove()
        opline.append("<div class='DataForm'>\
            <div class= 'DataForm Row' ><input type='radio' id='nodetypeC' name='nodetype' value='Child' checked='true'/><label for='nodetypeC'>افزودن فرزند</label><input id='nodetypeB' type='radio' name='nodetype' value='Brother' /><label for='nodetypeB'>افزودن برادر</label>\
            <div class= 'DataForm Row' ><input id='TanghihiN' type='radio' name='Tanghih' value='0' checked='true' /><label for='TanghihiN'>غیرتنقیحی</label><input type='radio' id='Tanghihi' name='Tanghih' value='1' /><label for='Tanghihi'>تنقیحی</label>\
            <div class= 'DataForm Row' ><input type='text' id='txtlabel' class='txtlabel' placeholder='عنوان' />\
            </div></div >\
            <div class='DataForm Row'><div class= 'EditorControl' data-control='editor' data-originhtml='' data-id='" + id + "'> <div id='editor' class='editor' ></div> <button id='btnSaveNode' class='wiki SaveNode' type='button'>ذخیره</button></div >\
                </div></div></div >");
        createEditor("")

    });
    $(document).delegate('input[type=radio][name=effecttype]', 'change', function (e) {
        e.stopImmediatePropagation();

        switch ($(this).val()) {
            case 'effective':
                $(".txtRelatedID").removeAttr("placeholder")
                $(".txtRelatedID").attr("placeholder", "شماره اثرپذیر وارد شود")
                break;
            case 'affected':
                $(".txtRelatedID").removeAttr("placeholder")
                $(".txtRelatedID").attr("placeholder", "شماره اثرگذار وارد شود")
                break;
            default:
                $(".txtRelatedID").attr("placeholder", "شماره اثرپذیر وارد شود")
        }




    });
    $(document).delegate('.AddRelation', 'click', function (e) {
        e.stopImmediatePropagation();

        var opline = $(this).parents(".opline")
        var id = $(this).parent(".LCItem").attr("id")
        $(".DataForm").remove()

        opline.append("<div class='DataForm'>\
            <div class= 'DataForm Row'><input type='radio' id='effecttypeE' name='effecttype' value='effective' checked='true'/><label for='effecttypeE'>این قانون بر قانونی که شماره آن در پایین درج شود اثر می‌گذارد</label><br><input id='effecttypeA' type='radio' name='effecttype' value='affected' /><label for='effecttypeA'>این قانون از قانونی که شماره آن در پایین درج شود اثر می‌پذیرد </label></div>\
            <div class= 'DataForm Row'><select id='relationtype' /><input id='txtRelatedID' class='txtRelatedID' type='text' placeholder='شماره اثرپذیر وارد شود '> </div>\
            <div class='DataForm Row'><button id='btnSaveRelation' class='SaveRelation SaveNode' type='button'>ثبت رابطه</button></div >\
                </div></div></div >");

        $.ajax({
            datatype: "html",
            type: "POST",
            url: "/DataSR/Relationtype.ashx",
            success: function (data) {
                if (data) {

                    $("#relationtype").html(data)

                }
            }

        });
    });
    $(document).delegate('.AddRelationEslah', 'click', function (e) {
        e.stopImmediatePropagation();

        var opline = $(this).parents(".opline")
        var id = $(this).parent(".LCItem").attr("id")
        $(".DataForm").remove()

        opline.append("<div class='DataForm'>\
            <input id='txtRelatedID' class='txtRelatedIDAutoLoad' type='text' placeholder='شماره قانون مورد اصلاح'> </div>\
            <div class= 'DataForm Row' ><input type='text' id='txtlabel' class='txtlabel' placeholder='عنوان' />\
            </div></div >\
            <div class='DataForm Row'><div class= 'EditorControl' data-control='editor' data-originhtml='' data-id='" + id + "'> <div id='editor' class='editor' ></div> </div >\
            <div class='DataForm Row'><button id='btnSaveEslah' class='SaveEslah SaveNode' type='button'>ثبت اصلاحیه</button></div >\
                </div></div></div >");
        createEditor("")

    });
    $(document).delegate('#btnSaveEslah', 'click', function (e) {
        e.stopImmediatePropagation();
        var editor = $(this).parents(".opline").find(".editor")

        var form = $(this).parents(".opline")



        var obj = jQuery("<input type='hidden' ></input>")
        obj.data("idLaw", form.data("id"))
        obj.data("CurrentIdLaw", form.data("id"))
        obj.data("idRelated", form.find("#txtRelatedID").val())
        obj.data("RelationType", 2);
        obj.data("editedLabel", form.find("#txtlabel").val())

        obj.data("editedContext", editor.froalaEditor('html.get'))
        SaveEslah(obj)



    });
    $(document).delegate('.txtRelatedIDAutoLoad', 'keyup', function (e) {
        e.stopImmediatePropagation();
        var id = $(this).val()
        var str = ""
        if (e.ctrlKey && e.keyCode == 13)
            $.ajax({
                datatype: "json",
                type: "POST",
                url: "/DataSR/lawManagerHandler.ashx",
                data: { Do: 'GetLawText', idLaw: id },
                success: function (data) {
                    var obj = JSON.parse(data)


                    $(".txtlabel").val(obj.LawLabel)


                    createEditor(obj.LawContext)

                }


            });
    });

    $(document).delegate('#btnSaveRelation', 'click', function (e) {
        e.stopImmediatePropagation();

        var form = $(this).parents(".opline")
        var thisid = form.data("id")
        var inputid = form.find("input[type=text]").val()

        var obj = jQuery("<input type='hidden' ></input>")
        switch (form.find("input[name=effecttype]:checked").val()) {
            case 'effective':
                obj.data("idLaw", thisid)

                obj.data("idRelated", inputid)
                break;
            case 'affected':
                obj.data("idRelated", thisid)
                obj.data("idLaw", inputid)
                break;

        }
        obj.data("CurrentIdLaw", thisid)
        obj.data("RelationType", form.find("#relationtype").find(":selected").val());

        SaveRelation(obj)


    });
    function SaveRelation(obj) {
        alert(obj.data("idlaw"))
        $.ajax({
            datatype: "html",
            type: "POST",
            url: "/DataSR/lawManagerHandler.ashx",
            data: { Do: 'AddRelation', idLaw: obj.data("idLaw"), idRelated: obj.data("idRelated"), RelationType: obj.data("RelationType"), idLawReturnRelation: obj.data("CurrentIdLaw") },
            success: function (data) {

                $("#ct_" + obj.data("CurrentIdLaw")).children(".RleationErea").html(data)

            }


        });
    }

    function SaveEslah(obj) {

        $.ajax({
            datatype: "html",
            type: "POST",
            url: "/DataSR/lawManagerHandler.ashx",
            data: { Do: 'AddRelationEslah', idLaw: obj.data("idLaw"), idRelated: obj.data("idRelated"), RelationType: obj.data("RelationType"), idLawReturnRelation: obj.data("idLaw"), Label: obj.data("editedLabel"), Context: obj.data("editedContext") },
            success: function (data) {
                alert(data)
                var dt = jQuery(data)
                $("#ct_" + obj.data("idLaw")).html(dt.find("#ct_" + obj.data("idLaw")).html())


            }


        });
    }
    function createEditor(wiki) {
        var imgurl = $(".ImageFolder").val()

        $('.editor').froalaEditor({

            pastePlain: true,
            direction: 'rtl',
            heightMin: 400,
            lineWrapping: true,
            iframe: true,
            htmlRemoveTags: ['base'],
            toolbarButtons: ['heading1', 'heading2', 'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
            enter: $.FroalaEditor.ENTER_BR,
            fontFamily: {
                'Vazir': 'Font 1'
            }


        });
        $('.editor').froalaEditor('html.set', wiki);
        //  $(".fr-wrapper").children("div:first-child").remove()

    }


    $(document).delegate('#btnSaveNode', 'click', function (e) {
        e.stopImmediatePropagation();

        var editor = $(this).prev()
        var edotorControl = $(this).parents(".opline")

        var obj = jQuery("<input type='hidden' ></input>")
        obj.attr('data-parentnode', edotorControl.data("idparent"))
        obj.attr('data-id', edotorControl.data("id"))
        obj.attr('data-label', edotorControl.find('.txtlabel').val())
        var node = $('input[name=nodetype]:checked', '#form1').val();
        var tanghih = $('input[name=Tanghih]:checked', '#form1').val();
        obj.attr('data-nodet', node)
        obj.attr('data-tanghihi', tanghih)
        obj.val(editor.froalaEditor('html.get'))
        SaveEdit(obj)
    });
    function SaveEdit(obj) {
        //   alert(obj.data("tanghihi"))
        $.ajax({
            datatype: "html",
            type: "POST",
            url: "/DataSR/lawManagerHandler.ashx",
            data: { Do: 'AddNode', id: obj.data("id"), nodeType: obj.data("nodet"), context: obj.val(), label: obj.data("label"), istanghihi: obj.data("tanghihi") },
            success: function (data) {

                if (data) {

                    var dt = jQuery(data)
                    if (obj.data("nodet") == 'Child') {
                        // alert("1" + "----" + $("#ct_" + obj.data("id")).html())
                        $("#ct_" + obj.data("id")).html(dt.find("#ct_" + obj.data("id")).html())
                    }
                    else {
                        //   alert("2" + "----" + $("#ct_" + obj.data("parentnode")).html())
                        $("#ct_" + obj.data("parentnode")).html(dt.find("#ct_" + obj.data("parentnode")).html())
                    }
                }
            }

        });
    }

    $(document).delegate('.dlTimeLine', 'change', function (e) {
        e.stopImmediatePropagation();
        var todate = $(this).val()
        var datestr = $(this).val()
        var idlaw = $(this).parents(".PrintLaw").data("idlaw")
        
        $.ajax({
            
            datatype: "html",
            type: "POST",
            url: "/DataSR/lawManagerHandler.ashx",
            data: { Do: 'GetAlllaw', idlaw: idlaw, ToDate: todate },
            success: function (data) {
                if (data) {
                    //alert(data)
                    $(".PrintLaw").html(data)
                    $(".dlTimeLine").val(todate);
                }
            }

        }); 
        
        // $(".original").show()
        // $(".DNoneByIcon").removeClass("DNoneByIcon")

        //// alert(todate)
        // //alert($("p[data-datemieffect>" + datestr + "]"))


        // $('.Tanghihi[data-datemieffect]').filter(function () {

        //     return $(this).data('datemieffect') > datestr;
        // }).addClass("DNoneByIcon");
        // //$("li[data-status='Radit']").each(function () {
        // //    if (Date.parse($(this).data("datemieffect")) <= Date.parse(todate))
        // //        $(this).addClass("TGreen")
        // //});

        // $(".Tanghihi").each(function () {
        //     //alert(Date.parse($(this).data("datemieffect")))
        //     //alert(Date.parse(todate))

        //     if ($(this).data("datemieffect") >= datestr) {
        //         alert($(this).data("datemieffect") + "\n" + datestr + $(this).children("p").text())
        //         $(this).addClass("HiddenTanghihi")
        //         $(this).removeClass("Tanghihi")
        //         $(this).next().removeClass("DNoneByIcon")
        //     }
        // });
        // $(".HiddenTanghihi").each(function () {
        //     //alert(Date.parse($(this).data("datemieffect")))
        //     //alert(Date.parse(todate))
        //     if ($(this).data("datemieffect") <= datestr) {
        //         $(this).removeClass("HiddenTanghihi")
        //         $(this).addClass("Tanghihi")

        //     }
        // });
        // $(".MansoukhLaw").each(function () {
        //     if ($(this).data("datemieffect") >= datestr) {
        //         $(this).addClass("RemoveMansoukhLaw")
        //         $(this).removeClass("MansoukhLaw")
        //     }
        // });
        // $(".RemoveMansoukhLaw").each(function () {
        //     if ($(this).data("datemieffect") <= datestr) {
        //         $(this).removeClass("RemoveMansoukhLaw")
        //         $(this).addClass("MansoukhLaw")
        //     }
        // });


    });
    $(document).delegate('.pheader', 'click', function (e) {
        //alert($(this).parents(".EslahLabelContext"))
        if ($(this).parents(".EslahLabelContext").next().hasClass("DNoneByIcon") == true)
            $(this).parents(".EslahLabelContext").next().removeClass("DNoneByIcon", 1000, "easeInBack")
        else
            $(this).parents(".EslahLabelContext").next().addClass("DNoneByIcon", 1000, "easeInBack")
        e.stopImmediatePropagation();
    });
    $(document).delegate('.relIcon', 'click', function (e) {
        e.stopImmediatePropagation();

        $(this).next().toggle('slow');
        
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest(".RelationErea").length === 0) {
            $(".RelationErea").hide();
        }
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest(".filearea").length === 0) {
            $(".filearea").hide();
        }
    });
    
    $('.menubar').prepend('<label for="customTogglerTree" class="customTogglerTree"> <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1"><path d="m24 12c0 .552-.448 1-1 1h-5c-.552 0-1-.448-1-1s.448-1 1-1h5c.552 0 1 .448 1 1zm-1 8h-5c-.552 0-1 .448-1 1s.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1zm-13-16h13c.552 0 1-.448 1-1s-.448-1-1-1h-13c-.552 0-1 .448-1 1s.448 1 1 1zm4 7v2c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2h-4v5c0 1.103.897 2 2 2h2c0-1.103.897-2 2-2h2c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2h-2c-1.103 0-2-.897-2-2h-2c-2.206 0-4-1.794-4-4v-12c-1.103 0-2-.897-2-2v-2c0-1.103.897-2 2-2h2c1.103 0 2 .897 2 2v2c0 1.103-.897 2-2 2v5h4c0-1.103.897-2 2-2h2c1.103 0 2 .897 2 2zm-12-7h2v-2h-2zm8 18h2v-2h-2zm2-11h-2v2h2z"/></svg> <input type="checkbox" id="customTogglerTree"/> </label>')
    $('.TableCell.Search').prepend('<label for="customToggler" class="customToggler"> <input type="checkbox" id="customToggler"/> </label>')
});
