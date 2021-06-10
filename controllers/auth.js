const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => 
        res.render('sign-up')
    );

    // CREATING NEW USER/ SIGNUP
    app.post('/sign-up', (req, res) => {
        console.log(req.body)
        // Create user of User model instance
        const user = new User(req.body);

        // save then redirect to home
        user.save()
            .then((user) => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                return res.redirect('/')
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err });
            });
        console.log(user.username, user.password)
    });

    app.get('/login', (req, res) => 
        res.render('login')
    );

    app.post('/login', (req, res) => {
        console.log(req.body)
        const { username, password } = req.body;

        // Attempt to find User
        User.findOne({ username }, 'username password')
            .then((user) => {
                if (!user) {

                    // User does not exist
                    return res.status(401).send({ message: 'Wrong Username or Password' });
                }

                // Check password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Passwords = no match
                        return res.status(401).send({ message: 'Password\'s don\'t match' });
                    } 

                    // create token for user
                    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '60 days' });

                    // Set cookie to response and redirect
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    return res.redirect('/');
                })
                
            }).catch((err) => {
                console.log(err);
            });
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.redirect('/');
    });
}