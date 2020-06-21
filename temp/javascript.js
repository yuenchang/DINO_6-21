var wip = "ws://"+window.location.host;
var socket = io(wip);
var random_question = 0;
var countdown_duration = 180;
var duration = countdown_duration;
var remain_time = 0;
var ans_isclear = 0;
var go_in = true;
var refreshInterval;
var ans1_1 = 0,ans1_2 = 0;ans1_3 = 0;ans1_4 = 0;ans1_5 = 0;
var ans2_1 = 0,ans2_2 = 0;ans2_3 = 0;ans2_4 = 0;ans2_5 = 0;
var childIsReady = 0,parentIsReady = 0;

var wip = "wss://" + window.location.host;
var socket = io(wip);

$(document).ready(function () {

})


$('.right_selection').click(function(){ 
    childIsReady = 0;
    parentIsReady = 0;
    $('#left_leaf').animate({left:-200, opacity:"0"}, 500);
    $('#mission_logo').animate({left:-200, opacity:"0"}, 500);
    $('#mission_text').animate({left:-200, opacity:"0"}, 500);
    $('#right_leaf').animate({right: -200, opacity:"0"}, 500);
    $('#training_logo').animate({right: -200, opacity:"0"}, 500);
    $('#training_text').animate({right: -200, opacity:"0"}, 500);
    $('.information_box').fadeTo('slow',1);  
    $('#subtitle_text_01').fadeTo('slow',1);
    $('#button_01').fadeTo('slow',1);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "5");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");    
    $('#timer').css("display", "none");    
    $('#black_cover').css("display", "none");
});

/* 我知道了 */
$('#button_01').click(function(){
    $('#subtitle_text_01').fadeTo('slow',0);    
    $('#subtitle_text_02').fadeTo('slow',1);    
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',1);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "5");
    $('#button_03').css("z-index", "0");
    $('#ass_dinasour').css("display","none");
    $('#dinasour').css("display","none");
    // $('.information_box').animate({bottom:"-2.5vh",opacity:"1"});    
    $('#findTheDifference').fadeTo('slow',1);
    $('#findTheDifference').css("z-index","10");
    $('#jumpJumpGame').fadeTo('slow',1);
    $('#black_cover').css("display", "none");     
});

/* 返回　*/
$('#button_02').click(function(){
    $('#subtitle_text_02').fadeTo('slow',0);
    $('#subtitle_text_01').css("display","none");
    $('#subtitle_text_02').css("display","none");
    $('#subtitle_text_03').css("display","none");
    $('.information_box').css("display","none");
    $('#black_cover').css("display", "none");
    $('#ass_dinasour').fadeTo('slow',1);
    $('#dinasour').fadeTo('slow',1);
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");
    $('#findTheDifference').fadeTo('slow',0);
    $('#jumpJumpGame').fadeTo('slow',0);
    $('#left_leaf').animate({left: "0vw", opacity:"1"}, 500);
    $('#mission_logo').animate({left: "11vw", opacity:"1"}, 500);
    $('#mission_text').animate({left: "9vw", opacity:"1"}, 500);
    $('#right_leaf').animate({right: "0vw", opacity:"1"}, 500);
    $('#training_logo').animate({right: "9.5vw", opacity:"1"}, 500);
    $('#training_text').animate({right: "7.8vw", opacity:"1"}, 500);
    $('#ok_button').hide();
    $('#share_button').hide();
    $('#text_01').hide();
    $('#text_02').hide();
    $('#text_03').hide();
    $('#text_04').hide();
    $('#result_text').hide();
    $('#result_list').hide();
    $('#rank_list').hide();
    $('#footstep_01').hide();
    $('#footstep_02').hide();
    $('#footstep_03').hide();
    
});

