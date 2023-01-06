import express from "express";
import {
  allPhilogram,
  createComment,
  deleteComment,
  getPostById,
  imgUploadGram,
  postThread,
  videoUpload,
} from "../controller/philoGramController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/all", allPhilogram);
router.get("/:id", getPostById);

router.delete("/:id/comment", deleteComment);

router.post("/uploadImageGram", upload.array("image"), jwtAuth, imgUploadGram);
router.post("/uploadvideo", upload.single("video"), jwtAuth, videoUpload);
router.post("/uploadPost", jwtAuth, postThread);
router.post("/createComment", jwtAuth, createComment);

// delete comments, posts (with comments and also when a user is deleted also his comments and post)

export default router;
