import { v2 as cloudinary } from "cloudinary";
import commentModel from "../models/commentsModel.js";
import postModel from "../models/postsModel.js";

// ################################# GET ALL PHILOGRAM ######################################### //

const allPhilogram = async (req, res) => {
  try {
    const allThreads = await postModel
      .find({})
      .populate({ path: "user", select: ["_id", "userName", "avatarPic"] })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          model: "user",
        },
      })
      .exec();
    res.status(200).json({
      number: allThreads.length,
      allPosts: allThreads,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(406).json({
      error: error,
      msg: "smth went wrong",
    });
  }
};
// ################################################################################### //

// ######################### CREATE (Upload new pic(s) to cloudinary) ######################### //
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
    // console.log("urls", urls);
  } else
    res.status(406).json({
      msg: "User not logged in",
    });
};
// ################################################################################### //

// ######################### CREATE (upload video to cloudinary) ######################### //
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
        msg: "video successfully uploaded",
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

// ######################### CREATE (the post thread) ######################### //

const postThread = async (req, res) => {
  console.log("req.body din PGC line 103 :>> ", req.body);
  console.log("req.user din PGC line 104 :>> ", req.user);

  const { pics, video, perfumeTag, text } = req.body;
  console.log("req.body", req.body);
  const { id } = req.user;
  console.log("pics from BE PGC l 110", pics);
  try {
    const newPost = new postModel({
      pics: pics,
      video: video,
      perfumeTag: perfumeTag,
      text: text,
      user: id,
      comment: [],
      date: new Date(),
    });
    const post = await (
      await newPost.save()
    ).populate({ path: "user", select: ["userName", "avatarPic"] });

    console.log("post :>> ", post);
    res.status(202).json({
      post: post,
      msg: "new post created",
    });
  } catch (err) {
    console.log("error when posting the new Post in BE PGC l 130", err);
  }
};

// ################################################################################### //

// ######################### CREATE (Comments) ######################### //

const createComment = async (req, res) => {
  console.log("res.body :>> ", req.body);
  const { text, postId } = req.body;

  try {
    const newComment = new commentModel({
      text: text,
      date: new Date(),
      author: req.user._id,
    });
    const commentPost = await newComment.save();
    const comment = await commentPost.populate({
      path: "author",
      select: ["_id", "userName", "avatarPic"],
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    console.log("commentPost in BE >>>>>>>>", commentPost);
    res.status(202).json({
      commentPost: comment,
      msg: "new comment created",
    });
  } catch (error) {
    console.log("error posting new comment BE PGC l 153", error);
  }
};
// ################################################################################### //

export { allPhilogram, imgUploadGram, videoUpload, postThread, createComment };
