const express = require('express')
const app = express()
const port = 8800
const https = require('https')
const fs = require('fs');

var readylist = []

/**** ssl資料 ****/
var server = https.createServer({
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt'),
  ca: fs.readFileSync('./ssl/ca_bundle.crt'),
  requestCert: false,
  rejectUnauthorized: false
},app);
server.listen(port, ()=>{
  console.log(`port: ${port}`)
})

/*** 建立socket ****/
const io = require('socket.io').listen(server);


/**** database資料 ****/
var exist = false
var firebaseConfig = {
  apiKey: "AIzaSyCFZm71gA1VwC3gRLwgcuDPeZI-06GLxj4",
  authDomain:"test1-20b63.firebaseapp.com",
  databaseURL: "https://test1-20b63.firebaseio.com/",
  projectId: "test1-20b63",
  storageBucket: "test1-20b63.appspot.com",
  messagingSenderId: "115050522172",
  appId: "1:115050522172:web:2a21552bce3355b3df0539",
  measurementId: "G-2FSBV0C1TM"
}
var firebase = require('firebase');
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.use(express.static(`${__dirname}/dist`))

/**** register 建立 database ****/
app.get('/register', (req, res) => {
  if(req.query.id != "" && req.query.password != "" && req.query.parent_password !="" && req.query.nickname!="" ){//如果皆有輸入
    database.ref('account/'+req.query.id).once('value',v=>{
      if(v.val()==null){
        var input = {
          password:req.query.password,
          parent_password: req.query.parent_password,
          birthday: req.query.birthday,
          nickname: req.query.nickname,
          letter: "",
          letter_for_kid:"",
          score: 0,
          stage: 0
        } 
        var reff = database.ref('account/'+req.query.id);
        reff.set(input);
      }
      else{
        //若該使用者已經存在
      }
    });
  }
  else{
    //如果輸入有空白
  }
})

/**** 互相取名字 ****/
app.get('/naming_parent',(req,res)=>{
  var input = {
    child_nickname: req.query.child_nickname
  }
  var  reff = database.ref('account/'+req.query.path_id+'/task1/child/')
  reff.set(input)
})

app.get('/naming_child',(req,res)=>{
  var input = {
    parent_nickname: req.query.parent_nickname
  }
  var  reff = database.ref('account/'+req.query.path_id+'/task1/parent/')
  reff.set(input)
})


/**** login 確認密碼,資料傳給cookie ****/
app.get('/signin',(req, res) =>{
  database.ref('account/'+req.query.name+'/password/').once('value',v=>{
    if(v.val()==req.query.password){ //若密碼正確
      database.ref('account/'+req.query.name+'/').once('value',data=>{// 資料傳給cookie
        if(data.val()!=null){
          var pwd = data.val().parent_password
          var nickname = data.val().nickname
          var birthday = data.val().birthday
          var stage = data.val().stage
          console.log(typeof(nickname))
          console.log(nickname)
          //傳給cookie的資料為下
          res.send(`
            {
              "text": "<h1> choose your identity </h1>",
              "pwd": "${pwd}",
              "nickname": "${nickname}",
              "birthday": "${birthday}",
              "exist": true,
              "stage": "${stage}"
            }
          `)
        }
      });
    }
    else{//若密碼失敗
      res.send(`
        {
          "text": "wrong password or name!",
          "exist": false
        }
      `)
    }
  });
})

Array.prototype.remove = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                              this.splice(ax, 1);
                          }
            }
      return this;
};

