// routes/ads.js
import express from "express";
import { showCreateAdForm, showEditAdForm } from "../controllers/adsController.js";

const router = express.Router();

// Show create ad form
router.get("/ads/new", showCreateAdForm);
router.get("/ads/:id/edit", showEditAdForm);


export default router;