/* 找茬 */ 
$('#findTheDifference').click(function(){    
    $('#findTheDifference').fadeTo('slow',0);
    $('#jumpJumpGame').fadeTo('slow',0);
    $('.information_box').fadeTo('slow',1);
    $('#subtitle_text_03').fadeTo('slow',1);        
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");
    if(random_question == 0){
        $('#fTD_question').fadeTo('slow',1);
        document.getElementById("text_01").innerHTML = "第一關";
        random_question = 1;
    }
    else{
        $('#fTD_question2').fadeTo('slow',1);
        document.getElementById("text_01").innerHTML = "第二關";
        random_question = 0;
    }
    $('#white_cover').fadeTo('slow',1);
    $('#white_cover').fadeTo('opacity',"0.9");
    $('#white_cover').css("z-index", "5");
    $('#start_button').fadeTo('slow',1);
    $('#start_button').css("z-index", "5");
        
});

/* start_button */ 
// $('#start_button').click(function(){ 
    // self = 1;    
    // socket.emit('start_game',{ID: getCookie('ID')});
    // console.log("self is ready");
    //當兩個人都準備好的時候,才開始遊戲
    
// });

/* 結束遊戲 */
$('#button_03').click(function(){    
    ans1_1 = 0,ans1_2 = 0;ans1_3 = 0;ans1_4 = 0;ans1_5 = 0;
    ans2_1 = 0,ans2_2 = 0;ans2_3 = 0;ans2_4 = 0;ans2_5 = 0;
    childIsReady = 0;
    parentIsReady = 0;
    clearInterval(refreshInterval);
    socket.emit('game_over',{ID:getCookie('ID')});
    $('#subtitle_text_01').css("display","none");
    $('#subtitle_text_02').css("display","none");
    $('#subtitle_text_03').css("display","none");
    $('.information_box').css("display","none");           
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");    
    $('#ass_dinasour').fadeTo('slow',1);
    $('#dinasour').fadeTo('slow',1);
    $('#start_button').fadeTo('slow',0);
    $('#start_button').css("z-index", "0");
    $('#left_leaf').animate({left: "0vw", opacity:"1"}, 500);
    $('#mission_logo').animate({left: "11vw", opacity:"1"}, 500);
    $('#mission_text').animate({left: "9vw", opacity:"1"}, 500);
    $('#right_leaf').animate({right: "0vw", opacity:"1"}, 500);
    $('#training_logo').animate({right: "9.5vw", opacity:"1"}, 500);
    $('#training_text').animate({right: "7.8vw", opacity:"1"}, 500);
    $('#timer').css("display","none");
    $('#time').css("display","none");
    $('#ok_button').hide();
    $('#share_button').hide();
    $('#text_01').hide();
    $('#text_02').hide();
    $('#text_03').hide();
    $('#text_04').hide();
    $('#result_text').hide();
    $('#result_list').hide();
    $('#rank_list').hide();
    $('#footstep_01').hide();
    $('#footstep_02').hide();
    $('#footstep_03').hide();
    $('#black_cover').hide();
    $('#fTD_question').css("display", "none");
    $('#fTD_question2').css("display", "none");
    $('#white_cover').css("display", "none");
    $('#black_cover').css("display", "none");
    $('#start_button').css("display", "none");
    $('#button_03').css("display", "none");
    $('#answer1_01').css("display","none");
    $('#answer1_02').css("display","none");
    $('#answer1_03').css("display","none");
    $('#answer1_04').css("display","none");
    $('#answer1_05').css("display","none");
    $('#answer1_06').css("display","none");
    $('#answer1_07').css("display","none");
    $('#answer1_08').css("display","none");
    $('#answer1_09').css("display","none");
    $('#answer1_10').css("display","none");
    $('#answer2_01').css("display","none");
    $('#answer2_02').css("display","none");
    $('#answer2_03').css("display","none");
    $('#answer2_04').css("display","none");
    $('#answer2_05').css("display","none");
    $('#answer2_06').css("display","none");
    $('#answer2_07').css("display","none");
    $('#answer2_08').css("display","none");
    $('#answer2_09').css("display","none");
    $('#answer2_10').css("display","none");
    
});

