import jsonWebToken from "jsonwebtoken";
import * as dotenv from "dotenv";

// load .env file"
dotenv.config();

// this will be async only if a callback is supplied, the callback is called with the err like in : -> jsonWebToken.sign(payload, secretOrPrivateKey, [options, callback])
const issueToken = (userId) => {
  const payload = {
    sub: userId,
  };

  const options = {
    expiresIn: "3 days",
  };

  ///this belongs to the env file
  // const secretOrPrivateKey = "this-is-the-secret-private-key";

  const token = jsonWebToken.sign(
    payload,
    process.env.SECRET_PRIVATE_KEY,
    options
  );

  return token;
};

export default issueToken;
