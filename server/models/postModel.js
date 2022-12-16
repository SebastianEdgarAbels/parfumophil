import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  pics: [
    {
      public_id: String,
      url: String,
    },
  ],
  video: {
    public_id: String,
    url: String,
  },
  perfumeTag: {
    type: String,
  },
  text: {
    type: String,
  },
  comments: {
    type: Array,
  },
  // where do i put the id of the user ?
  author: { type: Object },
  // populate with user id the postModel
  // comments model with auth, text, auth_id, date
  date: {
    type: Date,
  },
  //
});

const postModel = mongoose.model("post", postSchema);
export default postModel;
