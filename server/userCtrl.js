module.exports = {
		createUserAccount: function(req, res, next) {
			db = req.app.get('db');
			let validation_errors = false;
			if (!req.body.username || !req.body.password1) {
				validation_errors = true;
			}
			if (!validation_errors) {
                db.findExistingUser([req.body.username])
                .then(function(response) {
					if (!response.length) {
                        db.createUserAccount([req.body.username, req.body.password1])
                        .then(function(response) {
							return res.status(200).json(response[0])
                        })
                        .catch(err => {
							return res.status(500).json(err)
					    })
                        } 
                    else {
							var message = "Error";
							if (response[0].user_name === req.body.username) {
								message = "Username already exists"
							} 
							return res.status(401).json({
								message: message
							})
						}
				})
			}
	}
}