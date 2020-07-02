var alpha,beta,gamma;
var wip = "wss://" + window.location.host;

var phase = 0;
var style = 'D';
var walltime = 0;
var guardtime = 0;
var interval = 0;
var interval2 = 0;
var interval3 = 0;
const full = 100;
const enemyfull = 10000;
var a = false;
var b = false;
const jumpv = -660;
const fib = [377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,
  317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169,
  63245986]
var fibc = 0;

//const height = window.innerHeight;
const height = 812*2.5-50;
//const width = window.innerWidth;

const width = 375*2.5+25;

var self;

/*
$( "#style" ).click(function() {
  console.log('777')
  if(style == 'S'){
    $(`#S`).animate({width:"0em"});
    $('#G').animate({width:"7.5em"});
    style = 'G'
  }else if(style == 'G'){
    $(`#G`).animate({width:"0em"});
    $('#D').animate({width:"7.5em"});
    style = 'D'
  }else if(style == 'D'){
    $(`#D`).animate({width:"0em"});
    $('#S').animate({width:"7.5em"});
    style = 'S'
  }
});
*/


$(function() {
  $('#S').addClass('hide');
  $('#G').addClass('hide');
  $('#d2').toggleClass('big');
});



var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener)
      element.addEventListener(type, handler, false);
    else if (element.attachEvent)
      element.attachEvent("on" + type, handler);
    else
      element["on" + type] = handler;
  },
  removeHandler: function (element, type, handler) {
    if(element.removeEventListener)

      element.removeEventListener(type, handler, false);
    else if(element.detachEvent)
      element.detachEvent("on" + type, handler);
    else
      element["on" + type] = handler;
  },
  listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
    this.addHandler(target, "touchstart", handleTouchEvent);
    this.addHandler(target, "touchend", handleTouchEvent);
    this.addHandler(target, "touchmove", handleTouchEvent);
    var startX;
    var startY;
    function handleTouchEvent(event) {
      switch (event.type){
        case "touchstart":
          startX = event.touches[0].pageX;
          startY = event.touches[0].pageY;
          break;
        case "touchend":
          var spanX = event.changedTouches[0].pageX - startX;
          var spanY = event.changedTouches[0].pageY - startY;
          if( Math.abs(spanX) < 30 && Math.abs(spanY) <30 ){
            if(startX < width/2){
              attack(self);
            }else{
              if(style == 'S'){
                special(self);
              }else if(style == 'G'){
                //star();
                guard();
              }else if(style == 'D'){
                dash();
              }
            }
          }
          if(Math.abs(spanX) > Math.abs(spanY)){      //认定为水平方向滑动
            if(spanX > 30){         //向右
              if(rightCallback)
                rightCallback();
            } else if(spanX < -30){ //向左
              if(leftCallback)
                leftCallback();
            }
          } else {                                    //认定为垂直方向滑动
            if(spanY > 30){         //向下
              if(downCallback)
                downCallback();
            } else if (spanY < -30) {//向上
              if(upCallback)
                upCallback();
            }
          }

          break;
        case "touchmove":
          //阻止默认行为
          if(isPreventDefault)
            event.preventDefault();
          break;
      }
    }
  }
};


EventUtil.listenTouchDirection(document, true, up,right, down, left)

function up(){
  jump();
}

function right(){
  //S
  if(style=='G'){
    $('#G').addClass('hide');
    $('#g2').removeClass('big');
    $('#S').removeClass('hide');
    $('#s2').addClass('big');
  }else if(style=='D'){
    $('#D').addClass('hide');
    $('#d2').removeClass('big');
    $('#S').removeClass('hide');
    $('#s2').addClass('big');
  }
  style = 'S';
}

function down(){
  //G
  if(style=='S'){
    $('#S').addClass('hide');
    $('#s2').removeClass('big');
    $('#G').removeClass('hide');
    $('#g2').addClass('big');
  }else if(style=='D'){
    $('#D').addClass('hide');
    $('#d2').removeClass('big');
    $('#G').removeClass('hide');
    $('#g2').addClass('big');
  }
  style = 'G'
}


