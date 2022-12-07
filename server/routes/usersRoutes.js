import express from "express";
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

export default router;
