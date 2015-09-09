$(document).ready(function(){

    var repeat = true;
    var FREQ = 10000;

    function showFrequency(){
        $("#freq").html("Page refgeshes every " +FREQ/1000+" second(s).")
    }

    function startAJAXcalls(){
        if (repeat) {
            setTimeout(function () {
                    getXmlRacers();
                    startAJAXcalls();
                },
                FREQ
            );
        }
    }

    function getXmlRacers(){
        $.ajax({
            url: "finishers.xml",
            cache: false,
            dataType: "xml",
            success:  function(xml){

                $('#finishers_m').empty();
                $('#finishers_f').empty();
                $('#finishers_all').empty();
                $(xml).find("runner").each(function(){
                    var info = '<li>Name: ' + $(this).find("fname").text() + ' ' + $(this).
                            find("lname").text() + '. Time: ' + $(this).find("time").text() + '</li>';
                    if ($(this).find("gender").text() == "m"){
                        $('#finishers_m').append(info);
                    }else if($(this).find("gender").text() == "f"){
                        $('#finishers_f').append(info);
                    }
                    $('#finishers_all').append(info);

                });
                getTimeAjax();
            }
        });
    }

    function getTimeAjax(){
        $('#updatedTime').load("time.php");
        // var time = "";
        // $.ajax({
        //     url: "time.php",
        //     cache: false,
        //     success: function(data){
        //         $('#updatedTime').html(data);
        //     }
        // });
    }

    $("#btnStop").click(function(){
        repeat = false;
        $("#freq").html("Updates paused");
    });

    $("#btnStart").click(function(){
        repeat = true;
        startAJAXcalls();
        showFrequency();
    })

    $('btnSave').click(function(){
        var data = $("#addRunnder :input").serializeArray();
        $.post($("#addRunner:input").attr('action'),data,function(json){
            if(json.status == "fail"){
                alert(json.message);
            }
            if (json.status == "success"){
                alert(json.message);
                clearInputs();
            }
        }, "json");
    });

    function clearInputs{
        $("#addRunner:input").each(function(){
            $(this).val('');
        });
    }

    $("#addRunner").submit(function(){
        return false;
    });

    showFrequency();
    getXmlRacers();
    startAJAXcalls();

});
