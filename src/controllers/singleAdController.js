// src/controllers/singleAdController.js
import db from "../config/db.js";

export const viewAd = (req, res) => {
  const {
    countrySlug,
    locationSlug,
    categorySlug,
    categoryId,
    subcategorySlug,
    subcategoryId,
    adId
  } = req.params;

  // 1. Country
  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // 2. Location
  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  // 3. Category
  const category = db.prepare(`
    SELECT id, name, slug
    FROM categories
    WHERE id = ? AND slug = ?
  `).get(categoryId, categorySlug);

  if (!category) return res.status(404).send("Category not found");

  // 4. Subcategory
  const subcategory = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE id = ? AND slug = ? AND category_id = ?
  `).get(subcategoryId, subcategorySlug, category.id);

  if (!subcategory) return res.status(404).send("Subcategory not found");

  // 5. Ad
  const ad = db.prepare(`
    SELECT id, title, description, created_at
    FROM ads
    WHERE id = ? AND subcategory_id = ?
  `).get(adId, subcategory.id);

  if (!ad) return res.status(404).send("Ad not found");

  // 6. Render
  res.render("single-ad", {
    country,
    location,
    category,
    subcategory,
    ad
  });
};

