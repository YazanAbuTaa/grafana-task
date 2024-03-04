const passport = require("passport");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const googleClientId = '1068543422127-7icik8k6p263qa4lhkrcgqusno04mjhk.apps.googleusercontent.com';
const googleClientSecret = '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'; //fetch from env
passport.use(new GoogleStrategy({
    clientID:     googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //on login
    
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})