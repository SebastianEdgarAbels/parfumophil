// regarding passport everything is tooken from the passport documentation and adapted

import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import * as dotnev from "dotenv";
import userModel from "./models/usersModel.js";

dotnev.config();

//   ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  // this method => Extract.Jwt will allow me to extract the token that I'm sending, from my request
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_PRIVATE_KEY,
};

// create the var that it's gonna be used as a strategy
// done is a callback
const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      // console.log("err :>> ", err);
      return done(err, false);
    }
    if (user) {
      // console.log("user in passport>>>>>", user);
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
