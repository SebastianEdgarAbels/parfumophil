import express from "express";
import { philogram } from "../controller/philoGramController.js";
// import jwtAuth from "../middlewares/jwtAuth.js";
// import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/all", philogram);
router.post("/");

export default router;
