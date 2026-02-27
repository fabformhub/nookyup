import express from "express";
import { about,contact,listCountries,listLocations,listCategories,listSubcategories,listAds,viewAd } from "../controllers/browseController.js";

const router = express.Router();

router.get("/about", about);
router.get("/contact", contact);

// /countries
router.get("/", listCountries);

// /uk/locations
router.get("/:countrySlug/", listLocations);

// /uk/manchester/categories
router.get("/:countrySlug/:locationSlug/", listCategories);

// /uk/manchester/casual-encounters/12
router.get("/:countrySlug/:locationSlug/:categorySlug/:categoryId", listSubcategories);

// /uk/manchester/casual/12/women-seeking-men/44
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId",
  listAds
);

// /uk/manchester/casual/12/w4m/44/123
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId/:adId",
  viewAd
);

export default router;

