const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');

dotenv.config();

const emails = ['holamundo@gmail.com'];

passport.use(
    'aut-google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3002/auth/logGoogle',
        },
        function (accessToken, refreshToken, profile, done) {
            const response = emails.includes(profile.emails[0].value);

            if (response) {
                done(null, profile);
            } else {
                emails.push(profile.emails[0].value);
                done(null, profile);
            }
        }
    )
);

module.exports = passport;