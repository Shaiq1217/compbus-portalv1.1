const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const users = {}; // This is a placeholder. Replace it with your actual user storage logic


passport.use(new GoogleStrategy({
  clientID: '574780300074-ebkgp14bbq7ps7j05ddvbk4bd3qm9vcg.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // Find or create the user in your database
  const user = users[profile.id] || (users[profile.id] = { googleId: profile.id, profile });
  return done(null, user);
}));


// Serialize user to the session
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  const user = users[id];
  done(null, user);
});