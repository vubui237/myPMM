const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const config = require('./config.js');
const kpiCtrl = require('./server/kpiCtrl.js');
const loginCtrl = require('./server/loginCtrl.js');
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
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/'}), loginCtrl.auth0CallBack)
app.get('/auth/me', loginCtrl.displayProfile);
app.get('/auth/logout', loginCtrl.logout);

app.post('/kpidata', kpiCtrl.add);

app.put('/kpidata/:id', kpiCtrl.update);

app.delete('/kpidata/:id', kpiCtrl.delete);

passport.use(new Auth0Strategy({
   domain:       config.auth0.domain,
   clientID:     config.auth0.clientID,
   clientSecret: config.auth0.clientSecret,
   callbackURL:  '/auth/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    //Find user in database
    // console.log(profile)
    const db = app.get('db');
    db.getUserByAuthId([profile.id]).then((user) => {
        if (user.length < 1) { //if there isn't one, we'll create one!
            //console.log('CREATING USER');
            db.createUserByAuth([profile.displayName, profile.id]).then((user) => {
            //console.log('USER CREATED', user);
            return done(null, user[0]); // GOES TO SERIALIZE USER
            })
        } 
        else { //when we find the user, return it
        //console.log('FOUND USER', user);
        return done(null, user);
      }
    });
  }

));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser((userA, done) => {
  //console.log('serializing', userA);
  let userB = userA;
  //Things you might do here :
   //Serialize just the id, get other information to add to session, 
  done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser((userB, done) => {
  let userC = userB;
    //console.log(userC[0]);
    //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
  done(null, userC); //PUTS 'USER' ON REQ.USER
});

app.listen(port, () => { console.log(`Listening on port: ${port}`)});