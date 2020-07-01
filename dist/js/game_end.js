$(document).ready(function (){

    $('#score_output').html(getCookie('game2'))
    $('.sure').click(function(){
        if(getCookie('who')=="parent"){
            location.href = "main_p.html";
        }else{
            location.href = "main.html";
        }    
    })
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