function left(){
  //D
  if(style=='G'){
    $('#G').addClass('hide');
    $('#g2').removeClass('big');
    $('#D').removeClass('hide');
    $('#d2').addClass('big');
  }else if(style=='S'){
    $('#S').addClass('hide');
    $('#s2').removeClass('big');
    $('#D').removeClass('hide');
    $('#d2').addClass('big');
  }
  style = 'D'
}

window.onload = function() {
  console.log("per");
  permission();
};

var amIalive = 1;
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: width,
  height: height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: { create, preload, update },
})

// arrow function is not allowed, because of `this` binding
function preload() {
  // Step 1.1 code goes here
  this.load.setBaseURL('https://'+window.location.host)



  this.load.image('sky', 'res/game/sky.png');
  this.load.svg('plat1', 'res/game/plat1.svg');
  this.load.svg('plat2', 'res/game/plat2.svg');
  this.load.svg('plat3', 'res/game/plat3.svg');
  this.load.svg('plat4', 'res/game/plat4.svg');
  this.load.svg('plat5', 'res/game/plat5.svg');
  this.load.svg('plat6', 'res/game/plat6.svg');
  this.load.svg('plat7', 'res/game/plat7.svg');
  this.load.svg('ground', 'res/game/ground.svg');

  this.load.svg('GG', 'res/game/GG.svg');
  this.load.svg('SS', 'res/game/SS.svg');
  this.load.svg('DD', 'res/game/DD.svg');

  this.load.spritesheet('dude',
    'res/game/winds.png',
    { frameWidth: 250, frameHeight: 180 }
  )
  this.load.spritesheet('claw',
    'res/game/claw.png',
    { frameWidth: 300, frameHeight: 300 }
  )

  this.load.spritesheet('fireball',
    'res/game/fireball.png',
    { frameWidth: 300, frameHeight: 300 }
  )

  this.load.spritesheet('devil',
    'res/game/devil.png',
    { frameWidth: 322, frameHeight: 226 }
  )


  // Step 8.1 code goes here
}



