import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  pics: {
    type: Array,
  },
  text: {
    type: String,
  },
  comments: {
    type: Array,
  },
  // where do i put the id of the user ?
  author: { type: "user" },
  // populate with user id the postModel
  // comments model with auth, text, auth_id, date
  //
});

const postModel = mongoose.model("post", postSchema);
export default postModel;
