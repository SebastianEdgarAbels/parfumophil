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
  console.log("req.file from user img update line 33:>> ", req.file);

  const { _id } = req.user;
  console.log("req.user from user img update line 36:>> ", req.user);
  console.log("req.user.ImgPublic_id lalaalal :>> ", req.user.ImgPublic_id);

  /* It's uploading the image to the cloudinary server. */
  try {
    // first delete the old 1 in the cloudinary
    if (req.user.ImgPublic_id !== "") {
      console.log(
        "req.user.ImgPublic_id in update crud",
        req.user.ImgPublic_id
      );
      const deletePicFromCloudinary = await cloudinary.uploader
        .destroy(req.user.ImgPublic_id)
        .then((result) =>
          console.log(
            "result from deleting the pic before uploading new one",
            result
          )
        );
      console.log("deletePicFromCloudinary", deletePicFromCloudinary);
    }

    // if (deletePicFromCloudinary) {
    // then upload the new 1 in the clodinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "usersImgProfile",
    });
    console.log("uploadResult", uploadResult);

    // if the upload is successfull, then save it also in mongoDB
    if (uploadResult) {
      try {
        const updatePic = await userModel.findOneAndUpdate(
          { _id: _id },
          { avatarPic: uploadResult.url, ImgPublic_id: uploadResult.public_id },
          { new: true }
        );
        res.status(200).json({
          msg: "New Avatar Picture successfully uploaded",
          updatePic: updatePic,
        });
      } catch (error) {
        console.log("error from uploading the avatar Picture", error);
        res.status(406).json({
          error: error || "error from uploading the avatar Picture",
        });
      }
    }
    // }
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
  const { id, ImgPublic_id } = req.body;
  console.log("req.body din crud:>> ", req.body.ImgPublic_id);
  // cloudinary.api
  //   .resource(avatarPic)
  //   .then((res) => console.log("res :>> ", res))
  //   .catch((err) => console.log("err :>> ", err));
  try {
    // here i delete the image from cloudinary
    const deletePicFromCloudinary = await cloudinary.uploader.destroy(
      ImgPublic_id
    );
    // console.log("ImgPublic_id", ImgPublic_id);

    // console.log("deletePicFromCloudinary :>> ", deletePicFromCloudinary);
    const deletePic = await userModel.findOneAndUpdate(
      { _id: id },
      {
        avatarPic:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      },
      { new: true }
    );
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
  const { id, ImgPublic_id } = req.body;

  try {
    const deletePicFromCloudinary = await cloudinary.uploader.destroy(
      ImgPublic_id
    );
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