function create() {


  self = this;
  this.socket = io();
  this.socket.on('currentPlayers', function (players) {

    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
      } else {
        addOtherPlayers(self, players[id]);
      }

    });
  });
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });
  this.socket.on('disconnect', function (playerId) {
    otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });
  this.socket.on('playerMoved', function (playerInfo) {
    otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        if(playerInfo.face == -1){
          otherPlayer.anims.play('left', true)
        }else if(playerInfo.face == 1){
          otherPlayer.anims.play('right', true)
        }else{
          otherPlayer.anims.play('turn')
        }

        self.physics.add.overlap(otherPlayer, stars, collectStar, null, self)
      }
    });

  });

  // Step 1.2 code goes here
  this.add.image(width/2, height/2, 'sky').setScale(width/800,height/600)//.refreshBody()
  // Step 2 code goes here
  platforms = this.physics.add.staticGroup()

  platforms.create(50,400, 'plat1').setScale(2.5,2.5).refreshBody()
  platforms.create(750, 400, 'plat2').setScale(2.5,2.5).refreshBody()
  platforms.create(400, 600, 'plat3').setScale(2.5,2.5).refreshBody()
  platforms.create(120, 800, 'plat4').setScale(2.5,2.5).refreshBody()
  platforms.create(350, 1000, 'plat5').setScale(2.5,2.5).refreshBody()
  platforms.create(500, 1200, 'plat6').setScale(2.5,2.5).refreshBody()
  platforms.create(750, 1400, 'plat7').setScale(2.5,2.5).refreshBody()

  platforms.create(width/2, 1820, 'ground').setScale(2.5,2.5).refreshBody()
  
  
  // Step 3 code goes here
  player = this.physics.add.sprite(100, 450, 'dude').setScale(0.7)
  player.alive = 1;
  player.face = 1;
  player.setBounce(.2)
  player.setCollideWorldBounds(true)


  devil = this.physics.add.sprite(800, 1500, 'devil').setScale(1)
  devil.alive = 1;
  devil.face = -1;
  devil.setBounce(.2)
  devil.setCollideWorldBounds(true)

  // Step 4.1 code goes here
  /*
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }), key: 'left', repeat: -1 })
  this.anims.create({ frameRate: 20, frames: [ { key: 'dude', frame: 5 } ], key: 'turn', })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 10 }), key: 'right', repeat: -1 })
*/

  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), key: 'left', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }), key: 'right', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }), key: 'gleft', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }), key: 'gright', repeat: -1 })

  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('claw', { start: 0, end: 4 }), key: 'once', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 4 }), key: 'fire', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('devil', { start: 0, end: 3 }), key: 'devilright', repeat: -1 })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('devil', { start: 4, end: 7 }), key: 'devilleft', repeat: -1 })
  devil.anims.play('devilleft', true)
  
  otherPlayers = this.physics.add.group({
    allowGravity: false
  });
  otherPlayers.enableBody = true;
  bombs = this.physics.add.group()

  cursors = this.input.keyboard.createCursorKeys()
  // Step 4.3 code goes here
  this.physics.add.collider(player, platforms)
  this.physics.add.collider(devil, platforms)
  this.physics.add.collider(otherPlayers, platforms)
  // Step 5.1 code goes here
  //this.stars = this.physics.add.group({ key: 'star', repeat: 11, setXY: { x: 30, y: 0, stepX: 70 },setScale: { x: 2, y: 2} })
  this.stars = this.physics.add.group()
  stars = this.stars
  this.stars.enableBody = true;
  this.stars.children.iterate(star => star.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3)))

  this.physics.add.overlap(otherPlayers, stars, collectStar, null, this)
  this.physics.add.collider(this.stars, platforms)
  // eat star
  this.physics.add.overlap(player, this.stars, collectStar, null, this)
  // Step 6.1 code goes here
  score = 0
  //scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })


  playerHealth = full
  //playerHealthText = this.add.text(100, 50, 'Health: 100', { fontSize: '32px', fill: '#000' })
  devilHealth = enemyfull
  //devilHealthText = this.add.text(200, 80, 'Devil: 10000', { fontSize: '32px', fill: '#000' })

  //styleText = this.add.text(40,40,'D',{fontSize:'128px',fill:'#FF2D2D' } )
  // Step 7.1 code goes here
  this.physics.add.collider(bombs, platforms)
  this.physics.add.overlap(player, bombs, hitBomb, null, this)
  this.physics.add.overlap(player, otherPlayers, savePeople, null, this)
  this.physics.add.overlap(otherPlayers, bombs, otherhitBomb, null, this)



  claws = this.physics.add.group({
    allowGravity: false
  });
  claws.enableBody = true;
  
  this.physics.add.overlap(devil, claws, devildamaged, null, this)

  fireballs = this.physics.add.group({
    allowGravity: false
  });
  fireballs.enableBody = true;
   
  this.physics.add.overlap(player, fireballs, playerdamaged, null, this)

}

function addOtherPlayers(self, playerInfo) {
  /*
  const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'dude').setScale(.5);
  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.alive = 1;
  self.physics.add.overlap(otherPlayers, stars, collectStar, null, self)
  //self.physics.add.overlap(otherPlayer, self.stars, collectStar, null, this);
  otherPlayers.add(otherPlayer);
  */
}

