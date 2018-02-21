const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
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
