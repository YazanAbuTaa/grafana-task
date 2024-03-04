const express = require("express");
const session = require("express-session");
const auth = require("./auth");
const passport = require("passport");

const app = express();
app.use(session({secret: 'secretText'})); //add to env var
app.use(passport.initialize());
app.use(passport.session());
function authMiddleware(req, res, next) {
    req.user? next() : res.status(401).send("Error: You need to be logged in to view this page");

}

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">auth with google</a>')
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));
app.get('/auth/failure',(req,res) => {
    res.send("Failed to authenticate user, please try again.");
});


app.get('/logout', (req, res, next) => {
    req.logout(err => {
      if (err) { return next(err); }
      req.session.destroy();
      res.redirect('/');
    });
  });


app.get('/google/callback', passport.authenticate('google',
{successRedirect:'/app',
failureRedirect:'/auth/failure'}))

app.get('/app',authMiddleware,(req, res) => {
    res.send(`Hello ${req.user.displayName}`);
} );

app.listen(5000, ()=> console.log("listening on port 5000"));