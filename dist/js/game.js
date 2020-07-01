var alpha,beta,gamma;
var wip = "wss://" + window.location.host;

var walltime = 0;
const jumpv = -660;
const fib = [377,610,987,1597,2584,4181,6765,10946,17711,28657,46368,75025,121393,196418,
317811,514229,832040,1346269,2178309,3524578,5702887,9227465,14930352,24157817,39088169,
63245986]
var fibc = 0;

//const height = window.innerHeight;
const height = 812*2.5;
//const width = window.innerWidth;
const width = 375*2.5;

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
  backgroundColor: '#FCFFEF',
  scene: { create, preload, update },
})

/*
$(document).ready(function () {

});
*/

// arrow function is not allowed, because of `this` binding
function preload() {
  // Step 1.1 code goes here
  this.load.setBaseURL('https://'+window.location.host)
  this.load.image('sky', 'res/game/foreground.png')
  this.load.image('floor', 'res/game/ground4.svg')
  this.load.image('ground2', 'res/game/ground2.svg')
  this.load.image('ground3', 'res/game/ground3.svg')
  this.load.image('ground1', 'res/game/ground1.svg')
  this.load.image('ground', 'res/game/platform.png')
  this.load.image('wall', 'res/game/wall.svg')
  this.load.image('star', 'res/game/star.png')
  this.load.image('bomb', 'res/game/bomb.png')
  this.load.spritesheet('dude',
    'res/game/dino.png',
    { frameWidth: 372.36, frameHeight: 307 }
  )
  // Step 8.1 code goes here
}

function create() {
  var self = this;
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
  //this.add.image(width/2, height/2, 'sky').setScale(2.6,2.9)//.refreshBody()
  // Step 2 code goes here
  platforms = this.physics.add.staticGroup()

  platforms.create(0, height/2, 'wall').setScale(4,2.5).refreshBody() // wall
  platforms.create(width*13/25, height*99/100, 'floor').setScale(2.55).refreshBody() //floor
  platforms.create(width*2/3, height*3/4, 'ground3').setScale(2.55, 2).refreshBody() //ground3
  platforms.create(width*12/55, height/2, 'ground1').setScale(2.5, 2.55).refreshBody() //ground1
  platforms.create(width/2, height/2, 'ground2').setScale(2.5, 2.5).refreshBody() //ground2
  //platforms.create(750, 220, 'ground').setScale(1, .5).refreshBody()
  //platforms.create( width/2, height , 'ground').setScale(1, .5).refreshBody() 看不懂這啥
  // Step 3 code goes here
  player = this.physics.add.sprite(100, 450, 'dude').setScale(0.5)
  player.alive = 1;
  player.setBounce(.2)
  player.setCollideWorldBounds(true)

  // Step 4.1 code goes here
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }), key: 'left', repeat: -1 })
  this.anims.create({ frameRate: 20, frames: [ { key: 'dude', frame: 5 } ], key: 'turn', })
  this.anims.create({ frameRate: 10, frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 10 }), key: 'right', repeat: -1 })
  otherPlayers = this.physics.add.group({
    allowGravity: false
  });
  otherPlayers.enableBody = true;
  bombs = this.physics.add.group()


  cursors = this.input.keyboard.createCursorKeys()
  // Step 4.3 code goes here
  this.physics.add.collider(player, platforms)
  this.physics.add.collider(otherPlayers, platforms)
  // Step 5.1 code goes here
  this.stars = this.physics.add.group({ key: 'star', repeat: 11, setXY: { x: 30, y: 0, stepX: 70 },setScale: { x: 2, y: 2} })
  stars = this.stars
  this.stars.enableBody = true;
  this.stars.children.iterate(star => star.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3)))

  this.physics.add.overlap(otherPlayers, stars, collectStar, null, this)
  this.physics.add.collider(this.stars, platforms)
  // eat star
  this.physics.add.overlap(player, this.stars, collectStar, null, this)
  // Step 6.1 code goes here
  score = 0
  scoreText = this.add.text(100, 40, 'Score: 0', { fontSize: '32px', fill: '#000' })
  // Step 7.1 code goes here
  this.physics.add.collider(bombs, platforms)
  this.physics.add.overlap(player, bombs, hitBomb, null, this)
  this.physics.add.overlap(player, otherPlayers, savePeople, null, this)
  this.physics.add.overlap(otherPlayers, bombs, otherhitBomb, null, this)

}

function addOtherPlayers(self, playerInfo) {
    const otherPlayer = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'dude').setScale(.5);
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.alive = 1;
    self.physics.add.overlap(otherPlayers, stars, collectStar, null, self)
    //self.physics.add.overlap(otherPlayer, self.stars, collectStar, null, this);
    otherPlayers.add(otherPlayer);
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
  const speed = 320
  var face = 0; 
  if(player.alive){
    if (cursors.left.isDown || gamma < -10) {
      player.setVelocityX(-speed)
      player.anims.play('left', true)
      face = -1;
    } else if (cursors.right.isDown || gamma > 10) {
      player.setVelocityX(speed)
      player.anims.play('right', true)
      face = 1;
    } else {
      player.setVelocityX(0)
      player.anims.play('turn')
      face = 0;
    }

    var x = player.x;
    var y = player.y;
    if (player.oldPosition && (x !== player.oldPosition.x || y !== player.oldPosition.y )) {
      this.socket.emit('playerMovement', { x: x, y: y,face:face});
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

    if ((cursors.up.isDown || cursors.space.isDown) && (player.body.touching.down)){
      player.setVelocityY(jumpv)
    }
    if( walltime<5 && (cursors.up.isDown || cursors.space.isDown) && ( player.body.touching.right || player.body.touching.left)){
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
    score_key = "game2" //game2_modify
    score_val = score
    var expires = new Date();
    expires.setTime(expires.getTime()+60*60*1000 );//10 min
    document.cookie = score_key + "=" + escape(score_val) +"; expires=" + expires.toGMTString();
    setTimeout("location.href='game_end.html'",2000);
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

function checkOverlap(spriteA, spriteB) {

      var boundsA = spriteA.getBounds();
      var boundsB = spriteB.getBounds();

      return Phaser.Rectangle.intersects(boundsA, boundsB);

}
