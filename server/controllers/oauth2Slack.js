// const AuthyAPIKey = require('../config/Authy.js');
// const authy = require('authy');
/* passport.js */
const passport = require('passport-slack');
const SlackAPIKey = require('../config/SlackOAuth2ApiKey.js');
// const User = require(/* some model */);
const session = require('express-session');



module.exports = {
  /* handles all login, logout, signup */
  IsLoggedIn: (req, res, next) => {
    // /* End point URL ::: https://slack.com/oauth/authorize */
    // if (req.session.passport ? req.session.passport.user : false) {
    //   next();
    // } else {
    //   req.session.error = 'Bad credentials.';
    //   res.redirect('/');
    // }

  },

  register: (req, res) => {

  },

  login: (req, res) => {
    passport.use(new SlackStrategy({
           clientID: '',
           clientSecret: '',
           callbackURL: 'www.uai.website/',
           scope: 'incoming-webhook, users:read',
           skipUserProfile: false
       }, (accessToken, refreshToken, profile, done)=>{
         (accessToken, refreshToken, profile, (err, user) => {
           console.log(accessToken, refreshToken, profile);
           console.log(user);
           return done(err, user);
         })
       }));
    // passport.use(new SlackStrategy({
    //   /* clientID : req.body */
    //     clientID: "devJin86",
    //     clientSecret: 'CLIENT_SECRET'
    //   },
    //   (accessToken, refreshToken, profile, done) => {
    //     console.log(({ SlackId: profile.id }, function (err, user) {
    //       return done(err, user);
    //     }));
    //   }
    // ));
  },

  logout: (req, res) => {

  }
}
