import express from "express";
import {
  getCountries,
  getLocations,
  getCategories,
  getSubcategories,
  getAd,
  createAd,
  updateAd
} from "../controllers/apiController.js";

const router = express.Router();

// Countries / Locations
router.get("/countries", getCountries);
router.get("/locations", getLocations);

// Categories / Subcategories
router.get("/categories", getCategories);
router.get("/subcategories", getSubcategories);

// Fetch single ad for edit form
router.get("/ad/:id", getAd);

// Create new ad
router.post("/ad", createAd);

// Update existing ad
router.put("/ad/:id", updateAd);

export default router;

