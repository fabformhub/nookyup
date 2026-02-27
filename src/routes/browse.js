import express from "express";
import {
  about,
  contact,
  listCountries,
  listLocations,
  listCategories,
  listSubcategories,
  listAds,
  viewAd
} from "../controllers/browseController.js";

const router = express.Router();

// Static pages
router.get("/about", about);
router.get("/contact", contact);

// ---------------------------------------------
// MOST SPECIFIC → LEAST SPECIFIC (CRITICAL)
// ---------------------------------------------

// ✅ Single ad (ID + slug are SEPARATE segments)
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:subcategorySlug/:adId/:adSlug",
  (req, res, next) => {
    console.log("DEBUG ROUTE MATCH:", req.params);
    next();
  },
  viewAd
);

// Ads list
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:subcategorySlug",
  listAds
);

// Subcategories
router.get(
  "/:countrySlug/:locationSlug/:categorySlug",
  listSubcategories
);

// Categories
router.get(
  "/:countrySlug/:locationSlug",
  listCategories
);

// Locations
router.get(
  "/:countrySlug",
  listLocations
);

// Countries (root)
router.get("/", listCountries);

export default router;
