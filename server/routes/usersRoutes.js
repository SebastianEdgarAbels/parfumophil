import express from "express";
import {
  deleteAvatarPic,
  deleteUsersProfile,
  updateAvatarPic,
  updateUserName,
} from "../controller/crudController.js";

import {
  getProfile,
  imageUpload,
  login,
  signup,
} from "../controller/usersController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", upload.single("image"), imageUpload);
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.delete("/deleteacc", deleteUsersProfile);
router.put("/deletepic", deleteAvatarPic);
router.put("/updateusername", jwtAuth, updateUserName);
router.put("/updateavatarpic", jwtAuth, updateAvatarPic);

export default router;
