var wip = "wss://"+window.location.host;

var socket = io(wip);

var stage = 0;
var intro_cnt = 0;

$(document).ready(function (){
  
  socket.emit('kidready', {ID:getCookie('ID')} );
  stage = 0;

    //modify
    $('.next_intro').click(function(){
      var tmpn = intro_cnt.toString();
      var n = ".intro" + tmpn
      console.log("n=",n)
      $(n).show()
      intro_cnt++;
      if(intro_cnt==3){
        document.getElementById( "step" ).style.left = "64vw";
      }
      if(intro_cnt==4){
        document.getElementById( "step" ).style.left = "75.5vw";      
      }
      else if(intro_cnt==5){
        document.getElementById( "step" ).style.left = "75.5vw";      
      }
      else if(intro_cnt==6){
        document.getElementById( "step" ).style.left = "75.5vw";      
      }
      else if(intro_cnt==7){
        document.getElementById( "step" ).style.left =  "75.5vw";      
      }   
      else if(intro_cnt==8){
        document.getElementById( "step" ).style.top = "74vh";
        document.getElementById( "step" ).style.left = "38vw";  
      }
      else if(intro_cnt==9){
        $(".next_intro").hide()
        $(".finish_intro").show()
      }
    })
  
    $('.finish_intro').click(function(){
      setTimeout("location.href='main.html'",1000);
    })

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
    //setTimeout("location.href='main.html'",3000);
    setTimeout(() => {
      $(".intro0").show()
      $(".next_step").show()
    }, 3000)
  }
}

function know(){
  $(".next_step").fadeOut(500);
  $(".intro1").fadeIn(500);
  $(".next_intro").show()
  intro_cnt = 2;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
