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
const userCtrl = require('./server/userCtrl.js');
const kpiAdminCtrl = require('./server/kpiAdminCtrl.js')
const port = 3000;

const app = express();

app.use(json());
app.use(cors());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));

massive(config.connectionString).then(db => { app.set('db', db) })

app.get('/kpidata/:id', kpiCtrl.get);
app.get('/kpiinfo/:id', kpiCtrl.getinfo);
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: '/'}), loginCtrl.auth0CallBack)
app.get('/auth/me', loginCtrl.displayProfile);
app.get('/auth/logout', loginCtrl.logout);
app.get('/getusers', userCtrl.getusers);
app.get('/kpihistory', kpiAdminCtrl.getHistory);
app.get('/kpihistory/:id', kpiAdminCtrl.getKPIHistoryByID);

app.post('/kpidata', kpiCtrl.add);
app.post('/addNewKPI', kpiAdminCtrl.add)

app.put('/kpidata/:id', kpiCtrl.update);
app.put('/userupdate', userCtrl.userupdate);

app.delete('/kpidata/:id', kpiCtrl.delete);

passport.use(new Auth0Strategy(config.auth0, (accessToken, refreshToken, extraParams, profile, done) => {
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
        else { 
        //console.log('FOUND USER', user);
        return done(null, user);
      }
    });
  }
));

passport.serializeUser(loginCtrl.serialize);

passport.deserializeUser(loginCtrl.deserialize);

app.listen(port, () => { console.log(`Listening on port: ${port}`)});