function update() {
  /*
  otherPlayers.getChildren().forEach(function (otherPlayer) {
    this.stars.getChildren().forEach(function (star){
      if(checkOverlap(otherPlayer,star)){ 
        collectStar(otherPlayer,star) 
      } 
    })
  });
  */
  var self = this;
  guardtime--;
  interval++;
  if(interval == 50){
    interval = 0;
    if(phase == 0){
      devilattack();
    }else if(phase == 1){
      devilbounce(self); 
    }
  }
  interval2++;
  if(interval2 == 200){
    interval2 = 0;
    if(phase == 2){
      devilline(self);
    }
  }

  interval3++;
   if(interval3 == 400){
    interval3 = 0;
    if(phase == 3){
      devildash(self);
    }
  }


  if(cursors.space.isDown){
    var self = this;
    //star();
    //dash();
    //special(self);
    attack(self);
    //guard();
  }
  if(guardtime >0){
    if(player.face == -1)
      player.anims.play('gleft', true)
    if(player.face == 1)
      player.anims.play('gright', true)

  }else{

    if(player.face == -1)
      player.anims.play('left', true)
    if(player.face == 1)
      player.anims.play('right', true)
  }
  const speed = 320
  var face = 0; 
  if(player.alive){
    if (cursors.left.isDown || gamma < -10) {
      player.setVelocityX(-speed)
      if(guardtime>0)
        player.anims.play('gleft', true)
      else
        player.anims.play('left', true)
      player.face = -1;
      face = -1;
    } else if (cursors.right.isDown || gamma > 10) {
      player.setVelocityX(speed)
      if(guardtime>0)
        player.anims.play('gright', true)
      else
        player.anims.play('right', true)
      player.face = 1;
      face = 1;
    } else {
      player.setVelocityX(0)
    }

    var x = player.x;
    var y = player.y;
    if (player.oldPosition && (x !== player.oldPosition.x || y !== player.oldPosition.y )) {
      //this.socket.emit('playerMovement', { x: x, y: y,face:face});
    }
    // save old position data
    player.oldPosition = {
      x: player.x,
      y: player.y,
    };

    if( player.body.touching.right || player.body.touching.left  ){
      walltime = walltime + 1;
    }else{
      walltime = 0;
    }

    if ((cursors.up.isDown/* || cursors.space.isDown*/) && (player.body.touching.down)){
      player.setVelocityY(jumpv)
    }
    if( walltime<5 && (cursors.up.isDown/* || cursors.space.isDown*/) && ( player.body.touching.right || player.body.touching.left)){
      player.setVelocityY(jumpv)
    }//wall jump
  }
}

function jump(){
  if (player.body.touching.down){
    player.setVelocityY(jumpv)
  }
  if( walltime<5 &&( player.body.touching.right || player.body.touching.left)){
    player.setVelocityY(jumpv)
  }//wall jump

  /*
  if (player.body.touching.down || player.body.touching.left || player.body.touching.right)
    player.setVelocityY(-1300)
    */
}

function collectStar(player, star) {
  console.log('87');
  star.disableBody(true, true)
  // Step 6.2 code goes here
  score += 10
  scoreText.setText('Score: ' + score)
  // Step 7.2 code goes here
  if (0 == this.stars.countActive(true)) {
    this.stars.children.iterate(star => star.enableBody(true, star.x, 0, true, true))
    //this.socket.emit('giveMeBomb');

    //let x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)
    let x = player.x < 400 ? fib[fibc]/400+400: fib[fibc];
    fibc = fibc+1;
    let bomb = bombs.create(x, 16, 'bomb').setScale(3)
    bomb.setBounce(1)
    bomb.setCollideWorldBounds(true)
    //bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    bomb.setVelocity( fib[fibc]/400 -200, 20)
    fibc = fibc+1;
  }
  // Step 8.2 code goes here
}

function hitBomb(player, bomb) {
  //gameOver = true
  // Step 7.3 code goes here
  //this.physics.pause()
  var over = true; 
  otherPlayers.getChildren().forEach(function (otherPlayer) {
    if(otherPlayer.alive == 1){
      over = false;
    }
  })

  amIalive = 0;
  player.alive = 0;
  player.body.velocity.set(0);
  player.body.setAllowGravity(false);
  player.anims.play('turn')

  player.setTint(0xff0000)
  if(over==true){
    console.log('888');
  }
  // Step 8.3 code goes here
}

function otherhitBomb(player,bomb){
  var over = true;
  otherPlayers.getChildren().forEach(function (otherPlayer) {
    if(otherPlayer.alive == 1){
      over = false;
    }
  })

  if(amIalive == 1){
    over = false;
  }

  player.setTint(0xff0000);
  player.alive = 0;
  if(over == true){
    console.log('88');
  }
}
function savePeople(player,other){
  if(other.alive == 0){
    other.alive = 1;
    //other.body.setAllowGravity(true);
    other.setTint(0xffffff);
    console.log('save');    
  }
  if(player.alive == 0){
    amIalive = 1;
    player.alive = 1;
    player.setTint(0xffffff);
    player.body.setAllowGravity(true);
  }
}

