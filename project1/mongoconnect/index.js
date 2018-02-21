var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ccg3890';
var http = require('http'); //web http생성
var express = require('express'); //express 모듈실행 
var app = express();
app.use(express.static('public')); //index폴더 설정
var data;


var items = [{
 name: 'test1',
 age : '11'
}, {
 name: 'test2',
 age : '11'
}, {
 name: 'test3',
 age : '11'
}];

http.createServer(app).listen(7777, function () { //5902는 포트번호

 console.log('서버 실행중 7777포트에서');  //명령프롬프트창에 서버 실행시 보여짐

});

    MongoClient.connect('mongodb://localhost', function (err, client) {
        if (err) throw err;
      
        var db = client.db('ccg3890');
        var fishingsite = db.collection('fishingsite');
        fishingsite.find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            data = result;
            client.close();
          });
    });

 app.get('/test', function (req, res) { //localhost:포트번호 로 접속시 선언한 items 출력

    res.send(data);
   });