function startTimer(duration_time) {
    var timer = duration_time, seconds;   
    refreshInterval = setInterval(function () {
        seconds = parseInt(timer);        
        document.getElementById("time").innerHTML = seconds;
        if(timer > 0)
            timer--;
        if((ans1_1 == 1 && ans1_2 == 1 && ans1_3 == 1 && ans1_4 == 1 && ans1_5 == 1)||(ans2_1 == 1 && ans2_2 == 1 && ans2_3 == 1 && ans2_4 == 1 && ans2_5 == 1)){
            ans_isclear = 0;
            remain_time = timer + 1;
            document.getElementById("result_text").innerHTML = (180-remain_time-1) + "秒";
            //duration = countdown_duration;
            ending_function();
        }
        if(timer <= 0 && go_in){
            ans_isclear = 0;
            remain_time = 0;                
            ending_function();
            document.getElementById("result_text").innerHTML = (180-remain_time-1) + "秒";
            //duration = countdown_duration;
            go_in = false;
        }
    }, 1000);
}

function ending_function(){
    socket.emit('game_over',{ID:getCookie('ID')});
    ans1_1 = 0,ans1_2 = 0;ans1_3 = 0;ans1_4 = 0;ans1_5 = 0;
    ans2_1 = 0,ans2_2 = 0;ans2_3 = 0;ans2_4 = 0;ans2_5 = 0;
    childIsReady = 0;
    parentIsReady = 0;
    clearInterval(refreshInterval);
    $('#timer').fadeTo('slow',0);
    $('#time').fadeTo('slow',0);
    $('.information_box').fadeTo('slow',0);       
    $('#subtitle_text_03').fadeTo('slow',0);           
    $('#fTD_question').css("display", "none");
    $('#fTD_question2').css("display", "none");
    $('#white_cover').css("display", "none");       
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");    
    $('#ok_button').css("z-index","5");
    $('#share_button').css("z-index","5");
    $('#ok_button').fadeTo('slow',1);
    $('#share_button').fadeTo('slow',1);
    $('#text_01').fadeTo('slow',1);
    $('#text_02').fadeTo('slow',1);
    $('#text_03').fadeTo('slow',1);
    $('#text_04').fadeTo('slow',1);
    $('#result_text').fadeTo('slow',1);
    $('#result_list').fadeTo('slow',1);
    $('#rank_list').fadeTo('slow',1);
    $('#footstep_01').fadeTo('slow',1);
    $('#footstep_02').fadeTo('slow',1);
    $('#footstep_03').fadeTo('slow',1);
    $('#findTheDifference').css("display","none");
    $('#white_cover').css("display","none");
    $('#start_button').css("display","none");
    $('#answer1_01').css("display","none");
    $('#answer1_02').css("display","none");
    $('#answer1_03').css("display","none");
    $('#answer1_04').css("display","none");
    $('#answer1_05').css("display","none");
    $('#answer1_06').css("display","none");
    $('#answer1_07').css("display","none");
    $('#answer1_08').css("display","none");
    $('#answer1_09').css("display","none");
    $('#answer1_10').css("display","none");
    $('#answer2_01').css("display","none");
    $('#answer2_02').css("display","none");
    $('#answer2_03').css("display","none");
    $('#answer2_04').css("display","none");
    $('#answer2_05').css("display","none");
    $('#answer2_06').css("display","none");
    $('#answer2_07').css("display","none");
    $('#answer2_08').css("display","none");
    $('#answer2_09').css("display","none");
    $('#answer2_10').css("display","none");
    
                                       

    clearInterval(refreshInterval);
}

