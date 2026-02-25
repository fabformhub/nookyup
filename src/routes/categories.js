import express from "express";
import { listCategories } from "../controllers/categoriesController.js";

const router = express.Router();

// /uk/manchester/categories
router.get("/:countrySlug/:locationSlug/categories", listCategories);

export default router;

