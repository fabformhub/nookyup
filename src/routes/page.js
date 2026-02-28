import express from "express";
import {
  about,
  contact,
} from "../controllers/browseController.js";

const router = express.Router();

// Static pages
router.get("/about", about);
router.get("/contact", contact);

export default router;
