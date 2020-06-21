var wip = "wss://" + window.location.host;
var socket = io(wip);
var childIsReady2 = 0,parentIsReady2 = 0;

var page = 0;
$(document).ready(function () {
    $('#letter').html("\n  謝謝" + getCookie('nickname') + "\n\n  因為...\n\n  這讓我覺得...");
    var id = getCookie('ID'); 
    if(id==null)
       window.location.href='signin.html';
    $('#kid_name').html(id);

    /* 重整畫面時設定好bell有沒有紅色 */
    socket.emit('give_me_money', {ID: getCookie('ID')});
    socket.emit('give_me_score', {ID: getCookie('ID')});
    socket.emit('give_me_stage', {ID: getCookie('ID')});
    socket.emit('give_me_letter_k', {ID: getCookie('ID')});
    /* 信件夾click設定 */    
    $('#sysinfo').click( function(){
      $('#container').attr("src", "./assests/sysinfo.svg");
      socket.emit('give_me_letter_k', {ID: getCookie('ID')});
    });

    $('#mail').click( function(){
      $('#container').attr("src", "./assests/mail.svg");
      socket.emit('give_me_letter_k', {ID: getCookie('ID')});
    });
  
    $('#nortification').click( function(){
      $('#black').fadeIn(400);
      $('#info').fadeIn(400);
      socket.emit('give_me_letter_k', {ID: getCookie('ID')});
    });

    $('#letter_p_close').click( function(){
      $('#black').fadeOut(400);
      $('#info').fadeOut(400);
    });

    /* 按恐龍可以收信 */
    $('#ass_dinasour').click( function(){
      socket.emit('give_me_letter_k', {ID: getCookie('ID')});
    }); 
    
});



$("#ass_dinosour").rotate({
  bind:
  {
    mouseover : function() {
      $(this).rotate({animateTo:180})
    },
    mouseout : function() {
      $(this).rotate({animateTo:0})
    }
  }

});


function go_to_letter(){
    $('.write_letter').fadeIn(800);
    $('.info').fadeOut(400);
    $('#cover').css('display','none'); //關閉遮罩層

    //屁頭上升
    $('#ass_dinasour').animate({top:"-=23vh" },800);
}

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

/*function write_letter(){
    alert('寫一封感謝信給' + getCookie('nickname') + '吧！');
    window.location.href='letter_k.html';
}*/

function letter_back(){
    $('.write_letter').fadeOut(800);
    $('#right_leaf').animate({left:"-=200vw" },1500);
    $('#training_logo').animate({left:"-=200vw" },1500);
    $('#training_text').animate({left:"-=200vw" },1500);
    $('#left_leaf').animate({left:"+=200vw" },1500);
    $('#mission_logo').animate({left:"+=200vw" },1500);
    $('#mission_text').animate({left:"+=200vw" },1500);
    $('#ass_dinasour').animate({top:"+=23vh" },800);
}

function send_letter(){
    //寄信
    var letter = $('#letter').val();
    var id = getCookie('ID');
    socket.emit('send_letter', {ID: id, Letter: letter});

    // 動畫
    //$('#letter_bg').animate({height:"-=20vh"}, 1200);
    $('.write_letter').css('display','none');
    $('#letter_bg_rec').css('display','block');
    $('#letter_bg_rec').animate({top:"+=22vh", left:"+=15vw", height:"-=43vh", width:"-=30vw"}, 800);
    $('#ass_dinasour').animate({top:"+=23vh" },800);
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

/*** 收信 ****/
//接未讀信件
socket.on('give_you_letter_k', function(data){  
    console.log(data.Letters);
    if(data.Letters.length > 0)
    {
      $('#bell').show();
    }
    else if(data.Letters.length == 0)
    {
      $('#bell').fadeOut(100);
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
       
      for(var i=0; i<data.Letters.length; i++)
      { 
        console.log('letter');
        str+="<div class = \"letter\" onclick=\"expand(event)\" id=\""
        str+=data.Letters[i].letter_id;
        str+="\">";
        str+="<div class = \"node\">";
        str+=data.Letters[i].date;
        str+=" 給寶貝的信</div>";
        str+="<div class = \"text\">";
        str+=data.Letters[i].content;
        str+="</div>";
          
        str+="</div>";
        
      } 
      document.getElementById("content").innerHTML = str;
      str="";
    }
    else if($('#container').attr("src") == "./assests/sysinfo.svg")
    { 
      str+="請老師給我們高分一點！";
      document.getElementById("content").innerHTML = str;
      str="";
    }
    str="";
 })
 
 
socket.on('give_you_money', function(data){  
  if(data.ID == getCookie('ID')){
    
    
  }
})

socket.on('give_you_score', function(data){  
  if(data.ID == getCookie('ID')){
    var em = (data.Score / 100 )*4 + "em";
    console.log(em);
    $('#EXP').css({"width":em});
  }
})


socket.on('give_you_stage', function(data){
  if(data.ID == getCookie('ID')){
    var i = document.getElementById("level");
    i.innerHTML = data.Stage;
  }
})
socket.on('fuckyou', function(data){
  if(data.ID == getCookie('ID')){
    alert('1234');
  }
})


function expand(e){
    if( $(e.target).hasClass('text') ){/***************************** */
      return; 
    }
    e.target = $(e.target).parents('.letter');
    var exp = false;
    if( $(e.target).hasClass('letter-expand') ){
      exp = true;
    }
  
    if(exp){
      $(e.target).children('.text').fadeOut(800);
      console.log($(e.target).children('.text'));
    }

    $(e.target).toggleClass('letter-expand',1000,function(){
      if( exp == false){
        $(e.target).children('.text').fadeIn(800).css("display","inline-block");                                                    
      }
    })
}



function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

$('#start_button').click(function(){
  socket.emit('start_game_from_child',{ID:getCookie('ID')});
  childIsReady2 = 1;
  console.log("Child is ready");
  console.log("Parent:" + parentIsReady2 + " Child:" + childIsReady2);
})


socket.on('parent_is_ready', function(data){
  if(data.ID == getCookie('ID')){   
    parentIsReady2 = 1;            
  }
})

window.setInterval(function () {  
  if(parentIsReady2 == 1 && childIsReady2 == 1){
    parentIsReady2 = 0;
    childIsReady2 = 0;
    socket.emit('c_bothReady',{ID:getCookie('ID')});    
  }
}, 100);

