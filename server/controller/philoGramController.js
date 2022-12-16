import postModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

// ################################# GET ALL PHILOGRAM ######################################### //

const allPhilogram = async (req, res) => {
  // find
};
// ################################################################################### //

// ######################### CREATE (new perfume, thred) ######################### //
// ################################################################################### //
const uploadToCloud = async (file) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "philoGram",
    });

    return {
      image: uploadResult.url,
      ImgPublic_id: uploadResult.public_id,
    };
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during upload",
    });
  }
};
// ######################### CREATE (upload new pic for the Gram) ######################### //
const imgUploadGram = async (req, res) => {
  const { id } = req.user;
  console.log("id :>> ", id);
  console.log("req.file from gramController line18 :>> ", req.files);
  if (id) {
    const urls = [];

    for (const file of req.files) {
      urls.push(await uploadToCloud(file));
    }

    res.status(200).json({
      msg: "image successfully uploaded",
      images: urls,
    });
  } else
    res.status(406).json({
      msg: "User not logged in",
    });
};
// ################################################################################### //

// ######################### CREATE (upload new video for the Gram) ######################### //
const videoUpload = async (req, res) => {
  const { id } = req.user;
  console.log("req.file from gramController line44 :>> ", req.file);
  console.log("id", id);
  if (id) {
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "philoGram",
      });
      console.log("uploadedResult", uploadResult);
      res.status(200).json({
        msg: "image successfully uploaded",
        video: uploadResult.url,
        videoPublic_id: uploadResult.public_id,
      });
    } catch (error) {
      res.status(500).json({
        msg: "something went wrong during upload",
      });
    }
  }
};
// ################################################################################### //

export { allPhilogram, imgUploadGram, videoUpload };
