var wip = "wss://"+window.location.host;

var socket = io(wip);

var stage = 0;

$(document).ready(function (){
  
  socket.emit('kidready', {ID:getCookie('ID')} );
  stage = 0;
});

socket.on('help', function(data){
  
  if (data.ID == getCookie('ID'))
    {
      
      $('.listen').fadeOut(800);
      $('.help').fadeIn(800);
    }
})

socket.on('thank', function(data){

    if (data.ID == getCookie('ID'))
    {
      $('.help').fadeOut(800);
      $('.thank').fadeIn(800);
    }
})

socket.on('get_egg', function(data){

    if (data.ID == getCookie('ID'))
    {
      $('.thank').fadeOut(400);
			$('.getegg').animate({ "top": "20vh" }, "fast" );
    }
})

function breakegg(){
  if(stage == 0){
    $('.getegg').animate({ "width": "100vw" ,"right" : "2vw"}, "fast" );
    
    $('.bg_L1').fadeOut(400);
    $('.bg_L2').fadeOut(400);
    $('.bg_L3').fadeOut(400);
    $('.bg_L4').fadeOut(400);
    
    $('.bg_R1').fadeOut(400);
    $('.bg_R2').fadeOut(400);
    $('.bg_R3').fadeOut(400);
    $('.bg_4').fadeOut(400);
    $('.Pterodactyl').fadeOut(400);
    stage = 1;
  }else if(stage == 1){
    $(".getegg").rotate({ animateTo:-15});
    stage = 2;
  }else if(stage == 2){
    $(".getegg").rotate({ animateTo:-7});
    stage = 3;
  }else if(stage == 3){
    $(".getegg").rotate({ animateTo:7});
    stage = 4;
  }else if(stage == 4){
    $(".getegg").rotate({ animateTo:-7});
    stage = 5;
  }else if(stage == 5){ 
    $('.getegg').fadeOut(400);
    $('.butthead').fadeIn(400);
    setTimeout("location.href='main.html'",3000);
  }
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
