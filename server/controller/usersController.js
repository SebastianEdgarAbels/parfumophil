import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordValid from "../utils/isPasswordValid.js";
import issueToken from "../utils/jwt.js";
import { validationResult } from "express-validator";

//############## Image upload ##############//
//##########################################//
const imageUpload = async (req, res) => {
  // because is a form is .file i think i have to ask !!!!!!!!!!!
  console.log("req.file from usersController line11 :>> ", req.file);
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "usersImgProfile",
    });
    console.log("uploadedResult", uploadResult);
    res.status(200).json({
      msg: "image successfully uploaded",
      image: uploadResult.url,
      ImgPublic_id: uploadResult.public_id,
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
  console.log("req.body in the signup from uC", req.body);
  const { email, password, userName } = req.body;
  console.log("password :>> ", typeof password);
  // here I can and I should use the express validator
  // const isEmailValid = validateEmail(email); //then create isEmailValid in another folder
  // using the express logic here to check if the email is valid
  try {
    const errors = validationResult(req).array();
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      errors.push({ msg: "Email allready in use" });
      // res.status(200).json({
      //   msg: "Email allready in use",
      // });
      // } else if (password === "undefined") {
      //   errors.push({ msg: "You have to enter a password" });
      // res.status(200).json({
      //   msg: "You have to enter a password",
      // });
    } else {
      if (errors.length > 0) {
        console.log("errors :>> ", errors);
        return res.status(500).json({
          errors: errors,
        });
      } else {
        const hashedPassword = await encryptPassword(password);
        // console.log("hashedPassword", hashedPassword);
        const newUser = new userModel({
          email: email,
          password: hashedPassword,
          userName: userName,
          ImgPublic_id: req.body.ImgPublic_id ? req.body.ImgPublic_id : "",
          avatarPic: req.body.avatarPic
            ? req.body.avatarPic
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        });

        try {
          const savedUser = await newUser.save();
          // const populateSavedUser = await savedUser.populate({
          //   path: "comment",
          //   select: ["text", "date"],
          // });
          res.status(201).json({
            msg: "User Registered successfully ",
            user: savedUser,
          });
        } catch (error) {
          console.log("error :>> ", error);
          res.status(500).json({
            msg: "SignUp went wrong",
            error: error,
          });
        }
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
    // console.log("existingUser", existingUser);

    if (!existingUser) {
      // errors.push({ msg: "wrong email, do you have an account?" });
      res.status(200).json({
        errors: [{ msg: "wrong email, do you have an account?" }],
      });
    } else {
      const verified = await isPasswordValid(password, existingUser.password);
      // console.log("verified :>> ", verified);
      if (!verified) {
        // errors.push({ msg: "incorrect password" });
        res.status(401).json({
          errors: [{ msg: "incorrect password" }],
        });
      }
      // if (errors > 0) {
      //   console.log("errors :>> ", errors);
      //   return res.status(500).json({
      //     errors: errors,
      //   });
      // }
      if (verified) {
        const token = issueToken(existingUser._id);

        // this creates/generates the result
        res.status(200).json({
          msg: "Successfully logged in",
          user: existingUser,
          token,
        });
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
  const { id, userName, email, avatarPic, ImgPublic_id } = req.user;
  // console.log("req.user :>> ", req.user);
  res.status(200).json({
    _id: id,
    userName: userName,
    email: email,
    avatarPic: avatarPic,
    ImgPublic_id: ImgPublic_id,
  });
};

//#######################################################//

export { imageUpload, signup, login, getProfile };