function playerdamaged(player,fireball){
  if(guardtime<0){
    playerHealth -= 2
  }else{
    fireball.disableBody(true, true)
  }
  if(playerHealth<0)
    playerHealth = 100

  var per = 90*(playerHealth/full)
  document.getElementById('healthbarval').setAttribute('width', per)
  //playerHealthText.setText('Health: ' + playerHealth)
}

function devildamaged(devil,claw){
  devilHealth -= 10
  //devilHealthText.setText('Devil: ' + devilHealth)
  var per = 178*(devilHealth/enemyfull)
  document.getElementById('enemyHealthbarval').setAttribute('width', per)
  
  if(devilHealth>enemyfull*1 ){ //p1-1
    
  }else if(devilHealth>enemyfull*0.95 ){//p1-2
    devil.y = 1200
  }else if(devilHealth>enemyfull*0.90 ){//p1-3
    devil.x = 146
    devil.y = 600
    devil.face = 1
    devil.anims.play('devilright', true)
  }else if(devilHealth>enemyfull*0.85 ){//p2-1
    devil.x = 800
    devil.y = 250
    devil.face = -1
    devil.anims.play('devilleft', true)
  }else if(devilHealth>enemyfull*0.7 ){//p2-2
    phase = 1
  }else if(devilHealth>enemyfull*0.6 ){//p2-3
    devil.x = 360
    devil.y = 850
  }else if(devilHealth>enemyfull*0.5 ){//p3
    phase = 1.5
    if(a == false){
      star();
      a = true;
    }
  }else if(devilHealth>enemyfull*0.3 ){//p3
    if(b == false){
      phase = 2;
      //devilline(self);
      b = true;
    }
  }else if(devilHealth>enemyfull*0.2 ){//p3
    phase = 3;
  }else if(devilHealth<enemyfull*0 ){//p3
    location.href='end.html'
  }
  
}

window.addEventListener('deviceorientation', function(event) {
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
}, false);

if(window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function(event) {
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;


  }, false);
}else{
  document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
}


function permission () {
  if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then( response => {
        // (optional) Do something after API prompt dismissed.
        if ( response == "granted" ) {
          window.addEventListener( "devicemotion", (e) => {
            // do something for 'e' here.
          })
        }
      })
      .catch( console.error )
  } else {
    console.log( "DeviceMotionEvent is not defined" );
  }
}
const btn = document.getElementById( "request" );
btn.addEventListener( "click", permission );




function attack(self){
  //const claw = claws.create(player.x + 10 , player.y, 'claw').setScale(0.1);
  const claw = self.physics.add.sprite(player.x + player.face*87, player.y, 'claw').setScale(0.5);
  claw.anims.play('once',true)
  claws.add(claw);
  setTimeout(() => {

      claw.disableBody(true, true)
            }, 300);
}

function dash(){
  ~async function(){  
      const delay = (s) => {
            return new Promise(function(resolve){
                    setTimeout(resolve,s); 
                  });
          };
      for(var i = 0;i<5;i=i+1){
        player.x = player.x + player.face*50;  
        await delay(10);   
      }
  }();
}


function special(){
  ~async function(){  

    var absx = player.x;
    var absy = player.y;
    var absf = player.face;
      const delay = (s) => {
            return new Promise(function(resolve){
                    setTimeout(resolve,s); 
                  });
          };
    for(var i = 0;i<10;i=i+1){
      const claw = self.physics.add.sprite(absx + absf*87*(i+1), absy, 'claw').setScale(0.3);
      claw.anims.play('once',true)
      claws.add(claw);
      setTimeout(() => {
        claw.disableBody(true, true)
      }, 300);
      await delay(100);
    }
  }();
}

