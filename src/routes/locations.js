import express from "express";
import { listLocations } from "../controllers/locationsController.js";

const router = express.Router();

// /uk/locations
router.get("/:countrySlug/locations", listLocations);

export default router;

