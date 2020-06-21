var random_question = 0;
var countdown_duration = 180;
var duration = countdown_duration;
var remain_time = 0;
var ans_isclear = 0;
var go_in = true;
var backPack_button = true;
var shop_button = true;
var refreshInterval;
var ans1_1 = false, ans1_2 = false, ans1_3 = false, ans1_4 = false, ans1_5 = false;
var ans2_1 = false, ans2_2 = false, ans2_3 = false, ans2_4 = false, ans2_5 = false;
var hat_01 = 0,hat_02 = 0;hat_03 = 0,hat_04 = 0;
var backpack_01 = true;
var childIsReady = 0,parentIsReady = 0;
var wip = "wss://" + window.location.host;
var socket = io(wip);



// for debugging
document.addEventListener('click', function(e){
    console.log(e.target);
}, false);


function swap_out(){
    $('#left_leaf').animate({left:-200, opacity:"0"}, 500);
    $('#mission_logo').animate({left:-200, opacity:"0"}, 500);
    $('#mission_text').animate({left:-200, opacity:"0"}, 500);
    $('#right_leaf').animate({right: -200, opacity:"0"}, 500);
    $('#training_logo').animate({right: -200, opacity:"0"}, 500);
    $('#training_text').animate({right: -200, opacity:"0"}, 500);
}

function swap_in(){
    $('#left_leaf').animate({left: "0vw", opacity:"1"}, 500);
    $('#mission_logo').animate({left: "11vw", opacity:"1"}, 500);
    $('#mission_text').animate({left: "9vw", opacity:"1"}, 500);
    $('#right_leaf').animate({right: "0vw", opacity:"1"}, 500);
    $('#training_logo').animate({right: "9.5vw", opacity:"1"}, 500);
    $('#training_text').animate({right: "7.8vw", opacity:"1"}, 500);
}

$('.right_selection').click(function(){ 
    swap_out();
    childIsReady = 0;
    parentIsReady = 0;
    $('information_box').fadeTo('slow',1);
    $('#subtitle_text_01').fadeTo('slow',1);
    $('#black_cover').fadeTo('slow',1);
    $('#button_01').fadeIn();
    $('#button_02').fadeOut();
    $('#button_03').fadeOut();
    $('#timer').fadeOut();    
});

/* 按鈕-我知道了 */
$('#button_01').click(function(){
    $('#findTheDifference').fadeIn();
    $('#jumpJumpGame').fadeIn();
    $('#subtitle_text_01').fadeOut();
    $('#subtitle_text_02').fadeIn();
    $('#black_cover').fadeOut();
    $('#button_01').fadeOut();
    $('#button_02').fadeIn();
    $('#button_03').fadeOut();
    $('#ass_dinasour').fadeOut();
    $('#dinasour').fadeOut();
  
});

/* 遊戲關卡1-找出不同點!!! */ 
$('#findTheDifference').click(function(){    
    $('#findTheDifference').fadeOut();
    $('#jumpJumpGame').fadeOut();
    $('information_box').fadeIn();
    $('#subtitle_text_03').fadeIn();
    $('#start_button').fadeIn();
    $('#button_02').fadeOut();
    $('#white_cover').fadeIn();
    $('#white_cover').fadeTo('opacity',"0.9");    
    if(random_question == 0){
        $('#fTD_question').fadeIn();
        document.getElementById("text_01").innerHTML = "第一關";
        random_question = 1;
    }
    else{
        $('#fTD_question2').fadeIn();
        document.getElementById("text_01").innerHTML = "第二關";
        random_question = 0;
    }                
});

/* 按鈕-返回　*/
$('#button_02').click(function(){
    swap_in();
    $('#subtitle_text_02').fadeOut();    
    $('information_box').fadeOut();
    $('#ass_dinasour').fadeIn();
    $('#dinasour').fadeIn();    
    $('#button_02').fadeOut();    
    $('#findTheDifference').fadeOut();
    $('#jumpJumpGame').fadeOut();    
});

