const passport = require('passport')

const GitHubStategy = require('passport-github').Strategy
const User = require('./../models/user')

passport.use(new GitHubStategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: `${process.env.HOSTNAME}/auth/github/callback`},
  (accessToken, refreshToken, profile, done) => {

    User.findOrCreate({username: profile.username}, (err,user) => {
      if (err) {
        console.log("Error")
        return done(err)
      }

      return done(null,user)

    })
}))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

module.exports = passport
