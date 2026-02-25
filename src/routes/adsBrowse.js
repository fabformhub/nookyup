// src/routes/adsBrowse.js
import express from "express";
import { browse } from "../controllers/adsBrowseController.js";

const router = express.Router();

router.get("/:countrySlug/:citySlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId", browse);
router.get("/:countrySlug/:citySlug/:categorySlug/:categoryId", browse);
router.get("/:countrySlug/:citySlug", browse);
router.get("/:countrySlug", browse);
router.get("/", browse);

export default router;
