/**
 * Created by Oleg on 08.09.2015.
 */
$(document).ready(function(){
    var v = false;
    $("button#vegOn").click(function(){
        $("li.fish").detach();
        if (v == false){
            v = true;

        }
    });
    $("button#restoreMe").click(function(){
        if(v == true){
            v = false;
        }
    });
});