function star(){
  ~async function(){  
    var absx = devil.x;
    var absy = devil.y;
    var absf = devil.face;
    var radi = 87*2.5;

    var p1x = absx + radi* Math.cos(Math.PI*2*162/360);
    var p1y = absy - radi* Math.sin(Math.PI*2*162/360);

    var p2x = absx + radi* Math.cos(Math.PI*2*18/360);
    var p2y = absy - radi* Math.sin(Math.PI*2*18/360);
    
    var p3x = absx + radi* Math.cos(Math.PI*2*(234)/360);
    var p3y = absy - radi* Math.sin(Math.PI*2*(234)/360);

    var p4x = absx + radi* Math.cos(Math.PI*2*(90)/360);
    var p4y = absy - radi* Math.sin(Math.PI*2*(90)/360);

    var p5x = absx + radi* Math.cos(Math.PI*2*(306)/360);
    var p5y = absy - radi* Math.sin(Math.PI*2*(306)/360);

    const delay = (s) => {
            return new Promise(function(resolve){
                    setTimeout(resolve,s); 
                  });
          };
    for(var i = 0;i<60;i=i+1){
      if( i < 12){
        var step = i - 0;//0~5
        var dx = (p2x - p1x)*step/12;
        var dy = (p2y - p1y)*step/12;
        
        const fireball = self.physics.add.sprite( p1x+dx,p1y+dy, 'fireball').setScale(0.2);
        fireball.anims.play('fire',true)
        fireballs.add(fireball);

      }else if(i<24){
        var step = i - 12;//6~11
        var dx = (p3x - p2x)*step/12;
        var dy = (p3y - p2y)*step/12;
        const fireball = self.physics.add.sprite( p2x+dx,p2y+dy, 'fireball').setScale(0.2);
        fireball.anims.play('fire',true)
        fireballs.add(fireball);
      }else if(i<36){
        var step = i - 24;//12~17
        var dx = (p4x - p3x)*step/12;
        var dy = (p4y - p3y)*step/12;
        const fireball = self.physics.add.sprite( p3x+dx,p3y+dy, 'fireball').setScale(0.2);
        fireball.anims.play('fire',true)
        fireballs.add(fireball);
      }else if(i<48){
        var step = i - 36;//18~23
        var dx = (p5x - p4x)*step/12;
        var dy = (p5y - p4y)*step/12;
        const fireball = self.physics.add.sprite( p4x+dx,p4y+dy, 'fireball').setScale(0.2);
        fireball.anims.play('fire',true)
        fireballs.add(fireball);
      }else if(i<60){
        var step = i - 48;//24~29
        var dx = (p1x - p5x)*step/12;
        var dy = (p1y - p5y)*step/12;
        const fireball = self.physics.add.sprite( p5x+dx,p5y+dy, 'fireball').setScale(0.2);
        fireball.anims.play('fire',true)
        fireballs.add(fireball);
      }

       
      const fireball = self.physics.add.sprite(absx + radi*Math.cos(Math.PI*2*(i)/30) , absy + radi*Math.sin(Math.PI*2*(i)/30) , 'fireball').setScale(0.2);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);
      
      /*
      setTimeout(() => {
        claw.disableBody(true, true)
      }, 300);
      */
      await delay(50);
    }
    
    await delay(300);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });
    await delay(50);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });

    await delay(50);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });

    await delay(50);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });
    await delay(50);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });
    await delay(50);
    fireballs.getChildren().forEach(function (fireball) {
      fireball.y = fireball.y+100
    });



    await delay(100);
  

    fireballs.getChildren().forEach(function (fireball) {
        fireball.disableBody(true, true)
        //fireball.destroy();
    });

  }();
}

function guard(){

  if(guardtime<=0){
    guardtime = 100; 
  }
}

function devilattack(){
  ~async function(){  

    var absx = devil.x;
    var absy = devil.y;
    var absf = devil.face;
    const delay = (s) => {
      return new Promise(function(resolve){
        setTimeout(resolve,s); 
      });
    };
    for(var i = 0;i<8;i=i+1){
      const fireball = self.physics.add.sprite(absx + absf*87*(i+1), absy, 'fireball').setScale(0.5);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);
      setTimeout(() => {
        fireball.disableBody(true, true)
        //fireball.destroy();
      }, 300);
      await delay(100);
    }
  }();
}


function devilbounce(self){
  ~async function(){  

    var absx = devil.x;
    var absy = devil.y;
    var absf = devil.face;
    const delay = (s) => {
      return new Promise(function(resolve){
        setTimeout(resolve,s); 
      });
    };

    let fireball = fireballs.create(absx,absy, 'fireball').setScale(0.5)
    fireball.setBounce(1)
    fireball.body.gravity.y = 200;
    fireball.setCollideWorldBounds(true)
    fireball.setVelocity(Phaser.Math.Between(-400, 400)+400, Phaser.Math.Between(-200, -500))
    self.physics.add.collider(fireball, platforms)
    
    setTimeout(() => {
        fireball.disableBody(true, true)
        //fireball.destroy();
      }, 3000);

  }();
}

