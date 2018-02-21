var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ccg3890';
var http = require('http'); //web http생성
var express = require('express'); //express 모듈실행 
var passport = require('passport');  
var app = express();
var l_user;

var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    console.log('serializeUser==');
    console.log(user);
    l_user = user;
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('deserializeUser==');
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: '377888596402-r0d00dm3gb234oevqq981chppmd10g63.apps.googleusercontent.com',
        clientSecret: 'PCx6sRypGPpYzjoX8HLD4Bhi',
        callbackURL: 'http://ccg3890.ddns.net:8888/oauth/callback'
        
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            user = profile;
            return done(null, user);
        });
    }
));

app.use(express.static('public')); //index폴더 설정

http.createServer(app).listen(8888, function () { //5902는 포트번호
    console.log('daaaaa');
});

   app.get('/oauth',passport.authenticate('google', { scope:
    ['profile']}),function(req,res){app.use(passport.initialize());};

    app.get('/login', passport.authenticate('google', { scope:
        console.log('fail ....')}));

    app.get('/oauth/callback', passport.authenticate( 'google', { failureRedirect: '/login' }),
    function(req, res) {
        app.use(passport.session());
            console.log('success....');
            res.redirect('/test'); 
   }
);

   app.get('/test',function (req, res){
    res.send(l_user);
   });
