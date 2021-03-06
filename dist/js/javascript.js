var random_question = 0;
var countdown_duration = 180;
var duration = countdown_duration;
var remain_time = 0;
var ans_isclear = 0;
var go_in = true;
var backpack_or_shop = true;
var refreshInterval;
var ans1_1 = false, ans1_2 = false, ans1_3 = false, ans1_4 = false, ans1_5 = false;
var ans2_1 = false, ans2_2 = false, ans2_3 = false, ans2_4 = false, ans2_5 = false;
var hat_01 = 0,hat_02 = 0;hat_03 = 0,hat_04 = 0;
var special_01 = 0,special_02 = 0;
var scene_01 = 0;
var backpack_01 = true;
var childIsReady = 0,parentIsReady = 0;
var wip = "wss://" + window.location.host;
var socket = io(wip);
var item_price;
var item_id;
var hat_id = 0;

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
    $('#ass_dinasour').fadeOut();
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

// game
$('#jumpJumpGame').click(function(){
    $('#findTheDifference').fadeOut();
    $('#jumpJumpGame').fadeOut();
    $('information_box').fadeIn();
    $('#subtitle_text_03').fadeIn();//////////////////
    $('#button_02').fadeOut();
    location.href='game.html'
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
    clearInterval(refreshInterval);
    duration = 180;   
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
    //update exp value
    //因爲父母和孩子會emit兩次這個，所以score/2
    socket.emit('update_reward', {ID:getCookie('ID'), Score:40/2, Money:1000});
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

$('#price_05').click(function(){        
    $('#purchase_page_05').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});

$('#price_06').click(function(){        
    $('#purchase_page_06').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});

$('#price_07').click(function(){        
    $('#purchase_page_07').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});
$('#price_08').click(function(){        
    $('#purchase_page_08').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});
$('#price_09').click(function(){        
    $('#purchase_page_09').fadeIn();
    $('#purchase_button').fadeIn();
    $('#close_button').fadeIn();
});
$('#close_button').click(function(){    
    $('#purchase_page_01').fadeOut();
    $('#purchase_page_02').fadeOut();
    $('#purchase_page_03').fadeOut();
    $('#purchase_page_04').fadeOut();
    $('#purchase_page_05').fadeOut();
    $('#purchase_page_06').fadeOut();
    $('#purchase_page_07').fadeOut();    
    $('#purchase_page_08').fadeOut();    
    $('#purchase_page_09').fadeOut();    
    $('#purchase_button').fadeOut();
    $('#close_button').fadeOut(); 
});



$('#shop').click(function(){
    if(backpack_or_shop){
        //default setting
        scene_01 = 0;
        $('#ass_dinasour').fadeOut();
        $('#dinasour').fadeOut();
        $('#dinosaur_model').fadeIn();  
        $('shop').fadeIn(500);
        //menu update
        $('#shop_menu_item_tab').fadeIn();
        $('#shop_menu_scene_tab').fadeOut();        
        $('#shop_menu_special_tab').fadeOut();
        $('#shop_menu_reward_tab').fadeOut();        

        //item list update
        $('item_equipment').fadeIn();
        $('item_scene').fadeOut();
        $('item_special').fadeOut();
        $('item_reward').fadeOut();
        
        //preview
        $('preview_hat').fadeIn();
        $('preview_special').fadeOut();
        $('preview_scene').fadeOut();

        swap_out();
        backpack_or_shop = false;      
    }         
});

$('#shop_closeButton').click(function(){
    if(!backpack_or_shop){   
        $('#ass_dinasour').fadeIn();
        $('#dinasour').fadeIn(); 
        $('shop').fadeOut(500);        
        $('#tree').fadeOut();        
        swap_in();
        backpack_or_shop = true;        
    }        
});

$('#backpack').click(function(){
    if(backpack_or_shop){
        $('#ass_dinasour').fadeOut(500);
        $('#dinasour').fadeOut();
        $('backpack').fadeIn(500);
        swap_out();
        backpack_or_shop = false;       
        
        socket.emit('whats_in_my_bag', {ID:getCookie('ID')});  
    }    
});

$('#backpack_closeButton').click(function(){
    if(!backpack_or_shop){    
        $('#ass_dinasour').fadeIn();
        $('#dinasour').fadeIn();
        $('backpack').fadeOut(500);
        swap_in();
        backpack_or_shop = true;        
    }
});

$('#backpack_01').click(function(){
    var tmp = document.getElementById("backpack_01").src;
    /* 1到4是帽子，5是雲，7是樹 */
    console.log(8888888888888);
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        hat_id = parseInt(tmp[tmp.length-5],10);
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
        
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_02').click(function(){
    var tmp = document.getElementById("backpack_02").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        hat_id = parseInt(tmp[tmp.length-5],10);
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_03').click(function(){
    var tmp = document.getElementById("backpack_03").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_04').click(function(){
    var tmp = document.getElementById("backpack_04").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_05').click(function(){
    var tmp = document.getElementById("backpack_05").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_06').click(function(){
    var tmp = document.getElementById("backpack_06").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_07').click(function(){
    
    var tmp = document.getElementById("backpack_07").src;

    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        console.log('Not me')
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {        
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display =$('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#backpack_08').click(function(){
    var tmp = document.getElementById("backpack_08").src;
    if(parseInt(tmp[tmp.length-5],10) <= 4)
    {
        socket.emit('give_me_dino_hat', {ID: getCookie('ID')});
        hat_id = parseInt(tmp[tmp.length-5],10);
    }
    else if(parseInt(tmp[tmp.length-5],10) == 7) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "tree"});
        var display = $('#tree').css('display');
        if(display == 'none'){
            $('#tree').fadeIn();
        }
        else{
            $('#tree').fadeOut();
        }
    }

    else if(parseInt(tmp[tmp.length-5],10) == 5) // 雲
    {
        socket.emit('change_bg', {ID: getCookie('ID'), Item: "umbrella"});
        var display =$('#umbrella').css('display');
        if(display == 'none'){
            $('#umbrella').fadeIn();
        }
        else{
            $('#umbrella').fadeOut();
        }
    }
});

$('#lotus_leaf').click(function(){      
    if(!special_01){
        $('#dinosaur_model_lotus_leaf').fadeIn();
        $('#thunder_cloud_model').fadeOut();
        //special_01 = 1;
    }
    // else{
    //     $('#dinosaur_model_lotus_leaf').fadeOut();
    //     $('#thunder_cloud_model').fadeIn();
    //     special_01 = 0;
    // }    
    
});

$('#thunder_cloud').click(function(){
    if(!special_02){
        $('#dinosaur_model').fadeIn();    
        $('#dinosaur_model_lotus_leaf').fadeOut();
        $('#thunder_cloud_model').fadeIn();    
        //special_02 = 1;
    }
    // else{
    //     $('#dinosaur_model').fadeOut();    
    //     $('#dinosaur_model_lotus_leaf').fadeIn();
    //     $('#thunder_cloud_model').fadeOut();    
    //     special_02 = 0;
    // }
    
});

$('#NCKU_tree').click(function(){
    if(!scene_01){
        $('#tree').fadeIn();
        scene_01 = 1;        
    }
    else{
        $('#tree').fadeOut();
        scene_01 = 0;        
    }
        
});

$('#shop_menu_item').click(function(){    
    console.log("This is shop_menu_item_tab");
    //menu update    
    $('#shop_menu_item_tab').fadeIn();
    $('#shop_menu_scene_tab').fadeOut(); 
    $('#shop_menu_special_tab').fadeOut();
    $('#shop_menu_reward_tab').fadeOut();    
    //item list update
    $('item_equipment').fadeIn();
    $('item_scene').fadeOut();
    $('item_special').fadeOut();
    $('item_reward').fadeOut();
    //preview
    $('preview_hat').fadeIn();
    $('preview_special').fadeOut();
    $('preview_scene').fadeOut();
});

$('#shop_menu_scene').click(function(){    
    console.log("This is shop_menu_scene_tab");        
    //menu update
    $('#shop_menu_item_tab').fadeOut();
    $('#shop_menu_scene_tab').fadeIn();    
    $('#shop_menu_special_tab').fadeOut();
    $('#shop_menu_reward_tab').fadeOut();
    //item list update
    $('item_equipment').fadeOut();
    $('item_scene').fadeIn();
    $('item_special').fadeOut();
    $('item_reward').fadeOut();
    //preview
    $('preview_hat').fadeOut();
    $('preview_special').fadeOut();
    $('preview_scene').fadeIn();
});

$('#shop_menu_special').click(function(){    
    console.log("This is shop_menu_special_tab");        
    //menu update
    $('#shop_menu_item_tab').fadeOut();
    $('#shop_menu_scene_tab').fadeOut(); 
    $('#shop_menu_special_tab').fadeIn();
    $('#shop_menu_reward_tab').fadeOut(); 
    //item list update
    $('item_equipment').fadeOut();
    $('item_scene').fadeOut();
    $('item_special').fadeIn();
    $('item_reward').fadeOut();    
    //preview
    $('preview_hat').fadeOut();
    $('preview_special').fadeIn();
    $('preview_scene').fadeOut();
});

$('#shop_menu_reward').click(function(){    
    console.log("This is shop_menu_reward_tab");        
    //menu update
    $('#shop_menu_item_tab').fadeOut();
    $('#shop_menu_scene_tab').fadeOut(); 
    $('#shop_menu_special_tab').fadeOut();
    $('#shop_menu_reward_tab').fadeIn(); 
    //item list update
    $('item_equipment').fadeOut();
    $('item_scene').fadeOut();
    $('item_special').fadeOut();
    $('item_reward').fadeIn();    
    //preview
    $('preview_hat').fadeOut();
    $('preview_special').fadeIn();
    $('preview_scene').fadeOut();
});


$('#price_01').click(function(){    
    item_price = 1000;    
    item_id = 1;
});
$('#price_02').click(function(){    
    item_price = 1200; 
    item_id = 2;   
});
$('#price_03').click(function(){    
    item_price = 1500;
    item_id = 3;    
});
$('#price_04').click(function(){    
    item_price = 2500;
    item_id = 4;    
});
$('#price_05').click(function(){    
    item_price = 1500;
    item_id = 5;    
});
$('#price_06').click(function(){    
    item_price = 1500;
    item_id = 6;    
});
$('#price_07').click(function(){
    item_price = 3000;
    item_id = 7;    
});
$('#price_08').click(function(){
    buying_which_item = 8;
    item_price = 3000;    
});
$('#price_09').click(function(){
    //buying_which_item = 9;
    item_price = 1800;    
});

$('#purchase_button').click(function(){        
    socket.emit('purchase_some_item', {ID:getCookie('ID'), Money:item_price, Itemid:item_id});        
});

socket.on('whats_in_your_bag', function(data){
    if(data.ID == getCookie('ID')){   
        console.log(data.item)
      for(var i=0; i<data.Item.length; i++)
      {
        var j = i+1;
        $('#backpack_0'+j.toString()).attr("src", "./assests/item"+ data.Item[i]+".svg");      
        console.log(data.Item[i]);
        console.log(j);
      }           
    }
})

//檢查目前應該是哪一種狀態的屁頭龍
socket.on('give_you_dino_hat', function(data){
    console.log('in0');
    if(data.ID == getCookie('ID')){
      var dino = data.Dino;
      console.log(dino);
      if(dino % 4 == 0)
      {
        dino = 0;
      }
      else if((dino-1) % 4 == 0)
      {
        dino = 1;
      }
      else if((dino-2) % 4 == 0)
      {
        dino = 2;
      }
      else if((dino-3) % 4 == 0)
      {
        dino = 3;
      }
      console.log("dino id:" + dino);
      dino = dino + (hat_id*4);

      console.log("new dino id:" + dino);
      console.log("hat id:" + hat_id);
      $('#ass_dinasour').attr("src", "./assests/dino" + dino.toString() + ".svg");
      $('#ass_dinasour_2').attr("src", "./assests/dino" + dino.toString() + ".svg");
      //$('#dinosaur_model').attr("src", "./assests/dino" + dino.toString() + ".svg");
      //$('#dinosaur_model_special').attr("src", "./assests/dino" + dino.toString() + ".svg");
      //$('#dinosaur_model_scene').attr("src", "./assests/dino" + dino.toString() + ".svg");      
      $('#dinosaur_backpack').attr("src", "./assests/dino" + dino.toString() + ".svg");    
      socket.emit('dino_change_hat',{ID:getCookie('ID'), Dino:dino});
    }
  })

    socket.on('give_you_dino', function(data){

        if(data.ID == getCookie('ID')){
            var dino = data.Dino;
            $('#ass_dinasour').attr("src", "./assests/dino" + dino.toString() + ".svg");
            $('#ass_dinasour_2').attr("src", "./assests/dino" + dino.toString() + ".svg");
            //$('#dinosaur_model').attr("src", "./assests/dino" + dino.toString() + ".svg");
            //$('#dinosaur_model_special').attr("src", "./assests/dino" + dino.toString() + ".svg");
            //$('#dinosaur_model_scene').attr("src", "./assests/dino" + dino.toString() + ".svg");      
            $('#dinosaur_backpack').attr("src", "./assests/dino" + dino.toString() + ".svg");  

            if(dino % 4 == 0)
            {
                dino = 0;
            }
            else if((dino-1) % 4 == 0)
            {
                dino = 1;
            }
            else if((dino-2) % 4 == 0)
            {
                dino = 2;
            }
            else if((dino-3) % 4 == 0)
            {
                dino = 3;
            } 
            $('#dinosaur_model').attr("src", "./assests/dino" + dino.toString() + ".svg");
            $('#dinosaur_model_special').attr("src", "./assests/dino" + dino.toString() + ".svg");
            $('#dinosaur_model_scene').attr("src", "./assests/dino" + dino.toString() + ".svg");  
        }
    })
   /*if(dino == 0)
      {
        $('#ass_dinasour').attr("src", "./assests/屁頭龍.svg");
        $('#ass_dinasour_2').attr("src", "./assests/屁頭龍.svg");
        $('#dinosaur_model').attr("src", "./assests/屁頭龍.svg");
        $('#dinosaur_model_special').attr("src", "./assests/屁頭龍.svg");
        $('#dinosaur_model_scene').attr("src", "./assests/屁頭龍.svg");      
        $('#dinosaur_backpack').attr("src", "./assests/屁頭龍.svg");            
      }
      else if(dino == 1)
      {      
        $('#ass_dinasour').attr("src", "./assests/疾風龍.svg");
        $('#ass_dinasour_2').attr("src", "./assests/疾風龍.svg");
        $('#dinosaur_model').attr("src", "./assests/疾風龍.svg");
        $('#dinosaur_model_special').attr("src", "./assests/疾風龍.svg");
        $('#dinosaur_model_scene').attr("src", "./assests/疾風龍.svg");      
        $('#dinosaur_backpack').attr("src", "./assests/疾風龍.svg");      
      }
      else if(dino == 2)
      {
        $('#ass_dinasour').attr("src", "./assests/火山龍.svg");
        $('#ass_dinasour_2').attr("src", "./assests/火山龍.svg");
        $('#dinosaur_model').attr("src", "./assests/火山龍.svg");
        $('#dinosaur_model_special').attr("src", "./assests/火山龍.svg");
        $('#dinosaur_model_scene').attr("src", "./assests/火山龍.svg");
        $('#dinosaur_backpack').attr("src", "./assests/火山龍.svg");      
      }
      else if(dino == 3)
      {      
        $('#ass_dinasour').attr("src", "./upgrade/天使龍 (1).svg");
        $('#ass_dinasour_2').attr("src", "./upgrade/天使龍 (1).svg");
        $('#dinosaur_model').attr("src", "./upgrade/天使龍 (1).svg");
        $('#dinosaur_model_special').attr("src", "./upgrade/天使龍 (1).svg");
        $('#dinosaur_model_scene').attr("src", "./upgrade/天使龍 (1).svg");
        $('#dinosaur_backpack').attr("src", "./upgrade/天使龍 (1).svg");      
      }*/