// import perfumeModel from "../models/perfumesModel.js";
import userModel from "../models/usersModel.js";

// ######################### UPDATE (users profile, comments) ######################### //
// ################################################################################### //

const updateUserName = async (req, res) => {
  const { userName } = req.body;
  const { id } = req.user;
  console.log("req.body din crud:>> ", req.body.userName);

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
  const { avatarPic } = req.body;
  const { id } = req.user;

  try {
    const updatePic = await userModel.findOneAndUpdate(
      { _id: id },
      { avatarPic: avatarPic },
      { new: true }
    );
    res.status(200).json({
      msg: "New Avatar Picture successfully uploaded",
    });
  } catch (error) {
    console.log("error from uploading the avatar Picture", error);
    res.status(406).json({
      error: error || "error from uploading the avatar Picture",
    });
  }
};
// ################################################################################### //

// ######################### DELETE (users profile, comments, thread) ######################### //
// ################################################################################### //

// ######################### DELETE (users avatarPic) ######################### //
const deleteAvatarPic = async (req, res) => {
  const { id } = req.body;
  // console.log("req.body din crud:>> ", req.body);

  try {
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
  const { id } = req.body;

  //   console.log("req.body :>> ", req.body);

  //   if (req.body.userName) {
  //     variabLeName = userName;
  //   }

  try {
    const deleteUser = await userModel.findByIdAndDelete(
      { _id: id }
      /* Sending a response to the client. */
      //   res.status(200).json({
      //     msg: "Account successfully deleted."
      //   });

      //   { aVariable: avariable }
    );
    res.status(200).json({
      msg: "Youre profile is successfully deleted!",
    });

    // delete field
    // const deleteField = await userModel.
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
