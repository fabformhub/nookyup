import express from "express";
import { listAds } from "../controllers/adsController.js";

const router = express.Router();

// /uk/manchester/casual/12/women-seeking-men/44
router.get(
  "/:countrySlug/:locationSlug/:categorySlug/:categoryId/:subcategorySlug/:subcategoryId",
  listAds
);

export default router;

