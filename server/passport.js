//Login Auth Passport from reccess app
var passportLocal = require('passport-local').Strategy;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {return done(null, user);});

	passport.deserializeUser(function(user, done) {return done(null, user)});

		passport.use('local-signup', new passportLocal({
					usernameField: 'username',
					passwordField: 'password1',
					passReqToCallback: true 
				},
		function(req, email, password, done) {
			db = req.app.get('db');
			db.findExistingUser([req.body.username]).then(function(response) {
			    if (!response.length) {
                    db.createUserAccount([req.body.username, req.body.password1])
                    .then(function(response) {return done(null, response[0])})
			    	.catch(err => {return done(err, false)})
                    } 
                else {
			    	let message = "Error";
			    	if (response[0].user_name === req.body.username) {
			    		message = "Username already exists"
                    } 
			    	return done(null, false, {message: message})
			    	}
			})
		}));

		};