/**** 所有socket溝通都包在io.on之下 ****/
io.on('connection', function(socket) {
  
  /*似乎是廢扣
  socket.on('sendMessage', function(data) {
    console.log('target is '+data.target);
    io.sockets.emit('receiveMessage', data);
  })*/

  /**** 故事結束.小朋友端顯示出蛋蛋 ****/
  socket.on('end_story', function(data){
    console.log("story end");
    io.sockets.emit('appear_egg', data);
  })  

  /**** 拉蛋 ****/
  socket.on('lay_egg', function(data){
    console.log("laying egg ");
    io.sockets.emit('get_egg', data);
  })  

/**** 小孩->大人.寫信並將信件存入database ****/
  socket.on('send_letter', function(data){
      //console.log(data);
      var reff = database.ref('account/'+data.ID);
      database.ref('account/'+data.ID).once('value',db=>{
        var letters;
        if(db.val().letter){
          letters = db.val().letter;
        }else{
          letters = [];
        }

        var d = new Date(); //取得當日日期
        var n = d.getMonth();
        n = n+1;
        var date = n + "/" + d.getDate();
        //console.log(date);

        letters.push({ // 將這些資料存到database的'letter'中
          content:data.Letter,
          date: date,
          read:false,
          letter_id: db.val().letter.length
        })

        // 將所有的資料再包一次.並傳進database. 不然新資料會覆蓋掉舊的資料
        var input = {
          password:db.val().password,
          parent_password: db.val().parent_password,
          birthday: db.val().birthday,
          nickname: db.val().nickname,
          letter: letters,
          letter_for_kid: db.val().letter_for_kid,
          score: db.val().score,
          stage: db.val().stage
        }
        reff.set(input);
        console.log(letters)
      });
    })

  /**** 大人->小孩.寫信並將信件存入database ****/
  socket.on('send_letter_to_kid', function(data){
    //console.log(data);
    var reff = database.ref('account/'+data.ID);
    database.ref('account/'+data.ID).once('value',db=>{
      var letters;
      if(db.val().letter_for_kid){
        letters = db.val().letter_for_kid;
      }else{
        letters = [];
      }

      var d = new Date(); //取得當日日期
      var n = d.getMonth();
      n = n+1;
      var date = n + "/" + d.getDate();
      //console.log(date);

      letters.push({ // 將這些資料存到database的'letter'中
        content:data.Letter,
        date: date,
        read:false,
        letter_id: db.val().letter_for_kid.length
      })

      // 將所有的資料再包一次.並傳進database. 不然新資料會覆蓋掉舊的資料
      var input = {
        password:db.val().password,
        parent_password: db.val().parent_password,
        birthday: db.val().birthday,
        nickname: db.val().nickname,
        letter: db.val().letter,
        letter_for_kid: letters,
        score:db.val().score,
        stage:db.val().stage
      }
      reff.set(input);
      console.log(letters)
    });
  })

    /**** 故事 ****/
    
    socket.on('kidready', function(data){
      readylist.push(data.ID);    
      console.log(readylist);
    })
    
    socket.on('MayIGo',function(data){
      var f = false;
      for(var i = 0;i< readylist.length;i++){
        if( readylist[i] == data.ID){
          f =true;
          break; 
        }
      }

      if(f){
        console.log('ok');
        socket.emit('Go', {ID:data.ID, Pass:true});
      }else{
        console.log('no');
        socket.emit('Go', {ID:data.ID, Pass:false});
      }
    })
    
    socket.on('need_help', function(data){
           console.log("help");
           console.log(data.ID)
           io.sockets.emit('help', {ID:data.ID});
    })

    socket.on('say_thank', function(data){
      console.log("thank");
      io.sockets.emit('thank', {ID:data.ID});
    })

    socket.on('end_story', function(data){
      console.log("story end");
      readylist.remove(data.ID); 
      database.ref('account/'+data.ID+'/stage').once('value',db=>{
        var s = 1;
        database.ref('account/'+data.ID+'/stage').set(1);
      });

      io.sockets.emit('get_egg', {ID:data.ID});
    })

    socket.on('lay_egg', function(data){
      console.log("laying egg ");
    })


  /**** P端dino_p頁面整理好時. check database 有沒有未讀信件 ****/
    socket.on('check_letter', function(data){
      database.ref('account/'+data.ID).once('value',db=>{
        for(var i=0; i< db.val().letter.length; i++)
        {
          if(db.val().letter[i].read == false)
          {
            socket.emit('letter_unread', data);//若有未讀信件.觸發此
            break;
          }
        }
      });
    })

    /**** p端按下信件按鈕. 傳給p沒有讀過得信件內容 ****/
    socket.on('give_me_letter', function(data){
      var letters = [];
      database.ref('account/'+data.ID).once('value',db=>{
        var j = 0;
        for(var i=0; i< db.val().letter.length; i++)
        {
          if(db.val().letter[i].read == false)
          {
            letters.push({
              content:db.val().letter[i].content,
              date: db.val().letter[i].date,
              letter_id: db.val().letter[i].letter_id
            });
          }
        }
        //console.log(letters);
        socket.emit('give_you_letter', {ID:data.ID, Letters:letters});//傳
      });
    })

    /* 確認有沒有信 */
    socket.on('is_there_letter', function(data){
      database.ref('account/'+data.ID).once('value',db=>{
        for(var i=0; i< db.val().letter.length; i++)
        {
          if(db.val().letter[i].read == false)
          {
            socket.emit('there_is_letter', {ID:data.ID});//傳
          }
        }
      });
    })

    /**** k端按下信件按鈕. 傳給k沒有讀過得信件內容 ****/
    socket.on('give_me_letter_k', function(data){
      var letters = [];
      database.ref('account/'+data.ID).once('value',db=>{
        var j = 0;
        for(var i=0; i< db.val().letter_for_kid.length; i++)
        {
          if(db.val().letter_for_kid[i].read == false)
          {
            letters.push({
              content:db.val().letter_for_kid[i].content,
              date: db.val().letter_for_kid[i].date,
              letter_id: db.val().letter_for_kid[i].letter_id
            });
          }
        }
        //console.log(letters);
        socket.emit('give_you_letter_k', {ID:data.ID, Letters:letters});//傳
      });
    })

    /**** p端確認信件並加分或不給分 ****/
    socket.on('score_letter', function(data){// data.score回傳0或是10分
      console.log(data.letter_id);
      database.ref('account/'+data.ID+'/letter/'+data.letter_id+'/read').set(true);

      database.ref('account/'+data.ID+'/score').once('value',db=>{
        var s = db.val();
        s+=data.score;//將目前的分數加上0或10
        database.ref('account/'+data.ID+'/score').set(s);
      });
    })

    socket.on('give_me_score', function(data){
      database.ref('account/'+data.ID+'/score').once('value',db=>{
        var s = db.val();
        socket.emit('give_you_score', {ID:data.ID, Score:s});//傳
      });
    })

    socket.on('give_me_stage', function(data){
      database.ref('account/'+data.ID+'/stage').once('value',db=>{
        var s = db.val();
        socket.emit('give_you_stage', {ID:data.ID, Stage:s});//傳
      });
    })

    socket.on('start_game_from_parent', function(data){
      console.log("Parent is ready");
      io.sockets.emit('parent_is_ready',{ID:data.ID});
    })

    socket.on('start_game_from_child', function(data){
      console.log("Child is ready");
      io.sockets.emit('child_is_ready',{ID:data.ID});
    })

    socket.on('p_bothReady',function(data){
      console.log("Both are ready");
      io.sockets.emit('p_both_ready',{ID:data.ID});
    })

    socket.on('c_bothReady',function(data){
      console.log("Both are ready");
      io.sockets.emit('c_both_ready',{ID:data.ID});
    })
    
    socket.on('ans1_1', function(data){
      console.log("ans1_1");
      io.sockets.emit('ans1_1_toClient',{ID:data.ID});
    })

    socket.on('ans1_2', function(data){
      console.log("ans1_2");
      io.sockets.emit('ans1_2_toClient',{ID:data.ID});
    })

    socket.on('ans1_3', function(data){
      console.log("ans1_3");
      io.sockets.emit('ans1_3_toClient',{ID:data.ID});
    })

    socket.on('ans1_4', function(data){
      console.log("ans1_4");
      io.sockets.emit('ans1_4_toClient',{ID:data.ID});
    })

    socket.on('ans1_5', function(data){
      console.log("ans1_5");
      io.sockets.emit('ans1_5_toClient',{ID:data.ID});
    })

    socket.on('ans2_1', function(data){
      console.log("ans2_1");
      io.sockets.emit('ans2_1_toClient',{ID:data.ID});
    })

    socket.on('ans2_2', function(data){
      console.log("ans2_2");
      io.sockets.emit('ans2_2_toClient',{ID:data.ID});
    })

    socket.on('ans2_3', function(data){
      console.log("ans2_3");
      io.sockets.emit('ans2_3_toClient',{ID:data.ID});
    })

    socket.on('ans2_4', function(data){
      console.log("ans2_4");
      io.sockets.emit('ans2_4_toClient',{ID:data.ID});
    })

    socket.on('ans2_5', function(data){
      console.log("ans2_5");
      io.sockets.emit('ans2_5_toClient',{ID:data.ID});
    })
    
    socket.on('game_over', function(data){
      console.log("game_over");
      io.sockets.emit('game_over_toClient',{ID:data.ID});
    })
    
/*
    socket.on('give_me_money', function(data){
      database.ref('account/'+data.ID+'/score').once('value',db=>{
        var s = db.val();
        socket.emit('give_you_score', {ID:data.ID, Score:s});
      });
    })
*/
    
})
