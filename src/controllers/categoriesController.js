// src/controllers/categoriesController.js
import db from "../config/db.js";

export const listCategories = (req, res) => {
  const { countrySlug, locationSlug } = req.params;

  // 1. Lookup country
  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // 2. Lookup location
  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  // 3. Fetch categories
  const categories = db.prepare(`
    SELECT id, name, slug
    FROM categories
    ORDER BY name ASC
  `).all();

  // 4. Render
  res.render("categories", {
    country,
    location,
    categories
  });
};

