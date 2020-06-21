var wip = "wss://" + window.location.host;
var socket = io(wip);
var childIsReady1 = 0,parentIsReady1 = 0;

var page = 0;
$(document).ready(function() {
  

  $('#letter').html("\n  親愛的寶貝：\n");
  var id = getCookie('ID'); 
  if(id==null)
    window.location.href='signin.html';
  socket.emit('give_me_letter', {ID: getCookie('ID')});
  socket.emit('give_me_score', {ID: getCookie('ID')});
  socket.emit('give_me_stage', {ID: getCookie('ID')});
    /* 信件夾click設定 */    
    $('#sysinfo').click( function(){
      $('#container').attr("src", "./assests/sysinfo.svg");
      socket.emit('give_me_letter', {ID: getCookie('ID')});
    });

    $('#mail').click( function(){
      $('#container').attr("src", "./assests/mail.svg");
      socket.emit('give_me_letter', {ID: getCookie('ID')});
    });
  
    $('#nortification').click( function(){
      $('#black').fadeIn(400);
      $('#info').fadeIn(400);
      //$('ass_dinasour').css('display', 'none');
      socket.emit('give_me_letter', {ID: getCookie('ID')});
    });

    $('#letter_p_close').click( function(){
      $('#black').fadeOut(400);
      $('#info').fadeOut(400);
      $('#all_letter').fadeOut(400);
    });

    /* 按恐龍可以收信 */
    $('#dinasour').click( function(){
      socket.emit('is_there_letter', {ID: getCookie('ID')});
    });
});


socket.on('there_is_letter', function(data){  
  $('#bell').show();
})

//接未讀信件
socket.on('give_you_letter', function(data){  
    if(data.Letters.length > 0)
    {
      $('#bell').show();
    }
    else if(data.Letters.length == 0)
    {
      $('#bell').hide();
    }
    var str = "";
    if (page == 0)
    {
      $('#container').attr("src", "./assests/sysinfo.svg");
      page = 1;
    }
    if($('#container').attr("src") == "./assests/mail.svg")
    {
      console.log('in mail');
      /* 已評分未評分 */
      $('#all_letter').show();
      
      for(var i=0; i<data.Letters.length; i++)
      { 
        console.log('letter');
        str+="<div class = \"letter\" onclick=\"expand(event)\" id=\""
        str+=data.Letters[i].letter_id;
        str+="\">";
        str+="<div class = \"node\">";
        str+=data.Letters[i].date;
        str+=" 感恩的信</div>";
        str+="<div class = \"text\">";
        str+=data.Letters[i].content;
        str+="</div>";
          
          
        str+="<div class =\"nice\"";
        
        str+=" onclick =\"good_letter('"
        str+=data.Letters[i].letter_id;
        str+="',event)\"> <img class = \"score\" src =\"./assests/nice.svg\"></img></div>";

        str+="<div class =\"bad\"";
        str+=" onclick =\"bad_letter('"
        str+=data.Letters[i].letter_id;
        str+="',event)\"> <img class = \"score\" src =\"./assests/bad.svg\"></img></div>";

        
        str+="</div>";
        
      } 
      document.getElementById("content").innerHTML = str;
      str="";
      page = 2;
    }
    else if($('#container').attr("src") == "./assests/sysinfo.svg")
    { 
      $('#all_letter').hide();
      str+="請老師給我們高分一點！";
      document.getElementById("content").innerHTML = str;
      str="";
      page = 2;
    }
    str="";
 })
 
 
 

 function expand(e){
      
      if( $(e.target).hasClass('score') ){
        return;
      }else if( $(e.target).hasClass('nice') ){
        return;
      }else if( $(e.target).hasClass('bad') ){
        return;
      }else if( $(e.target).hasClass('text') ){
        return; 
      }else if($(e.target).hasClass('node') ){
        return;
      }
      e.target = $(e.target).parents('.letter');
      var exp = false;
      if( $(e.target).hasClass('letter-expand') ){
        exp = true;
      }
      
      
      if(exp){
        $(e.target).children('.text').fadeOut(800);
        $(e.target).children('.nice').fadeOut(800);
        $(e.target).children('.bad').fadeOut(800);
      }
  
      $(e.target).toggleClass('letter-expand',1000,function(){
        if( exp == false){
          $(e.target).children('.text').fadeIn(800).css("display","inline-block");
          $(e.target).children('.nice').fadeIn(800).css("display","inline-block");
          $(e.target).children('.bad').fadeIn(800).css("display","inline-block");                                                      
        }
      })
  }


