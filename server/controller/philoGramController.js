import postModel from "../models/usersModel.js";

// ################################# GET ALL PHILOGRAM ######################################### //
const philogram = (req, res) => {
  res.status(200).json({
    msg: "This is the mega philoGram",
  });
};

export { philogram };
