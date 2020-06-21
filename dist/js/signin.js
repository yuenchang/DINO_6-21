var wip = "wss://" + window.location.host;
var socket = io(wip);

$(document).ready(function () {
  var stage=0
  var typeing=false;
  $("form").hide()
  $(".mom_dinosaur").hide()
  $(".child").hide()
  $(".id_choose").hide()
  $(".parent_input").hide()
  $(".parent_sure").hide()
  $(".btn--back").hide()

  $("body").click(function(){
    if(stage==0){
      console.log("TOUCH TO START")
      $(".start").toggleClass("fadeout")
      setTimeout(() => {
        $(".start").hide()
      }, 1000)
      $("#signin").show()
      $("#signin").toggleClass("fadein")
      stage++
    }else if(stage==1){

    }
  });


  $('.btn--back').click(function(){
    /* Animation */
    $('.bigleaf_front').animate({top:'39.1vh'}, "2000", "swing")
    $('.bigleaf_back').animate({top:'28vh'}, "2000", "swing")
    $('.egg').animate({top:'24.8vh'}, "2000", "swing")
    $(".form--signin").toggleClass("fadein")
    $('.form--signin').fadeIn("2000")
    $('.LOGO_back').animate({top:'25.9vh', width: '67vw', right: '15.85vw', 'z-index':'2' }, "1000", "swing")
    $('#signup').fadeOut("2000")
    $('.btn--back').fadeOut("2000")
    $('.LOGO').animate({top:'25.9vh', width: '68.3vw', right: '15.85vw', 'z-index':'3'}, "2000", "swing")
    /* End Animation */ 
  })



  $('.option--signupbtn').click(function(){
    /* Animation */
    $('.bigleaf_front').animate({top:'13vh'}, "2000", "swing")
    $('.bigleaf_back').animate({top:'2vh'}, "2000", "swing")
    $('.egg').animate({top:'-1vh'}, "2000", "swing")
    $(".form--signin").toggleClass("fadein")
    $('.form--signin').fadeOut("2000")
    $('.LOGO_back').animate({top:'40vh', width: '47vw', right: '26vw' }, "2000", "swing")
    $('.LOGO').animate({top:'40vh', width: '47vw', right: '26vw' }, "2000", "swing", function(){
      $('.LOGO').hide()
      $('.LOGO').css("z-index", '15') 
      $('.LOGO').fadeIn("2000")
      $('#signup').fadeIn("2000")
      $('.btn--back').fadeIn("2000")
    })
    /* End Animation */
  });

  $('.btn--signup').click(function(){
    var id = $('.input--id').val()
    var password = $('.input--password').val();
    var parpwd = $('.input--parpwd').val();
    var parbirth = $('.input--parbirth').val();  
    var chibirth = $('.input--chibirth').val(); 
    var parcall = $('.input--parcall').val(); 
    socket.emit("signup", {
        id: id,
        password: password,
        parent_password: parpwd,
        parent_birth: parbirth,
        child_birth: chibirth,
        nickname: parcall
    })
     /* Animation */
    $('.bigleaf_front').animate({top:'39.1vh'}, "2000", "swing")
    $('.bigleaf_back').animate({top:'28vh'}, "2000", "swing")
    $('.egg').animate({top:'24.8vh'}, "2000", "swing")
    $(".form--signin").toggleClass("fadein")
    $('.form--signin').fadeIn("2000")
    $('.LOGO_back').animate({top:'25.9vh', width: '67vw', right: '15.85vw', 'z-index':'2' }, "1000", "swing")
    $('#signup').fadeOut("2000")
    $('.btn--back').fadeOut("2000")
    $('.LOGO').animate({top:'25.9vh', width: '68.3vw', right: '15.85vw', 'z-index':'3'}, "2000", "swing")
    /* End Animation */ 

  });



  $('.btn--signin').click(function(){
    event.preventDefault();

    //button animate
    $.get('../signin', {
      name: $('.form input[name=name]').val(),
      password: $('.form input[name=pwd]').val(),
    
    }, data => {
      var list = JSON.parse(data);
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        //$('#id').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        //document.getElementById("typein").style.visibility = "hidden";
		
		    deleteAllCookies();
	  	  key1 = "ID";
		    value1 = $('.form input[name=name]').val();
		    key3 = "parent_pwd";
		    value3 = list.pwd;
		    key4 = "nickname";
		    value4 = list.nickname;
		    key5 = "birthday";
		    value5 = list.birthday;
		    key6 = "stage";
		    value6 = list.stage;
		    var expires = new Date();
		    expires.setTime(expires.getTime()+60*60*1000 );//10 min
		    document.cookie = key1 + "=" + escape(value1) +"; expires=" + expires.toGMTString();
		    document.cookie = key3 + "=" + escape(value3) +"; expires=" + expires.toGMTString();
		    document.cookie = key4 + "=" + escape(value4) +"; expires=" + expires.toGMTString();
		    document.cookie = key5 + "=" + escape(value5) +"; expires=" + expires.toGMTString();
		    document.cookie = key6 + "=" + escape(value6) +"; expires=" + expires.toGMTString();
		    console.log(document.cookie)
    
        // animation
        $(".LOGO").toggleClass("fadeout")
        $(".LOGO_back").toggleClass("fadeout")    
        $(".form_blank").toggleClass("fadeout")
        $(".btn--signin").toggleClass("fadeout")
        $(".form_option") .toggleClass("fadeout")   
        $(".bigleaf_front").toggleClass("bigleaf_front--floatup")
        $(".mom_dinosaur").show()
        $(".child").show()
        $(".id_choose").show()
        $(".form").hide()

        /*
        setTimeout(() => {
          document.location.href="./select.html"
        }, 2000)
         */
      }
      else {
        alert(list.text);
        //no id~
        //document.getElementById("name_input").value = "";
        //document.getElementById("password_input").value = "";
      }
    });
  });



  $('#parent_login').click(function(){
	  
    var pwd = $.trim($('#parent_pwd').val() );
		console.log(getCookie('parent_pwd'));
	  if(pwd == getCookie('parent_pwd')){
		  //alert('right password');
		  document.location.href='../loading.html';
  	}
    else{
		  alert('wrong parent\'s passwaord');
	  }
  });

});


