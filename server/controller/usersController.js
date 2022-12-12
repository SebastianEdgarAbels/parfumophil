import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordValid from "../utils/isPasswordValid.js";
import issueToken from "../utils/jwt.js";

//############## Image upload ##############//
//##########################################//
const imageUpload = async (req, res) => {
  // because is a form is .file i think i have to ask !!!!!!!!!!!
  console.log("req.file :>> ", req.file);
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "usersImgProfile",
    });
    console.log("uploadedResult", uploadResult);
    res.status(200).json({
      msg: "image successfully uploaded",
      image: uploadResult.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during upload",
    });
  }
};
//######################################################//

//################### SIGN UP ###################//
//###############################################//
const signup = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password, userName } = req.body;
  console.log("password :>> ", typeof password);
  // here I can and I should use the express validator
  // const isEmailValid = validateEmail(email) then create isEmailValid in another folder
  // using the express logic here to check if the email is valid
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(200).json({
        msg: "Email allready in use",
      });
    } else if (password === "undefined") {
      res.status(200).json({
        msg: "You have to enter a password",
      });
    } else {
      const hashedPassword = await encryptPassword(password);
      // console.log("hashedPassword", hashedPassword);
      const newUser = new userModel({
        email: email,
        password: hashedPassword,
        userName: userName,
        avatarPic: req.body.avatarPic
          ? req.body.avatarPic
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "User Registered successfully ",
          user: savedUser,
        });
      } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json({
          msg: "SignUp went wrong",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Smth went wrong during signup",
      error: error,
    });
  }
};
//######################################################//

//################### LOGIN ###################//
//#############################################//
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    console.log("existingUser", existingUser);

    if (!existingUser) {
      res.status(200).json({
        msg: "wrong email, do you have an account?",
      });
    } else {
      const verified = await isPasswordValid(password, existingUser.password);
      console.log("verified :>> ", verified);
      if (!verified) {
        res.status(401).json({
          msg: "incorrect password",
        });
      }
      if (verified) {
        console.log("verified :>> ", verified);
        const token = issueToken(existingUser._id);
        console.log("token", token);

        // this creates/generates the result
        res.status(200).json({
          msg: "Successfully logged in",
          user: {
            userName: existingUser.userName,
            id: existingUser._id,
            email: existingUser.email,
            avatarPic: existingUser.avatarPic,
          },
          token,
        });
        // i remain here where i have to send the res to the front-end min 1.01.30
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      msg: "login went wrong",
    });
  }
};
//######################################################//

//######################## PROFILE ########################//
//########################################################//
const getProfile = async (req, res) => {
  // here is req.user because i've made that strategy in passport.js
  const { id, userName, email, avatarPic } = req.user;
  console.log("req.user :>> ", req.user);
  res.status(200).json({
    _id: id,
    userName: userName,
    email: email,
    avatarPic: avatarPic,
  });
};

//#######################################################//

export { imageUpload, signup, login, getProfile };
