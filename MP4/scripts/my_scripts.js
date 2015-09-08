/**
 * Created by Oleg on 08.09.2015.
 */
$(document).ready(function(){
    var v = false;
    $("button#vegOn").click(function(){
        if (v == false){
            $f = $("li.fish").parent().parent().detach();
            $(".hamburger").replaceWith("<li class='portobello'><em>Portobello Mashroom</em></li>");
            $(".meat").after("<li class='tofu'><em>Tofu</em></li>");
            $m = $(".meat").detach();
            $(".tofu").parent().parent().addClass("veg_leaf");
            $(".portobello").parent().parent().addClass("veg_leaf");
            v = true;
        }
    });
    $("button#restoreMe").click(function(){
        if(v == true){
            $(".portobello").replaceWith("<li class='hamburger'>hamburger</li>");
            $(".menu_entrees li").first().before($f);
            $(".tofu").each(function(i){
                $(this).after($m[i]);
            });
            $(".tofu").remove();
            $(".meat").parent().parent().removeClass("veg_leaf");
            $(".hamburger").parent().parent().removeClass("veg_leaf");
            v = false;
        }
    });
});