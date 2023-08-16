// oauth2

const passportGoogle  = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {  GOOGLE_CLIENT_ID , GOOGLE_CLIENT_SECRECT} = process.env

const emails = ["holamundo@gmail.com"];

passportGoogle.use("aut-google",
    new GoogleStrategy(
        { 
            clientID: GOOGLE_CLIENT_ID ,
            clientSecret : GOOGLE_CLIENT_SECRECT,
            callbackURL : "http://localhost:3002/auth/google"
        },

        function(accessToken, refreshToken, profile, done){
             const response = emails.includes(profile.emails[0].value);

             if(response){
                done(null,profile);
             }else {
                emails.push(profile.emails[0].value);
                done(null,profile);
             }
        }
    )
)

module.exports = {
    passportGoogle: passportGoogle,
};