$('#ok_button').click(function(){        
    $('#ass_dinasour').fadeTo('slow',1);
    $('#dinasour').fadeTo('slow',1);
    $('#subtitle_text_01').css("display","none");
    $('#subtitle_text_02').css("display","none");
    $('#subtitle_text_03').css("display","none");
    $('.information_box').css("display","none");
    $('#left_leaf').animate({left: "0vw", opacity:"1"}, 500);
    $('#mission_logo').animate({left: "11vw", opacity:"1"}, 500);
    $('#mission_text').animate({left: "9vw", opacity:"1"}, 500);
    $('#right_leaf').animate({right: "0vw", opacity:"1"}, 500);
    $('#training_logo').animate({right: "9.5vw", opacity:"1"}, 500);
    $('#training_text').animate({right: "7.8vw", opacity:"1"}, 500);
    $('#ok_button').hide();
    $('#share_button').hide();
    $('#text_01').hide();
    $('#text_02').hide();
    $('#text_03').hide();
    $('#text_04').hide();
    $('#result_text').hide();
    $('#result_list').hide();
    $('#rank_list').hide();
    $('#footstep_01').hide();
    $('#footstep_02').hide();
    $('#footstep_03').hide();
    $('#black_cover').hide();
    $('#findTheDifference').hide();
    $('#jumpJumpGame').hide();
    $('#start_button').hide();            
});

// for debugging
document.addEventListener('click', function(e){
    console.log(e.target);
  }, false);


$('#answer1_01').click(function(){
    if(ans1_1 == 0){
        socket.emit('ans1_1', {ID: getCookie('ID')});
        $('#answer1_01').fadeTo('slow',1);
        $('#answer1_02').fadeTo('slow',1);
        ans_isclear++;
        ans1_1 = 1;
    }
});
$('#answer1_02').click(function(){        
    if(ans1_1 == 0){
        socket.emit('ans1_1', {ID:getCookie('ID')});
        $('#answer1_01').fadeTo('slow',1);
        $('#answer1_02').fadeTo('slow',1);        
        ans_isclear++;
        ans1_1 = 1;
    }
});
$('#answer1_03').click(function(){
    if(ans1_2 == 0){
        socket.emit('ans1_2', {ID:getCookie('ID')});
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);        
        ans_isclear++;
        ans1_2 = 1;
    }
});
$('#answer1_04').click(function(){        
    if(ans1_2 == 0){
        socket.emit('ans1_2', {ID:getCookie('ID')});
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);        
        ans_isclear++;
        ans1_2 = 1;
    }
});
$('#answer1_05').click(function(){        
    if(ans1_3 == 0){
        socket.emit('ans1_3', {ID:getCookie('ID')});
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);        
        ans_isclear++;
        ans1_3 = 1;
    }
});
$('#answer1_06').click(function(){        
    if(ans1_3 == 0){
        socket.emit('ans1_3', {ID:getCookie('ID')});
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);        
        ans_isclear++;
        ans1_3 = 1;
    }
});
$('#answer1_07').click(function(){        
    if(ans1_4 == 0){
        socket.emit('ans1_4', {ID:getCookie('ID')});
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);        
        ans_isclear++;
        ans1_4 = 1;
    }
});
$('#answer1_08').click(function(){        
    if(ans1_4 == 0){
        socket.emit('ans1_4', {ID:getCookie('ID')});
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);        
        ans_isclear++;
        ans1_4 = 1;
    }
});
$('#answer1_09').click(function(){        
    if(ans1_5 == 0){
        socket.emit('ans1_5', {ID:getCookie('ID')});
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);        
        ans_isclear++;
        ans1_5 = 1;
    }
});
$('#answer1_10').click(function(){        
    if(ans1_5 == 0){
        socket.emit('ans1_5', {ID:getCookie('ID')});
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);        
        ans_isclear++;
        ans1_5 = 1;
    }
});

