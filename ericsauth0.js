const express = require('express')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

let app = express();
app.use(session({secret: 'secretsecretigotasecret'}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Auth0Strategy({
 domain: 'erpatterson11.auth0.com',
 clientID: 'U50ElZSHXRyxTCgqEgocVphL4xDEq18X',
 clientSecret: 'hX9P8mZ6nRVNXFhENGYA1taYWmkGXPAYsmvxQrvN-TZWPKnscmJl4uPE02IGj3Uq',
 callbackURL: '/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {





 return done(null, profile)
}));


// Start passport authentication with auth0 using Auth0Strategy
// Passport.authenticate will create a req/res function
app.get('/auth', passport.authenticate('auth0'))

//Auth0 returns to this endpoint
// This callback location must match the callbackURL in the Auth0Strategy
app.get('/auth/callback',
 passport.authenticate('auth0', {
   successRedirect: '/me',
   failureRedirect: '/login'
  })
)

// Serialize encodes profile and adds on to session
// This function receives the results of the function in the new instance of Auth0
// Profile is passed on to sessions
passport.serializeUser(function(user, done) {
 done(null, user);
})


// Deserialize decodes profile from session to put on to req.user
passport.deserializeUser(function(user, done) {
 done(null, user)
})

// Return user object from session
app.get('/me', function(req, res) {
 res.send(req.user)
})




app.listen(3001, ()=> console.log('Listening to Andre3001'))