function good_letter(letter_id,e){
    var select = "#" + letter_id;
    $(select).fadeOut(800);
    socket.emit('score_letter',{ID: getCookie('ID'), letter_id: letter_id, score: 10});
    socket.emit('give_me_letter', {ID: getCookie('ID')});
}
function bad_letter(letter_id,e){
    var select = "#" + letter_id;
    $(select).fadeOut(800);
    socket.emit('score_letter',{ID: getCookie('ID'), letter_id: letter_id, score: 0});
    socket.emit('give_me_letter', {ID: getCookie('ID')});
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


/*** 寫信 ****/

/* 尼斯湖水怪 */
function letter_info(){
  $('#cover').css('display','block'); //顯示遮罩層
  $('.info').fadeIn(400);
  $('.info').css('z-index', 5);
  $('#right_leaf').animate({left:"+=200vw" },1500);
  $('#training_logo').animate({left:"+=200vw" },1500);
  $('#training_text').animate({left:"+=200vw" },1500);
  $('#left_leaf').animate({left:"-=200vw" },1500);
  $('#mission_logo').animate({left:"-=200vw" },1500);
  $('#mission_text').animate({left:"-=200vw" },1500);
}

/* 開始寫信 */
function go_to_letter(){
  $('.write_letter').fadeIn(800);
  $('.info').fadeOut(400);
  $('#cover').css('display','none'); //關閉遮罩層

  //龍媽上升
  $('#dinasour').animate({top:"-=25vh" },800);
}

function send_letter(){
  //寄信
  var letter = $('#letter').val();
  var id = getCookie('ID');
  socket.emit('send_letter_to_kid', {ID: id, Letter: letter});

  // 動畫
  //$('#letter_bg').animate({height:"-=20vh"}, 1200);
  $('.write_letter').css('display','none');
  $('#letter_bg_rec').css('display','block');
  $('#letter_bg_rec').animate({top:"+=22vh", left:"+=15vw", height:"-=43vh", width:"-=30vw"}, 800);
  $('#dinasour').animate({top:"+=25vh" },800);
  $('#sent').fadeIn(1200);
  $('#right_leaf').animate({left:"-=200vw" },1500);
  $('#training_logo').animate({left:"-=200vw" },1500);
  $('#training_text').animate({left:"-=200vw" },1500);
  $('#left_leaf').animate({left:"+=200vw" },1500);
  $('#mission_logo').animate({left:"+=200vw" },1500);
  $('#mission_text').animate({left:"+=200vw" },1500);
  $('#sent').fadeOut(2000);
  $('#letter_bg_rec').fadeOut(2000);

  //圖片大小復原
  $('#letter_bg_rec').animate({top:"-=22vh", left:"-=15vw", height:"+=43vh", width:"+=30vw"}, 10);
}

socket.on('give_you_score', function(data){
  if(data.ID == getCookie('ID')){
    var em = (data.Score / 100 )*4 + "em";
    $('#EXP').css({"width":em});
  }
})

socket.on('give_you_stage', function(data){
  if(data.ID == getCookie('ID')){
    var i = document.getElementById("level"); 
    i.innerHTML = data.Stage;
  }
})

/* 返回主要畫面 */
function letter_back(){
  $('.write_letter').fadeOut(800);
  $('#right_leaf').animate({left:"-=200vw" },1500);
  $('#training_logo').animate({left:"-=200vw" },1500);
  $('#training_text').animate({left:"-=200vw" },1500);
  $('#left_leaf').animate({left:"+=200vw" },1500);
  $('#mission_logo').animate({left:"+=200vw" },1500);
  $('#mission_text').animate({left:"+=200vw" },1500);
  $('#dinasour').animate({top:"+=25vh" },800);
}

$('#start_button').click(function(){
  socket.emit('start_game_from_parent',{ID:getCookie('ID')});
  parentIsReady1 = 1;
  console.log("Parent is ready");
  console.log("Parent:" + parentIsReady1 + " Child:" + childIsReady1);
})

socket.on('child_is_ready', function(data){
  if(data.ID == getCookie('ID')){
    childIsReady1 = 1;                         
  }
})

window.setInterval(function () {  
  if(parentIsReady1 == 1 && childIsReady1 == 1){
    parentIsReady1 = 0;
    childIsReady1 = 0;
    socket.emit('p_bothReady',{ID:getCookie('ID')});    
  }
}, 100);