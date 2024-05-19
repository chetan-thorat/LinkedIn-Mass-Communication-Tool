const express = require('express');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Passport with LinkedIn strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['r_liteprofile', 'r_emailaddress'] // Updated scope to only read profile and email address
}, (accessToken, refreshToken, profile, done) => {
    // This function is called after successful authentication
    return done(null, { accessToken, profile });
}));

// Middleware for initializing Passport
app.use(passport.initialize());

// Routes
app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(`${process.env.FRONTEND_URL}/success`);
});

app.get('/followers', passport.authenticate('linkedin', { session: false }), (req, res) => {
    // Retrieve followers using LinkedIn API
    const { accessToken } = req.user;
    axios.get('https://api.linkedin.com/v2/me/connections?count=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.error('Error retrieving followers:', error.response.data);
        res.status(500).send('Error retrieving followers');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
