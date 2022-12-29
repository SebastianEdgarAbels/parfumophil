import express from "express";
import {
  allPhilogram,
  createComment,
  imgUploadGram,
  postThread,
  videoUpload,
} from "../controller/philoGramController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/all", allPhilogram);
router.post("/uploadImageGram", upload.array("image"), jwtAuth, imgUploadGram);
router.post("/uploadvideo", upload.single("video"), jwtAuth, videoUpload);
router.post("/uploadPost", jwtAuth, postThread);
router.post("/createComment", jwtAuth, createComment);

export default router;
