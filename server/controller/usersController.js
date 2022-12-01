import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";

const imageUpload = async (req, res) => {
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
const signup = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;

  try {
    const existingUser = userModel.findOne({ email: email });
    if (existingUser) {
      res.status(200).json({
        msg: "Email allready in use",
      });
    } else {
    }
  } catch (error) {
    res.status(500).json({
      msg: "Smth went wrong during signup",
      error: error,
    });
  }
};

export { imageUpload, signup };
