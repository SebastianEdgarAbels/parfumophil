import mongoose from "mongoose";

const { Schema } = mongoose;

const perfumeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  designer: {
    type: String,
    required: true,
    unique: false,
  },
  typ: {
    type: String,
    required: true,
    unique: false,
  },
  for: {
    type: String,
    required: true,
    unique: false,
  },
  year: {
    type: Number,
    required: true,
    unique: false,
  },
  description: String,
  perfum_notes: {
    type: Object,
  },
});

const perfumeModel = mongoose.model("perfume", perfumeSchema);

export default perfumeModel;
