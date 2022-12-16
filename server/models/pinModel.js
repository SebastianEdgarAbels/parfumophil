import mongoose from "mongoose";

const { Schema } = mongoose;

const pinSchema = new Schema({
  commId: {
    type: Number,
  },
  // should i make here a findOne and then populate that with that
});
