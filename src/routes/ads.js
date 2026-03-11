// routes/ads.js
import express from "express";
import { 
  showCreateAdForm, 
  showEditAdForm,
  viewAd
} from "../controllers/adsController.js";

const router = express.Router();

// Create ad
router.get("/ads/new", showCreateAdForm);

// View ad 
router.get("/ads/:id", viewAd);

// Edit ad
router.get("/ads/:id/edit", showEditAdForm);

export default router;

