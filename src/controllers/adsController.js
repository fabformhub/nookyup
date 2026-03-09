// src/controllers/adsController.js

import db from "../config/db.js";

// ------------------------------------------------------------
// Dashboard — list ads for logged‑in user
// ------------------------------------------------------------
export const listAds = (req, res) => {
  try {
    const userId = req.session.userId;

    const ads = db.prepare(
      `SELECT a.*,
              c.name AS category_name,
              s.name AS subcategory_name,
              l.name AS location_name
       FROM ads a
       LEFT JOIN categories c ON a.category_id = c.id
       LEFT JOIN subcategories s ON a.subcategory_id = s.id
       LEFT JOIN locations l ON a.location_id = l.id
       WHERE a.user_id = ?
       ORDER BY a.created_at DESC`
    ).all(userId);

    const stats = {
      live: ads.filter(a => a.status === "active").length,
      drafts: ads.filter(a => a.status === "draft").length,
      pending: ads.filter(a => a.status === "pending").length,
    };

    res.render("dashboard/index", { ads, stats, title: "Dashboard" });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server error");
  }
};

// ------------------------------------------------------------
// Show create form (NO DATA FETCHING)
// ------------------------------------------------------------
export const showCreateAdForm = (req, res) => {
  try {
    res.render("create-ad", {
      csrfToken: req.csrfToken(),
      title: "Create Ad"
    });
  } catch (err) {
    console.error("Error loading create form:", err);
    res.status(500).send("Server error");
  }
};


// ------------------------------------------------------------
// View a single ad
// ------------------------------------------------------------
export const viewAd = (req, res) => {
  try {
    const adId = req.params.id;

    const ad = db.prepare(
      `SELECT a.*,
              c.name AS category_name,
              s.name AS subcategory_name,
              l.name AS location_name
       FROM ads a
       LEFT JOIN categories c ON a.category_id = c.id
       LEFT JOIN subcategories s ON a.subcategory_id = s.id
       LEFT JOIN locations l ON a.location_id = l.id
       WHERE a.id = ?`
    ).get(adId);

    if (!ad) return res.status(404).send("Ad not found");

    res.render("single-ad", { ad, title: ad.title });
  } catch (err) {
    console.error("Error viewing ad:", err);
    res.status(500).send("Server error");
  }
};

// ------------------------------------------------------------
// Edit form (ONLY PASS adId + csrfToken)
// ------------------------------------------------------------
export const showEditAdForm = (req, res) => {
  try {
    res.render("edit-ad", {
      adId: req.params.id,
      csrfToken: req.csrfToken(),
      title: "Edit Ad"
    });
  } catch (err) {
    console.error("Error loading edit form:", err);
    res.status(500).send("Server error");
  }
};

