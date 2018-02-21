var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ccg3890';
var data;

    MongoClient.connect('mongodb://localhost', function (err, client) {
        if (err) throw err;

        var db = client.db('ccg3890');
        var fishingsite = db.collection('fishingsite');
        fishingsite.find({}).toArray(function(err, result) {
            if (err) throw err;
            data = result;
            client.close();
        });
    });


module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
     });

    app.get('/mdbcon', function (req, res) { //localhost:포트번호 로 접속시 선언한 items 출력
        res.send(data);
    });
}
