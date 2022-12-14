// import perfumeModel from "../models/perfumesModel.js";
import userModel from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

// ######################### UPDATE (users profile, comments) ######################### //
// ################################################################################### //

const updateUserName = async (req, res) => {
  const { userName } = req.body;
  const { id } = req.user;
  // console.log("req.body din crud:>> ", req.body.userName);
  // console.log("id :>> ", id);

  try {
    const updateName = await userModel.findOneAndUpdate(
      { _id: id },
      { userName: userName },
      { new: true }
    );
    res.status(200).json({
      msg: "Username successfully updated.",
    });
  } catch (error) {
    console.log("error by updating the username", error);
    res.status(406).json();
  }
};

// ################################################################################### //

// ######################### UPDATE USERS AVATAR pic ######################### //
const updateAvatarPic = async (req, res) => {
  console.log("req.file :>> ", req.file);

  const { _id } = req.user;
  console.log("req.user :>> ", req.user);

  /* It's uploading the image to the cloudinary server. */
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "usersImgProfile",
    });
    console.log("uploadResult", uploadResult);

    if (uploadResult) {
      try {
        const updatePic = await userModel.findOneAndUpdate(
          { _id: _id },
          { avatarPic: uploadResult.url },
          { new: true }
        );
        res.status(200).json({
          msg: "New Avatar Picture successfully uploaded",
          updatePic,
        });
      } catch (error) {
        console.log("error from uploading the avatar Picture", error);
        res.status(406).json({
          error: error || "error from uploading the avatar Picture",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during upload",
    });
  }
};
// ################################################################################### //

// ######################### DELETE (users profile, comments, thread) ######################### //
// ################################################################################### //

// ######################### DELETE (users avatarPic) ######################### //
const deleteAvatarPic = async (req, res) => {
  const { id, avatarPic } = req.body;
  console.log("req.body din crud:>> ", req);
  // cloudinary.api
  //   .resource(avatarPic)
  //   .then((res) => console.log("res :>> ", res))
  //   .catch((err) => console.log("err :>> ", err));
  try {
    // HERE HERE HERE HERE HERE HERE  // HERE HERE HERE HERE HERE HERE
    const deletePicFromCloudinary = await cloudinary.uploader.destroy(
      "usersImgProfile/ab4twnruhjegowrph4bh"
    );
    // const deletePic = await userModel.findOneAndUpdate(
    //   { _id: id },
    //   {
    //     avatarPic:
    //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    //   },
    //   { new: true }
    // );
    res.status(200).json({
      msg: "Avatar Picture deleted!",
    });
  } catch (error) {
    console.log("Can't delete the avatar picture :>> ", error);
    res.status(406).json();
  }
};

// ######################### DELETE (users profile) ######################### //
const deleteUsersProfile = async (req, res) => {
  const { id } = req.body;

  try {
    // HERE HERE HERE HERE HERE HERE   // HERE ASWELL
    const deleteUser = await userModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      msg: "Youre profile is successfully deleted!",
    });
  } catch (error) {
    console.log("error bei deleting", error);
    res.status(500).json({
      err: error.message || "Error while deleting user",
    });
  }
};

// ################################################################################### //

// ######################### CREATE (new perfume, thred) ######################### //
// ################################################################################### //

// ################################################################################### //

export { deleteUsersProfile, deleteAvatarPic, updateUserName, updateAvatarPic };
