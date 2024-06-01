const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
passport.use(new GoogleStrategy({
  clientID: '574780300074-ebkgp14bbq7ps7j05ddvbk4bd3qm9vcg.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // This function is called after successful authentication
  // You can customize this to handle user data storage and session creation
  console.log('passed auth');
  return done(null, profile);
}
));