$('#answer2_01').click(function(){
    if(ans2_1 == 0){
        socket.emit('ans2_1', {ID:getCookie('ID')});
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);
        ans_isclear++;
        ans2_1 = 1;    
    }
});
$('#answer2_02').click(function(){
    if(ans2_1 == 0){
        socket.emit('ans2_1', {ID:getCookie('ID')});
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);
        ans_isclear++;
        ans2_1 = 1;    
    }
});
$('#answer2_03').click(function(){
    if(ans2_2 == 0){
        socket.emit('ans2_2', {ID:getCookie('ID')});
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);
        ans_isclear++;
        ans2_2 = 1;    
    }
});
$('#answer2_04').click(function(){
    if(ans2_2 == 0){
        socket.emit('ans2_2', {ID:getCookie('ID')});
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);
        ans_isclear++;
        ans2_2 = 1;    
    }
});
$('#answer2_05').click(function(){
    if(ans2_3 == 0){
        socket.emit('ans2_3', {ID:getCookie('ID')});
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);
        ans_isclear++;
        ans2_3 = 1;    
    }
});
$('#answer2_06').click(function(){
    if(ans2_3 == 0){
        socket.emit('ans2_3', {ID:getCookie('ID')});
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);
        ans_isclear++;
        ans2_3 = 1;    
    }
});
$('#answer2_07').click(function(){
    if(ans2_4 == 0){
        socket.emit('ans2_4', {ID:getCookie('ID')});
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);
        ans_isclear++;
        ans2_4 = 1;    
    }
});
$('#answer2_08').click(function(){
    if(ans2_4 == 0){
        socket.emit('ans2_4', {ID:getCookie('ID')});
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);
        ans_isclear++;
        ans2_4 = 1;    
    }
});
$('#answer2_09').click(function(){
    if(ans2_5 == 0){
        socket.emit('ans2_5', {ID:getCookie('ID')});
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);
        ans_isclear++;
        ans2_5 = 1;    
    }
});
$('#answer2_10').click(function(){
    if(ans2_5 == 0){
        socket.emit('ans2_5', {ID:getCookie('ID')});
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);
        ans_isclear++;
        ans2_5 = 1;    
    }
});


socket.on('p_both_ready', function(data){      
    console.log("p_both_ready");        
    if(data.ID == getCookie('ID')){
        start_game_animation();
    }
})

socket.on('c_both_ready', function(data){    
    console.log("c_both_ready");
    if(data.ID == getCookie('ID')){
        start_game_animation();
    }        
})

socket.on('ans1_1_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_01').fadeTo('slow',1);
        $('#answer1_02').fadeTo('slow',1);        
        ans_isclear++;
        ans1_1 = 1;
    }
})

socket.on('ans1_2_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);        
        ans_isclear++;
        ans1_2 = 1;
    }
})

socket.on('ans1_3_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);        
        ans_isclear++;
        ans1_3 = 1;
    }
})

socket.on('ans1_4_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);        
        ans_isclear++;
        ans1_4 = 1;
    }
})

socket.on('ans1_5_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);        
        ans_isclear++;
        ans1_5 = 1;
    }
})

socket.on('ans2_1_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);        
        ans_isclear++;
        ans2_1 = 1;
    }
})

socket.on('ans2_2_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);        
        ans_isclear++;
        ans2_2 = 1;
    }
})

socket.on('ans2_3_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);        
        ans_isclear++;
        ans2_3 = 1;
    }
})

socket.on('ans2_4_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);        
        ans_isclear++;
        ans2_4 = 1;
    }
})

socket.on('ans2_5_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);        
        ans_isclear++;
        ans2_5 = 1;
    }
})

socket.on('game_over_toClient', function(data){
    if(data.ID == getCookie('ID')){
        game_over();
    }
})



function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function start_game_animation(){
    $('#start_button').css("display", "none");    
    $('#button_03').fadeTo('slow',1);
    $('#button_03').css("z-index", "5");
    $('#timer').fadeTo('slow',1);
    $('#time').fadeTo('slow',1);
    $('#white_cover').css("display", "none");    
    $('#black_cover').css("display", "none");    
    $('#findTheDifference').css("display", "none");
    $('#jumpJumpGame').css("display", "none");
    $('#ass_dinasour').css("display", "none");
    $('#dinasour').css("display", "none");

    if(random_question == 1){
        $('#fTD_question').fadeTo('slow',1);    
        $('#answer1_01').fadeTo('slow',0);    
        $('#answer1_02').fadeTo('slow',0);                                    
        $('#answer1_03').fadeTo('slow',0);    
        $('#answer1_04').fadeTo('slow',0);                                    
        $('#answer1_05').fadeTo('slow',0);    
        $('#answer1_06').fadeTo('slow',0);                                    
        $('#answer1_07').fadeTo('slow',0);    
        $('#answer1_08').fadeTo('slow',0);                                    
        $('#answer1_09').fadeTo('slow',0);    
        $('#answer1_10').fadeTo('slow',0);                                        
    }
    else{
        $('#fTD_question2').fadeTo('slow',1);            
        $('#answer2_01').fadeTo('slow',0);    
        $('#answer2_02').fadeTo('slow',0);                                    
        $('#answer2_03').fadeTo('slow',0);    
        $('#answer2_04').fadeTo('slow',0);                                    
        $('#answer2_05').fadeTo('slow',0);    
        $('#answer2_06').fadeTo('slow',0);                                    
        $('#answer2_07').fadeTo('slow',0);    
        $('#answer2_08').fadeTo('slow',0);                                    
        $('#answer2_09').fadeTo('slow',0);    
        $('#answer2_10').fadeTo('slow',0);  
    }    
    startTimer(duration);
}