/* 按鈕-遊戲關卡1開始按鍵*/ 
function start_game_animation(){   
    $('#start_button').fadeOut();
    $('#button_03').fadeIn();    
    $('#timer').fadeIn();
    $('#time').fadeIn();
    $('#white_cover').fadeOut();        
    if(random_question == 1){
        $('#fTD_question').fadeTo('slow',1);
        // the answers cannot use fadeOut because fadeOut will make it dissapear
        // but fadeTo('slow',0) will make it invisible and hide in the fTD_question        
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

/* 結束遊戲 */
$('#button_03').click(function(){    
    ans1_1 = false, ans1_2 = false, ans1_3 = false, ans1_4 = false, ans1_5 = false;
    ans2_1 = false, ans2_2 = false, ans2_3 = false, ans2_4 = false, ans2_5 = false;
    childIsReady = 0;
    parentIsReady = 0;
    socket.emit('game_over',{ID:getCookie('ID')});
    clearInterval(refreshInterval);
    swap_in();
    $('information_box').fadeOut();
    $('#subtitle_text_03').fadeOut();          
    $('#button_03').fadeOut();
    $('#ass_dinasour').fadeIn();
    $('#dinasour').fadeIn();        
    $('#timer').fadeOut();
    $('#time').fadeOut();
    $('#fTD_question').fadeOut();
    $('#fTD_question2').fadeOut();
    removeAns();
});

function startTimer(duration_time) {
    var timer = duration_time, seconds;   
    refreshInterval = setInterval(function () {
        seconds = parseInt(timer);        
        document.getElementById("time").innerHTML = seconds;
        if(timer > 0)
            timer--;
        if(check_answerIsCleared()){            
            remain_time = timer + 1;
            document.getElementById("result_text").innerHTML = (180-remain_time-1) + "秒";            
            var data = {
                time: 180-remain_time-1,
                id: getCookie('ID'),
                question: random_question
              }
              $.ajax({
                url: "./main",
                type: "GET",
                dataType: "json",
                data: data,
                success: function(response) {
                  // first
                  $('#ajax-output1').html(response.rank1)  
                  $('#ajax-output1').css("display","inline")
                  $('#ajax-output1').animate({opacity:"1"}, 50)
                  $('#output1-value').html(response.time1)
                  $('#output1-value').css("display","inline")
                  $('#output1-value').animate({opacity:"1"}, 50)
  
                  //second
                  if(response.test_time2!=200){
                    $('#ajax-output2').html(response.rank2)
                    $('#ajax-output2').css("display","inline")
                    $('#ajax-output2').animate({opacity:"1"}, 50)
                    $('#output2-value').html(response.time2) 
                    $('#output2-value').css("display","inline")
                    $('#output2-value').animate({opacity:"1"}, 50)
                  }
  
                  if(response.test_time3!=200){
                  $('#ajax-output3').html(response.rank3)
                  $('#ajax-output3').css("display","inline")
                  $('#ajax-output3').animate({opacity:"1"}, 50)
                  $('#output3-value').html(response.time3)
                  $('#output3-value').css("display","inline")
                  $('#output3-value').animate({opacity:"1"}, 50)
                  }
                }
              })
                ending_function();
        }
        if(timer <= 0 && go_in){            
            remain_time = 0;                
            ending_function();
            document.getElementById("result_text").innerHTML = (180-remain_time-1) + "秒";            
            go_in = false;
        }
    }, 1000);
}

function check_answerIsCleared(){
    if((ans1_1 && ans1_2 && ans1_3 && ans1_4 && ans1_5) || (ans2_1 && ans2_2 && ans2_3 && ans2_4 && ans2_5))
        return true;    
    return false;
}

function ending_function(){
    ans1_1 = false, ans1_2 = false, ans1_3 = false, ans1_4 = false, ans1_5 = false;
    ans2_1 = false, ans2_2 = false, ans2_3 = false, ans2_4 = false, ans2_5 = false;
    childIsReady = 0;
    parentIsReady = 0;
    clearInterval(refreshInterval);
    $('#timer').fadeOut();
    $('#time').fadeOut();
    $('information_box').fadeOut();
    $('#subtitle_text_03').fadeOut();
    $('#fTD_question').fadeOut();
    $('#fTD_question2').fadeOut();    
    $('#ok_button').fadeIn();
    $('#button_03').fadeOut();    
    $('#share_button').fadeIn();
    $('#text_01').fadeIn();
    $('#text_02').fadeIn();
    $('#text_03').fadeIn();
    //$('#text_04').fadeIn();
    $('#result_text').fadeIn();
    $('#result_list').fadeIn();
    $('#rank_list').fadeIn();
    $('#footstep_01').fadeIn();
    $('#footstep_02').fadeIn();
    $('#footstep_03').fadeIn();        
    removeAns();                                       
    clearInterval(refreshInterval);
}

$('#ok_button').click(function(){       
    swap_in(); 
    $('#ass_dinasour').fadeIn();
    $('#dinasour').fadeIn();   
    $('#ok_button').fadeOut();
    $('#share_button').fadeOut();
    $('#text_01').fadeOut();
    $('#text_02').fadeOut();
    $('#text_03').fadeOut();
    //$('#text_04').fadeOut();
    $('#ajax-output1').hide();  // modify
    $('#ajax-output2').hide();
    $('#ajax-output3').hide();
    $('#output1-value').hide();
    $('#output2-value').hide();
    $('#output3-value').hide();
    $('#result_text').fadeOut();
    $('#result_list').fadeOut();
    $('#rank_list').fadeOut();
    $('#footstep_01').fadeOut();
    $('#footstep_02').fadeOut();
    $('#footstep_03').fadeOut();
    $('#black_cover').fadeOut();                  
});

function removeAns() {
    $('#answer1_01').fadeOut();
    $('#answer1_02').fadeOut();
    $('#answer1_03').fadeOut();
    $('#answer1_04').fadeOut();
    $('#answer1_05').fadeOut();
    $('#answer1_06').fadeOut();
    $('#answer1_07').fadeOut();
    $('#answer1_08').fadeOut();
    $('#answer1_09').fadeOut();
    $('#answer1_10').fadeOut();
    $('#answer2_01').fadeOut();
    $('#answer2_02').fadeOut();
    $('#answer2_03').fadeOut();
    $('#answer2_04').fadeOut();
    $('#answer2_05').fadeOut();
    $('#answer2_06').fadeOut();
    $('#answer2_07').fadeOut();
    $('#answer2_08').fadeOut();
    $('#answer2_09').fadeOut();
    $('#answer2_10').fadeOut();
}

$('#answer1_01').click(function(){
    if(!ans1_1){
        socket.emit('ans1_1', {ID: getCookie('ID')});
        $('#answer1_01').fadeTo('slow',1);
        $('#answer1_02').fadeTo('slow',1);        
        ans1_1 = true;
    }
});
$('#answer1_02').click(function(){        
    if(!ans1_1){
        socket.emit('ans1_1', {ID:getCookie('ID')});
        $('#answer1_01').fadeTo('slow',1);
        $('#answer1_02').fadeTo('slow',1);        
        ans1_1 = true;
    }
});
$('#answer1_03').click(function(){
    if(!ans1_2){
        socket.emit('ans1_2', {ID:getCookie('ID')});
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);                
        ans1_2 = true;
    }
});
$('#answer1_04').click(function(){        
    if(!ans1_2){
        socket.emit('ans1_2', {ID:getCookie('ID')});
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);            
        ans1_2 = true;
    }
});
$('#answer1_05').click(function(){        
    if(!ans1_3){
        socket.emit('ans1_3', {ID:getCookie('ID')});
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);                
        ans1_3 = true;
    }
});
$('#answer1_06').click(function(){        
    if(!ans1_3){
        socket.emit('ans1_3', {ID:getCookie('ID')});
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);        
        ans1_3 = true;
    }
});
$('#answer1_07').click(function(){        
    if(!ans1_4){
        socket.emit('ans1_4', {ID:getCookie('ID')});
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);                
        ans1_4 = true;
    }
});
$('#answer1_08').click(function(){        
    if(!ans1_4){
        socket.emit('ans1_4', {ID:getCookie('ID')});
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);                
        ans1_4 = true;
    }
});
$('#answer1_09').click(function(){        
    if(!ans1_5){
        socket.emit('ans1_5', {ID:getCookie('ID')});
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);                
        ans1_5 = true;
    }
});
$('#answer1_10').click(function(){        
    if(!ans1_5){
        socket.emit('ans1_5', {ID:getCookie('ID')});
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);                
        ans1_5 = true;
    }
});