function devilline(self){
  ~async function(){  


    const delay = (s) => {
      return new Promise(function(resolve){
        setTimeout(resolve,s); 
      });
    };


    var p1x = Phaser.Math.Between(0, 400.25);
    var p1y = Phaser.Math.Between(0, 990);
    var p2x = Phaser.Math.Between(562.25,962.5);
    var p2y = Phaser.Math.Between(0,990);
    var p3x = Phaser.Math.Between(0,962.5);
    var p3y = Phaser.Math.Between(990,1980);

    devils = self.physics.add.group({
      allowGravity: false
    });
    d1 = devils.create(p1x, p1y, 'devil').setScale(1)
    d1.anims.play('devilright', true)
    d2 = devils.create(p2x, p2y, 'devil').setScale(1)
    d2.anims.play('devilleft', true)
    d3 = devils.create(p3x, p3y, 'devil').setScale(1)
    if(p3x > 481)
      d3.anims.play('devilleft', true)
    else
      d3.anims.play('devilright', true)

    await delay(1500);
    const balls = 20;
    for(var i = 0;i<balls;i++){
      var step = i;
      var dx = (p2x - p1x)*step/balls;
      var dy = (p2y - p1y)*step/balls;

      var fireball = self.physics.add.sprite( p1x+dx,p1y+dy, 'fireball').setScale(0.2);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);

      dx = (p3x - p2x)*step/balls;
      dy = (p3y - p2y)*step/balls;

      fireball = self.physics.add.sprite( p2x+dx,p2y+dy, 'fireball').setScale(0.2);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);

      dx = (p1x - p3x)*step/balls;
      dy = (p1y - p3y)*step/balls;

      fireball = self.physics.add.sprite( p3x+dx,p3y+dy, 'fireball').setScale(0.2);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);

      await delay(10);
    }

    await delay(1000);
     
    fireballs.getChildren().forEach(function (fireball) {
        fireball.disableBody(true, true)
        //fireball.destroy();
    });
    d1.disableBody(true,true)
    d2.disableBody(true,true)
    d3.disableBody(true,true)


  }();
}


function devildash(){
 ~async function(){  
    const delay = (s) => {
      return new Promise(function(resolve){
        setTimeout(resolve,s); 
      });
    };


    var bx = devil.x
    var by = devil.y
    console.log(by)
    const radi = 87; 
    for(var i = 0;i<360;i++){ 
      const fireball = self.physics.add.sprite(bx + radi*Math.cos(Math.PI*2*(i)/30) , by + radi*Math.sin(Math.PI*2*(i)/30) , 'fireball').setScale(0.2);
      fireball.anims.play('fire',true)
      fireballs.add(fireball);
      await delay(2);
    }

    var ax = player.x
    var ay = player.y
    var vx = (ax - bx)
    var vy = (ay - by)
     
    var vvv = Math.sqrt( (vx*vx) + (vy * vy) )/10;
    
    vx = vvv *( vx  / Math.sqrt( (vx*vx) + (vy * vy) ) )
    vy = vvv *( vy  / Math.sqrt( (vx*vx) + (vy * vy) ) )

    devil.body.setAllowGravity(false);
    for(var i = 0;i<20;i++){
      if(devil.y<1537){
        devil.x +=vx
        devil.y +=vy
        fireballs.getChildren().forEach(function (fireball) {
          fireball.x+=vx
          fireball.y+=vy
        });
      }else{
        devil.x -= Math.abs(vx)
        devil.y -= Math.abs(vy)
        fireballs.getChildren().forEach(function (fireball) {
          fireball.x-= Math.abs(vx)
          fireball.y-= Math.abs(vy)
        });

      }
      await delay(5);
    }
    fireballs.getChildren().forEach(function (fireball) {
        fireball.disableBody(true, true)
        //fireball.destroy();
    });


    devil.body.setAllowGravity(true);
    
    
  }();
}