function GoToParent(){
  key2 = "who";
  value2 = "parent";

  var expires = new Date();
  expires.setTime(expires.getTime()+10*60*1000 );//10 min
  document.cookie = key2 + "=" + escape(value2) +"; expires=" + expires.toGMTString();
  $(".child").toggleClass("fadeout")
  $(".choose--child").toggleClass("fadeout")
  $(".choose--child").css("display","none")
  $(".child").css("display","none")
  $(".parent_input").show()
  $(".parent_sure").show()
  //document.location.href="../loading.html";
}

function GoToChild(){
  
  key2 = "who";
  value2 = "child";

  var expires = new Date();
  expires.setTime(expires.getTime()+10*60*1000 );//10 min
  document.cookie = key2 + "=" + escape(value2) +"; expires=" + expires.toGMTString();
  document.location.href="../loading.html";
}

/*
  $('#typein button[type="submit"]').click(event => {
    event.preventDefault();

    //button animate
    console.log("sign in!!!")
    $.get('../html/signin', {
      name: $('#typein input[name=name]').val(),
      password: $('#typein input[name=password]').val(),
    
    }, data => {
	  console.log(data)
      var list = JSON.parse(data);
	  console.log(list)
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        //$('#id').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        //document.getElementById("typein").style.visibility = "hidden";
		
		deleteAllCookies();
		key1 = "ID";
		value1 = $('#typein input[name=name]').val();
		key3 = "parent_pwd";
		value3 = list.pwd;
		key4 = "nickname";
		value4 = list.nickname;
		key5 = "birthday";
		value5 = list.birthday;
		console.log(value4,value5)	
		var expires = new Date();
		expires.setTime(expires.getTime()+10*60*1000 );//10 min
		document.cookie = key1 + "=" + escape(value1) +"; expires=" + expires.toGMTString();
		document.cookie = key3 + "=" + escape(value3) +"; expires=" + expires.toGMTString();
		document.cookie = key4 + "=" + escape(value4) +"; expires=" + expires.toGMTString();
		document.cookie = key5 + "=" + escape(value5) +"; expires=" + expires.toGMTString();
		console.log(document.cookie)
		document.location.href="select.html";
      } else {
        alert(list.text);
        document.getElementById("name_input").value = "";
        document.getElementById("password_input").value = "";
      }
    });
  });
});
*/


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