$('#answer2_01').click(function(){
    if(!ans2_1){
        socket.emit('ans2_1', {ID:getCookie('ID')});
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);        
        ans2_1 = true; 
    }
});
$('#answer2_02').click(function(){
    if(!ans2_1){
        socket.emit('ans2_1', {ID:getCookie('ID')});
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);        
        ans2_1 = true;    
    }
});
$('#answer2_03').click(function(){
    if(!ans2_2){
        socket.emit('ans2_2', {ID:getCookie('ID')});
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);        
        ans2_2 = true;
    }
});
$('#answer2_04').click(function(){
    if(!ans2_2){
        socket.emit('ans2_2', {ID:getCookie('ID')});
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);
        ans2_2 = true;
    }
});
$('#answer2_05').click(function(){
    if(!ans2_3){
        socket.emit('ans2_3', {ID:getCookie('ID')});
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);        
        ans2_3 = true;
    }
});
$('#answer2_06').click(function(){
    if(!ans2_3){
        socket.emit('ans2_3', {ID:getCookie('ID')});
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);        
        ans2_3 = true;
    }
});
$('#answer2_07').click(function(){
    if(!ans2_4){
        socket.emit('ans2_4', {ID:getCookie('ID')});
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);        
        ans2_4 = true;
    }
});
$('#answer2_08').click(function(){
    if(!ans2_4){
        socket.emit('ans2_4', {ID:getCookie('ID')});
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);
        ans2_4 = true;
    }
});
$('#answer2_09').click(function(){
    if(!ans2_5){
        socket.emit('ans2_5', {ID:getCookie('ID')});
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);        
        ans2_5 = true; 
    }
});
$('#answer2_10').click(function(){
    if(!ans2_5){
        socket.emit('ans2_5', {ID:getCookie('ID')});
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);        
        ans2_5 = true;
    }
});