function game_over(){
    ans1_1 = 0,ans1_2 = 0;ans1_3 = 0;ans1_4 = 0;ans1_5 = 0;
    ans2_1 = 0,ans2_2 = 0;ans2_3 = 0;ans2_4 = 0;ans2_5 = 0;
    childIsReady = 0;
    parentIsReady = 0;
    clearInterval(refreshInterval);
    socket.emit('game_over',{ID:getCookie('ID')});
    $('#subtitle_text_01').css("display","none");
    $('#subtitle_text_02').css("display","none");
    $('#subtitle_text_03').css("display","none");
    $('.information_box').css("display","none");           
    $('#button_01').fadeTo('slow',0);
    $('#button_02').fadeTo('slow',0);
    $('#button_03').fadeTo('slow',0);
    $('#button_01').css("z-index", "0");
    $('#button_02').css("z-index", "0");
    $('#button_03').css("z-index", "0");    
    $('#ass_dinasour').fadeTo('slow',1);
    $('#dinasour').fadeTo('slow',1);
    $('#start_button').fadeTo('slow',0);
    $('#start_button').css("z-index", "0");
    $('#left_leaf').animate({left: "0vw", opacity:"1"}, 500);
    $('#mission_logo').animate({left: "11vw", opacity:"1"}, 500);
    $('#mission_text').animate({left: "9vw", opacity:"1"}, 500);
    $('#right_leaf').animate({right: "0vw", opacity:"1"}, 500);
    $('#training_logo').animate({right: "9.5vw", opacity:"1"}, 500);
    $('#training_text').animate({right: "7.8vw", opacity:"1"}, 500);
    $('#timer').css("display","none");
    $('#time').css("display","none");
    $('#ok_button').hide();
    $('#share_button').hide();
    $('#text_01').hide();
    $('#text_02').hide();
    $('#text_03').hide();
    $('#text_04').hide();
    $('#result_text').hide();
    $('#result_list').hide();
    $('#rank_list').hide();
    $('#footstep_01').hide();
    $('#footstep_02').hide();
    $('#footstep_03').hide();
    $('#black_cover').hide();
    $('#fTD_question').css("display", "none");
    $('#fTD_question2').css("display", "none");
    $('#white_cover').css("display", "none");
    $('#black_cover').css("display", "none");
    $('#start_button').css("display", "none");
    $('#button_03').css("display", "none");
    $('#answer1_01').css("display","none");
    $('#answer1_02').css("display","none");
    $('#answer1_03').css("display","none");
    $('#answer1_04').css("display","none");
    $('#answer1_05').css("display","none");
    $('#answer1_06').css("display","none");
    $('#answer1_07').css("display","none");
    $('#answer1_08').css("display","none");
    $('#answer1_09').css("display","none");
    $('#answer1_10').css("display","none");
    $('#answer2_01').css("display","none");
    $('#answer2_02').css("display","none");
    $('#answer2_03').css("display","none");
    $('#answer2_04').css("display","none");
    $('#answer2_05').css("display","none");
    $('#answer2_06').css("display","none");
    $('#answer2_07').css("display","none");
    $('#answer2_08').css("display","none");
    $('#answer2_09').css("display","none");
    $('#answer2_10').css("display","none");
}