// routes/ads.js
import express from "express";
import { showCreateAdForm, addAd } from "../controllers/adsController.js";

const router = express.Router();

// Show create ad form
router.get("/ads/create", showCreateAdForm);

// Handle ad submission
router.post("/ads/create", addAd);

export default router;
