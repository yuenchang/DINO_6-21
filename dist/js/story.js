var page = -1;
var id;
var wip = "wss://"+window.location.host;
var socket = io(wip);
$(function(){
    
})

$( document ).ready(function() {

  //  $('.confirm').click(next);
    $('.confirm').click(function(){
        socket.emit('MayIGo', {ID:id} );
      }
    )
    id = getCookie('ID');
});


socket.on('Go', function(data){
  if (data.ID == getCookie('ID'))
  {
    if(data.Pass == true){
      $('.prologue').fadeOut(400);
      $('.bigleaf_front').animate({top:"-=15vh" },400);
      $('.bigleaf_back').animate({top:"-=15vh" },400);
      $('.story').fadeIn(400);
      $('body').click(next);
      page = 1;
    }else{
      alert('wait kid');
    }
  }
})


function next(){
  if(page == -1){
    /*
    $('.prologue').fadeOut(400);
    $('.bigleaf_front').animate({top:"-=15vh" },400);
    $('.bigleaf_back').animate({top:"-=15vh" },400);
    $('.story').fadeIn(400);
    page = 0;
    */
  }else if(page == 0){
    page = 1;
	}else if(page==1){
    $('.dino').animate({right:"-50vw" },1000 );
    $('.dino').show();
    $('.story').fadeOut(400);
    $('.story1').fadeIn(400);
	  page = 2;
	}else if(page==2){
    $('.bigleaf_front').animate({top:"+=20vh" },1200);
    $('.bigleaf_back').hide();

    $('.bigleaf_back_left').show();
    $('.bigleaf_back_right').show();
    
    $('.bigleaf_back_left').animate({left:"-38.5vw",top:"47vh"},1200);
    $('.bigleaf_back_right').animate({right:"-40vw",top:"36vh"},1200);
    
    $('.dino').animate({width:"80vw",right:"9vw",bottom:"5vh"},1200);
    $('.egg2').fadeIn(400);
    $('.egg2').rotate(-33);
    

    $('.story1').fadeOut(400);
    $('.story2').fadeIn(400);
	  
    socket.emit('need_help', {ID:id} );
    page = 3;
    
	}else if(page==3){
    
    $('.bigleaf_front').fadeOut(400);
    $('.bigleaf_back_left').fadeOut(400);
    $('.bigleaf_back_right').fadeOut(400);
  
    $('.dino').animate({width:"150vw",right:"20vw",bottom:"8vh"},1200);
    $('.egg2').animate({width:"40vw",right:"28.24vw",bottom:"8vh"},1200);
       

    $('.story2').fadeOut(400);
    $('.story3').fadeIn(400);
    page = 4;
  }else if(page==4){
    $(".egg2").rotate({ animateTo:-7});
    page = 5;
  }else if(page==5){
    $(".egg2").rotate({ animateTo:0});
    $('.egg2').animate({bottom:"7.5vh"},1200);
    page = 6;
  }else if(page==6){
    $(".egg2").rotate({ animateTo:-30});
    $('.story4').fadeIn(400);//慢慢
    page = 7;
  }else if(page==7){
    $(".egg2").rotate({ animateTo:-72});
    page = 8;
  }else if(page==8){
    $(".egg2").rotate({ animateTo:-60});
    $('.egg2').animate({bottom:"8.5vh"},1200);
    $('.story5').fadeIn(400);//啊蛋蛋縮
    $('.story4').fadeOut(400);
    page = 9;
  }else if(page==9){
    $(".egg2").rotate({ animateTo:0});
    page = 10;
  }else if(page==10){
    $(".egg2").rotate({ animateTo:-16});
    $('.egg2').animate({bottom:"6vh"},1200);
    page = 11;
  }else if(page==11){
    $(".egg2").rotate({ animateTo:0});
    $('.egg2').animate({bottom:"5.5vh"},1200);
    $('.story6').fadeIn(400);//只差一點
    $('.story5').fadeOut(400);
    page = 12;
  }else if(page==12){
    $(".egg2").rotate({ animateTo:-30});
    $('.egg2').animate({bottom:"5vh"},1200);
    page = 13;
  }else if(page==13){
    $(".egg2").rotate({ animateTo:-15});
    $('.egg2').animate({bottom:"4.5vh"},1200);
    $('.story7').fadeIn(400);//快出來
    $('.story6').fadeOut(400);
    page = 14;
  }else if(page==14){
    $(".egg2").rotate({ animateTo:-30});
    $('.egg2').animate({bottom:"4vh"},1200);
    $('.story8').fadeIn(400);//現在
    $('.story7').fadeOut(400);
    socket.emit('say_thank', {ID:id} );
    page = 15;
  }else if(page==15){
    $('egg2').rotate({animateTo:-45});
    $('.egg2').animate({bottom:"3.5vh"},1200);
    page = 16;
  }else if(page==16){
    $('.egg2').animate({bottom:"-20vh"},500, function(){
      socket.emit('end_story', {ID:id} );
      setTimeout("location.href='main_p.html'",3000);
    });
  }
}	

function confirm(){
  $('.prologue').fadeOut(400);
  $('.bigleaf_front').animate({top:"-=15vh" },400);
  $('.bigleaf_back').animate({top:"-=15vh" },400);
  $('.story').fadeIn(400);
  page = 0;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}



