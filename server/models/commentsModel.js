import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
  },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  date: {
    type: Date,
  },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
