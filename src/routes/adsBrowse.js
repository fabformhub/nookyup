import express from "express";
import { browse } from "../controllers/adsBrowseController.js";

const router = express.Router();

// Country + city + category + ID + subcategory + subcategory ID
router.get("/:countrySlug/:citySlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId", browse);

// City + category + ID + subcategory + subcategory ID
router.get("/:citySlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId", browse);

// Country + city + category + ID
router.get("/:countrySlug/:citySlug/:categorySlug/:categoryId", browse);

// City + category + ID
router.get("/:citySlug/:categorySlug/:categoryId", browse);

// Country + city
router.get("/:countrySlug/:citySlug", browse);

// City only
router.get("/:citySlug", browse);

export default router;

