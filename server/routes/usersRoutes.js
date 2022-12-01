import express from "express";
import { imageUpload, signup } from "../controller/usersController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/uploadimage", upload.single("image"), imageUpload);
router.post("/signup", signup);

export default router;
