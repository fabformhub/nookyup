import express from "express";
import {
  about,
  contact,
} from "../controllers/browseController.js";

const router = express.Router();

// Static pages
router.get("/about", about);
router.get("/contact", contact);

router.get('/ads/create', (req, res) => {
  res.render('create-ad'); 
});

export default router;
