// controllers/adsController.js
import db from "../config/db.js";

export function showCreateAdForm(req, res) {
  // Render the create-ad page with CSRF token
  res.render("create-ad", { csrfToken: req.csrfToken() });
}

export function addAd(req, res) {
  const { title, description, category_id, subcategory_id, location_id } = req.body;
  const user_id = req.session.userId; // logged-in user

  if (!user_id) {
    req.flash("error", "You must be logged in to post an ad");
    return res.redirect("/auth/login");
  }

  if (!title || !description || !category_id || !subcategory_id || !location_id) {
    req.flash("error", "All fields are required");
    return res.redirect("/ads/create");
  }

  const stmt = db.prepare(`
    INSERT INTO ads (user_id, title, description, category_id, subcategory_id, location_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run(user_id, title, description, category_id, subcategory_id, location_id);

  req.flash("success", "Ad posted successfully!");
  res.redirect("/dashboard");
}
