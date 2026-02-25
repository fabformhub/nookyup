import express from "express";
import { listSubcategories } from "../controllers/subcategoriesController.js";

const router = express.Router();

// /uk/manchester/casual-encounters/12
router.get("/:countrySlug/:locationSlug/:categorySlug/:categoryId", listSubcategories);

export default router;

