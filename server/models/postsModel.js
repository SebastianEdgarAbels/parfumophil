import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  pics: [
    {
      _id: false,
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
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  // where do i put the id of the user ?
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  // populate with user id the postModel
  // comments model with auth, text, auth_id, date
  date: {
    type: Date,
  },
  //
});

const postModel = mongoose.model("post", postSchema);
export default postModel;
