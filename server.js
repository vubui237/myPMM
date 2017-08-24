const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const config = require('./config.js');
const kpiCtrl = require('./server/kpiCtrl.js');
const port = 3000;

const app = express();
app.use(json());
app.use(cors());

app.use(session({
  resave: config.session.resave, //Without this you get a constant warning about default values
  saveUninitialized: config.session.saveUninitialized, //Without this you get a constant warning about default values
  secret: config.session.secret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));

massive(config.connectionString).then(db => {
    app.set('db', db);
})

app.get('/kpidata/:id', kpiCtrl.get);
app.post('/kpidata', kpiCtrl.add);
app.put('/kpidata/:id', kpiCtrl.update);
app.delete('/kpidata/:id', kpiCtrl.delete);



//
passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    // console.log(profile)
    const db = app.get('db');
    db.getUserByAuthId([profile.id]).then(function(user) {
        console.log("whatsup", user);
      if (user.length <= 0) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.displayName, profile.id]).then(function(user) {
          console.log('USER CREATED', user);
          return done(null, user[0]); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(null, user);
      }
    });
  }

));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
  console.log('serializing', userA);
  var userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
  var userC = userB;
  //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
  passport.authenticate('auth0', {successRedirect: '/'}), function(req, res) {
      console.log('success!')
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})





app.listen(port, () => { console.log(`Listening on port: ${port}`)});