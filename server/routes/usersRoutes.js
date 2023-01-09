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
import { body } from "express-validator";

const router = express.Router();

const validationReg = [
  body("userName").not().isEmpty().withMessage("Username is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Invalid password"),
];

router.post("/uploadimage", upload.single("image"), imageUpload);
router.post("/signup", validationReg, signup);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.delete("/deleteacc", deleteUsersProfile);
router.put("/deletepic", deleteAvatarPic);
router.put("/updateusername", jwtAuth, updateUserName);
// can i use also 2 middlewares like upload and jwt ? YES
router.put(
  "/updateavatarpic",
  jwtAuth,
  upload.single("image"),
  updateAvatarPic
);

export default router;
