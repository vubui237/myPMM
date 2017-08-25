module.exports = {
    displayProfile: (req, res) => {
        if (!req.user) 
        return res.redirect('/auth/')  //If user does not exist, redirect them to the login page.
        res.status(200).send(req.user)
    },

    auth0CallBack: (req, res) => { 
        res.status(200).send(req.user); 
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/auth');
    },
    
}