socket.on('fuckyou', function(data){
  if(data.ID == getCookie('ID')){
    alert('I am fucked');
  }
})


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
        ans1_1 = true;
    }
})

socket.on('ans1_2_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_03').fadeTo('slow',1);
        $('#answer1_04').fadeTo('slow',1);                
        ans1_2 = true;
    }
})

socket.on('ans1_3_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_05').fadeTo('slow',1);
        $('#answer1_06').fadeTo('slow',1);        
        ans1_3 = true;
    }
})

socket.on('ans1_4_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_07').fadeTo('slow',1);
        $('#answer1_08').fadeTo('slow',1);                
        ans1_4 = true;
    }
})

socket.on('ans1_5_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer1_09').fadeTo('slow',1);
        $('#answer1_10').fadeTo('slow',1);                
        ans1_5 = true;
    }
})

socket.on('ans2_1_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_01').fadeTo('slow',1);
        $('#answer2_02').fadeTo('slow',1);                
        ans2_1 = true;
    }
})

socket.on('ans2_2_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_03').fadeTo('slow',1);
        $('#answer2_04').fadeTo('slow',1);                
        ans2_2 = true;
    }
})

socket.on('ans2_3_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_05').fadeTo('slow',1);
        $('#answer2_06').fadeTo('slow',1);                
        ans2_3 = true;
    }
})

socket.on('ans2_4_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_07').fadeTo('slow',1);
        $('#answer2_08').fadeTo('slow',1);                
        ans2_4 = true;
    }
})

socket.on('ans2_5_toClient', function(data){
    if(data.ID == getCookie('ID')){
        $('#answer2_09').fadeTo('slow',1);
        $('#answer2_10').fadeTo('slow',1);                
        ans2_5 = true;
    }
})

socket.on('game_over_toClient', function(data){
    if(data.ID == getCookie('ID')){
        game_over();
    }
})

