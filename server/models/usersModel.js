import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarPic: {
    type: String,
  },
  ImgPublic_id: {
    type: String,
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  ],
  // comment: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "comment",
  //   },
  // ],
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
