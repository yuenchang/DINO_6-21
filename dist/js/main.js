var wip = "wss://" + window.location.host;
var socket = io(wip);
var childIsReady2 = 0,parentIsReady2 = 0;
var page = 0;
var can_upgrade = false;
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
    $( "#ass_dinasour" ).animate({top:"-=10vh" }, "fast",()=>{
      if(can_upgrade == true)
      {
        window.location.href='choose_upgrade.html';
      }  
      $( "#ass_dinasour" ).animate({top:"+=10vh" }, "fast"); 
      socket.emit('give_me_score', {ID: getCookie('ID')}); 
    })
    
    document.getElementById("ass_dinasour").setAttribute("src", "assests/屁頭龍下雨天怎麼辦我好想你.png");
  })

  $('#upgrage_info_ok').click( function(){
    $('.upgrage_info').fadeOut(400);
  })


});


var rot2 = function() {
  $("#ass_dinasour").rotate({
    angle: 0,
    animateTo: 360,
    callback: rot2,
    easing: function(x, t, b, c, d) { // t: current time, b: begInnIng value, c: change In value, d: duration
      return c * (t / d) + b;
    }
  });
}
// rot2();

/*
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
  */


//let dino to where you touch

/* 屁頭龍動來動去 */
/*$(window).click(function(e) {

  var relativeX = (e.pageX - $(e.target).offset().left),
    relativeY = (e.pageY - $(e.target).offset().top);

  var left = parseInt($('#ass_dinasour').css('left'), 10);
  if(left - relativeX < 0){
    $('#ass_dinasour').css({"transform": "scaleX(-1)"});
  }else{
    $('#ass_dinasour').css({"transform": "scaleX(1)"});
  }
  var w = window.innerWidth;
  var h = window.innerHeight;
  var X = (relativeX/w)*100;
  var Y = ((h-relativeY)/h)*100;
  var offx = parseInt($('#ass_dinasour').css('width'), 10);
  var offy = parseInt($('#ass_dinasour').css('height'), 10);

  $( "#ass_dinasour" ).animate({top:e.pageY-180,left:e.pageX-100 }, "fast", function(){
  var rect1 ={ x: parseInt($('#ass_dinasour').css('left'), 10),y: parseInt($('#ass_dinasour').css('top'), 10),width: parseInt($('#ass_dinasour').css('width'), 10),height: parseInt($('#ass_dinasour').css('height'), 10)}
  var rect2 ={ x: parseInt($('#cloud').css('left'), 10),y: parseInt($('#cloud').css('top'), 10),width: parseInt($('#cloud').css('width'), 10),height: parseInt($('#cloud').css('height'), 10)}

    if (rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y) {
          // collision detected!
    }

  });
});*/



var move = 1;
//random move of dino
var timeoutID = window.setInterval(( () =>{ 

  if(move){
 //   $('#ass_dinasour').rotate({animateTo:10})
    move = 0;
  }else{
 //   $('#ass_dinasour').rotate({animateTo:-10})
    move = 1;
  }
  var top = parseInt($('#ass_dinasour').css('top'), 10);
  var left = parseInt($('#ass_dinasour').css('left'), 10);
  var w = window.innerWidth;
  var h = window.innerHeight;
  top = (top/h) * 100
  left =  (left/w) * 100
  var diffx = 0;
  var diffy = 0;
  if(left + 5 > 80){
    var dir = Math.floor(Math.random()*2);
    if(dir == 0)
      diffx = 0;
    else
      diffx = -5;
  }else if(left - 5 < -40){
    var dir = Math.floor(Math.random()*2);
    if(dir == 0)
      diffx = 5;
    else
      diffx = 0;
  }else{
    var dir = Math.floor(Math.random()*3);
    if(dir == 0)
      diffx = 5;
    else if(dir == 1)
      diffx = 0;
    else
      diffx = -5;
  }
  if(top + 5 > 65){
    var dir = Math.floor(Math.random()*2);
    if(dir == 0)
      diffy = -5;
    else
      diffy = 0;

  }else if(top - 5 < 15){
    var dir = Math.floor(Math.random()*2);
    if(dir == 0)
      diffy = 5;
    else
      diffy = 0;
  }else{
    var dir = Math.floor(Math.random()*3);
    if(dir == 0)
      diffy = 5;
    else if(dir==1)
      diffy = 0;
    else
      diffy = -5
  }
  $( "#ass_dinasour" ).animate({top:`+=${diffy}vh`,left:`+=${diffx}vw` }, "slow");
}), 1000);


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

    /* 第一次進化 */
    if(data.Score == 100)
    {
      $('.upgrage_info').css('display','block');
      can_upgrade = true;
    }
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

//shake
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion',deviceMotionHandler,false);
}

var SHAKE_THRESHOLD = 5000;
var last_update = 0;
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
  var acceleration =eventData.accelerationIncludingGravity;
  var curTime = new Date().getTime();
  if ((curTime-last_update)> 10) {
    var diffTime = curTime -last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
    if (speed > SHAKE_THRESHOLD) {
      document.getElementById("ass_dinasour").setAttribute("src", "assests/屁頭龍暈船.png");
      setTimeout(function(){ document.getElementById("ass_dinasour").setAttribute("src", "assests/屁頭龍.png");
      }, 5000);
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}


async function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
 
async function umbrella() {
  document.getElementById("ass_dinasour").setAttribute("src", "assests/屁頭龍下雨天怎麼辦我好想你.png");
  await sleep(3000);
  document.getElementById("ass_dinasour").setAttribute("src", "assests/屁頭龍.png");
}

if(window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function(event) {
    var alpha = event.alpha,
      beta = event.beta,
      gamma = event.gamma;

    if(beta>90)
      beta = 90;
    if(beta<0)
      beta = 0;
    var y = (beta*40) / 90 - 10;
    $("#cloud").css("top", `${y}vh`); 
    $("#cloud").css("left", `${gamma}vw`); 
    
    var rect1 ={ x: parseInt($('#ass_dinasour').css('left'), 10),y: parseInt($('#ass_dinasour').css('top'), 10),width: parseInt($('#ass_dinasour').css('width'), 10),height: parseInt($('#ass_dinasour').css('height'), 10)}
    var rect2 ={ x: parseInt($('#cloud').css('left'), 10),y: parseInt($('#cloud').css('top'), 10),width: parseInt($('#cloud').css('width'), 10),height: 780}

    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
      umbrella();
      // collision detected!
    }   

  }, false);
}else{
  document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
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

