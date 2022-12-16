import postModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

// ################################# GET ALL PHILOGRAM ######################################### //

const allPhilogram = async (req, res) => {
  // find
};
// ################################################################################### //

// ######################### CREATE (new perfume, thred) ######################### //
// ################################################################################### //

// ######################### CREATE (upload new pic for the Gram) ######################### //
const imgUploadGram = async (req, res) => {
  console.log("req.file from crudController line157 :>> ", req.file);
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "philoGram",
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
// ################################################################################### //

// ######################### CREATE (upload new video for the Gram) ######################### //
const videoUpload = async (req, res) => {
  console.log("req.file from crudController line179 :>> ", req.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      quality: "auto",
      fetch_format: "auto",
      folder: "philoGram",
    });
    console.log("uploadedResult", uploadResult);
    res.status(200).json({
      msg: "image successfully uploaded",
      image: uploadResult.url,
      videoPublic_id: uploadResult.public_id,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during upload",
    });
  }
};
// ################################################################################### //

export { imgUploadGram, videoUpload };
