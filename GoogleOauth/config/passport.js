const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../models/User');
// var GoogleStrategy = require('passport-google-oauth').Strategy;
const Guser=require('../../models/GoogleUser');
passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done)=>{
  Guser.findById(id).then((user)=>{
    done(null,user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done)=>{
    Guser.findOne({googleid:profile.id}).then(async (currentUser)=>{
      if(currentUser)
      {
        //exists
        // console.log(currentUser);
        done(null,currentUser);
      }
      else
      {
        new Guser({
          username:profile.displayName,
          googleid:profile.id
        }).save().then((newUser)=>{
          // console.log(newUser);
          done(null,newUser);
        });
      }
    })
    
  }
));