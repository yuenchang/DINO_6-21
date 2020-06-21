// <script src="./js/jquery.touchSwipe.js"></script>
//<script src="./js/jquery.touchSwipe.min.js"></script>
var count = 0;
$(document).ready(function () {
    $('#dinos').click( function(){
        if(count % 3 == 0)
        {
            $('#big_dino_white').attr("src", "./upgrade/Group 292.svg");
            $('#big_dino').attr("src", "./upgrade/疾風龍 (1).svg");
        }
        else if(count % 3 == 2 || count % 3 == -1)
        {
            $('#big_dino_white').attr("src", "./upgrade/Group 292.svg");
            $('#big_dino').attr("src", "./upgrade/Group 330.svg");
        }
        else if(count % 3 == 1 || count % 3 == -2)
        {
            $('#big_dino_white').attr("src", "./upgrade/Group 292.svg");
            $('#big_dino').attr("src", "./upgrade/天使龍 (1).svg");
        }

        $('#moon').fadeOut(1500);
        $('#dinos').fadeOut(500);
        $('#upgrade_word').fadeOut(500);
        $('#upgrade_page_text').fadeOut(500);
        $('#white_dino').fadeIn(5000);
        $('#yellow_dino').fadeIn(5000,()=>{
            // $('#yellow_dino').delay(500);
            // $('#yellow_dino').css({ 'filter': 'brightness(1.1)'});
            // $('#yellow_dino').delay(500);
            $('#yellow_dino').delay(2500).hide(0);
            $('#white_dino').delay(2500).hide(0);
            $('#big_dino_white').delay(2500).show(0);

            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.05)'});
            },100)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.1)'});
            },130)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.15)'});
            },160)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.2)'});
            },190)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.25)'});
            },220)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.3)'});
            },250)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.35)'});
            },280)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.4)'});
            },310)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.45)'});
            },340)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.5)'});
            },370)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.55)'});
            },400)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.6)'});
            },430)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.65)'});
            },460)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.7)'});
            },490)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.75)'});
            },520)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.8)'});
            },550)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.85)'});
            },580)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.9)'});
            },610)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(1.95)'});
            },640)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(2.)'});
            },670)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(2.5)'});
            },700)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(3.0)'});
            },730)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(3.5)'});
            },760)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(4.)'});
            },790)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(4.5)'});
            },820)
            setTimeout(function(){
                $('#yellow_dino').css({ 'filter': 'brightness(5)'});
            },2500)
            
        
            $('#white_dino').delay(500).hide(0);
            $('#big_dino_white').delay(500).show(0);

            $('#white_dino').delay(500).show(0);
            $('#big_dino_white').delay(500).hide(0);

            $('#white_dino').delay(500).hide(0);
            $('#big_dino_white').delay(500).show(0);

            $('#white_dino').delay(300).show(0);
            $('#big_dino_white').delay(300).hide(0);

            $('#white_dino').delay(300).hide(0);
            $('#big_dino_white').delay(300).show(0);

            $('#white_dino').delay(300).show(0);
            $('#big_dino_white').delay(300).hide(0);

            $('#white_dino').delay(300).hide(0);
            $('#big_dino_white').delay(300).show(0);

            $('#white_dino').delay(300).show(0);
            $('#big_dino_white').delay(300).hide(0);

            $('#white_dino').delay(300).hide(0);
            $('#big_dino_white').delay(300).show(0);

            $('#white_dino').delay(300).show(0);
            $('#big_dino_white').delay(300).hide(0);

            $('#white_dino').delay(300).hide(0);
            $('#big_dino_white').delay(300).show(0);

            $('#white_dino').delay(200).show(0);
            $('#big_dino_white').delay(200).hide(0);

            $('#white_dino').delay(200).hide(0);
            $('#big_dino_white').delay(200).show(0);

            $('#white_dino').delay(200).show(0);
            $('#big_dino_white').delay(200).hide(0);

            $('#white_dino').delay(200).hide(0);
            $('#big_dino_white').delay(200).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(100).show(0);
            $('#big_dino_white').delay(100).hide(0);

            $('#white_dino').delay(100).hide(0);
            $('#big_dino_white').delay(100).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);

            $('#white_dino').delay(50).show(0);
            $('#big_dino_white').delay(50).hide(0);

            $('#white_dino').delay(50).hide(0);
            $('#big_dino_white').delay(50).show(0);
   
            setTimeout(function(){
                $('#white').fadeIn(500);
                $('#big_dino').fadeIn(1200);
                $('#big_dino_white').fadeOut(1000);
                $('#white').fadeOut(1000);
            },10000)

            
        });
      });
})

$(function() {
    $("#dinos").swipe({
        threshold: 200,
        swipe:function(event, direction, distance, duration, fingerCount, fingerData, currentDirection) {
            console.log([event, direction, distance, duration, fingerCount, fingerData, currentDirection]);
            if(direction == 'left')
            {
                count ++;
            }
            else if(direction == 'right')
            {
                count--;
            }

            console.log(count)
            console.log(count%3)
            if(count % 3 == 2 || count % 3 == -1)
            {
                /* 火山 */
                if(direction == 'left' || direction == 'right')
                {
                    $('#angel').animate({left:"11vw", width:"17vw", top:"33vh"}, 500);
                    $('#voca').animate({left:"22vw", width:"52vw", top:"22vh"},500);
                    $('#wind').animate({left:"72vw", width:"17vw", top:"33vh"},500);
                    $('#dino_name').attr("src", "./upgrade/火山屁頭龍word.svg");
                    $('#dino_info').attr("src", "./upgrade/voca.svg");
                }     
                
            }
            else if(count % 3 == 0)
            {
                /* 疾風  */
                if(direction == 'left'|| direction == 'right')
                {
                    $('#angel').animate({left:"71vw", width:"17vw", top:"33vh"}, 500);
                    $('#voca').animate({left:"11vw", width:"14vw", top:"33vh"},500);
                    $('#wind').animate({left:"22vw", width:"60vw", top:"24vh"},500);
                    $('#dino_name').attr("src", "./upgrade/疾風屁頭龍word.svg");
                    $('#dino_info').attr("src", "./upgrade/wind.svg");
                }     
            }
            else if(count % 3 == 1 || count % 3 == -2)
            {
                /* 天使 */
                if(direction == 'left'|| direction == 'right')
                {
                    $('#angel').animate({left:"24vw", width:"61vw", top:"25vh"}, 500);
                    $('#voca').animate({left:"74vw", width:"14vw", top:"32vh"},500);
                    $('#wind').animate({left:"8vw", width:"18vw", top:"33vh"},500);
                    $('#dino_name').attr("src", "./upgrade/天使屁頭龍word.svg");
                    $('#dino_info').attr("src", "./upgrade/angel.svg");
                }     
            }
        }
    });

});

