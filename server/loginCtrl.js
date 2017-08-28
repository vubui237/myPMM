module.exports = {
    displayProfile: (req, res) => {
        console.log(req.user);
        if (!req.user) return res.redirect('/auth/')  //If user does not exist, redirect them to the login page.
        res.status(200).send(req.user)
    },
    auth0CallBack: (req, res) => { 
        res.status(200).send(req.user); 
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('https://vubui237.auth0.com/v2/logout');
    },
    serialize: (userA, done) => {
        let userB = userA;
        //Serialize id, get other information to add to session, 
        done(null, userB); //PUTS 'USER' ON THE SESSION
    },
    deserialize: (userB, done) => {
        let userC = userB;
        done(null, userC); //PUTS 'USER' ON REQ.USER
    }
}