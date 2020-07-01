$(document).ready(function (){

    $('#score_output').html(getCookie('game2'))
    key1 = "scoreGet";
    value1 = 10;
    key2 = "moneyGet";
    value2 = 100;
    var expires = new Date();
    expires.setTime(expires.getTime()+60*60*1000 );//10 min
    document.cookie = key1 + "=" + escape(value1) +"; expires=" + expires.toGMTString();
    document.cookie = key2 + "=" + escape(value2) +"; expires=" + expires.toGMTString();
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
