import express from "express";
import {
  getAllPerfumes,
  getPerfumesByDesigner,
} from "../controller/perfumesController.js";
// import perfumeModel from "../models/perfumesModel.js";

const router = express.Router();

router.get("/all", getAllPerfumes);
router.get("/all/:designer", getPerfumesByDesigner);

export default router;
