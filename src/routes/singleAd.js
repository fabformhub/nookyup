import express from "express";
import { viewAd } from "../controllers/singleAdController.js";

const router = express.Router();

// /uk/manchester/casual/12/w4m/44/123
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId/:adId",
  viewAd
);

export default router;

