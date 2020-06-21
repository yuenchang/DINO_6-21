
if (getCookie('who')=='child')
{
    if(getCookie('stage')=='0')
      setTimeout("location.href='getegg.html'",4000);
    else 
      setTimeout("location.href='main.html'",4000);
}
else if(getCookie('who')=='parent')
{
    if(getCookie('stage')=='0')
      setTimeout("location.href='layegg.html'",4000);
    else
      setTimeout("location.href='main_p.html'",4000);
}


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