function game_over(){
    ans1_1 = false, ans1_2 = false, ans1_3 = false, ans1_4 = false, ans1_5 = false;
    ans2_1 = false, ans2_2 = false, ans2_3 = false, ans2_4 = false, ans2_5 = false;
    childIsReady = 0;
    parentIsReady = 0;
    clearInterval(refreshInterval);
    socket.emit('game_over',{ID:getCookie('ID')});
    $('#ass_dinasour').fadeIn();
    $('#dinasour').fadeIn();
    $('#start_button').fadeOut();
    $('#timer').fadeOut();
    $('#time').fadeOut();
    swap_in();
    removeAns();
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


$('#hat_01').click(function(){
    console.log("hat_01:"+hat_01);
    if(hat_01 == 0){
        $('#hat_model_02').fadeOut();
        $('#hat_model_03').fadeOut();
        $('#hat_model_04').fadeOut();
        $('#hat_model_04_02').fadeOut();
        $('#hat_model_01').fadeIn();
        hat_01 = 1;hat_02 = 0;   
        hat_03 = 0;hat_04 = 0;
    }
    else{
        $('#hat_model_01').fadeOut();
        hat_01 = 0;                
    }
});

$('#hat_02').click(function(){
    console.log("hat_02:"+hat_02);
    if(hat_02 == 0){
        $('#hat_model_01').fadeOut();
        $('#hat_model_03').fadeOut();
        $('#hat_model_04').fadeOut();
        $('#hat_model_04_02').fadeOut();
        $('#hat_model_02').fadeIn();
        hat_01 = 0;hat_02 = 1;        
        hat_03 = 0;hat_04 = 0;        
    }
    else{
        $('#hat_model_02').fadeOut();
        hat_02 = 0;                
    }
});

$('#hat_03').click(function(){
    console.log("hat_03:"+hat_03);
    if(hat_03 == 0){
        $('#hat_model_01').fadeOut();
        $('#hat_model_02').fadeOut();
        $('#hat_model_04').fadeOut();
        $('#hat_model_04_02').fadeOut();
        $('#hat_model_03').fadeIn();
        hat_01 = 0;hat_02 = 0;        
        hat_03 = 1;hat_04 = 0;        
    }
    else{
        $('#hat_model_03').fadeOut();
        hat_03 = 0;                
    }
});

$('#hat_04').click(function(){
    console.log("hat_04:"+hat_04);
    if(hat_04 == 0){
        $('#hat_model_01').fadeOut();
        $('#hat_model_02').fadeOut();
        $('#hat_model_03').fadeOut();
        $('#hat_model_04').fadeIn();
        $('#hat_model_04_02').fadeIn();
        hat_01 = 1;hat_02 = 0;        
        hat_03 = 0;hat_04 = 1;        
    }
    else{
        $('#hat_model_04').fadeOut();
        $('#hat_model_04_02').fadeOut();
        hat_04 = 0;                
    }
});

$('#price_01').click(function(){        
    $('#purchase_page_01').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();           
});

$('#price_02').click(function(){        
    $('#purchase_page_02').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();           
});

$('#price_03').click(function(){        
    $('#purchase_page_03').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();           
});

$('#price_04').click(function(){        
    $('#purchase_page_04').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});

$('#close_button').click(function(){    
    $('#purchase_page_01').fadeOut();
    $('#purchase_page_02').fadeOut();
    $('#purchase_page_03').fadeOut();
    $('#purchase_page_04').fadeOut();
    $('#purchase_button').fadeOut();
    $('#close_button').fadeOut();        
});

$('#shop').click(function(){
    if(shop_button){
        $('shop').fadeIn(500);
        swap_out();
        shop_button = false;
    }         
});

$('#shop_closeButton').click(function(){
    if(!shop_button){   
        $('shop').fadeOut(500);
        swap_in();
        shop_button = true;
    }        
});

$('#backpack').click(function(){
    if(backPack_button){
        $('backpack').fadeIn(500);
        swap_out();
        backPack_button = false;
    }    
});

$('#backpack_closeButton').click(function(){
    if(!backPack_button){    
        $('backpack').fadeOut(500);
        swap_in();
        backPack_button = true;
    }
});

$('#backpack_01').click(function(){
    console.log("check");
    if(backpack_01){
        $('#bp_01').fadeIn();
        $('#bp_01_02').fadeIn();
        backpack_01 = false;        
    }
    else{
        $('#bp_01').fadeOut();
        $('#bp_01_02').fadeOut();
        backpack_01 = true;
    }
});

