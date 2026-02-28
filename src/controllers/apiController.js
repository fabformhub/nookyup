import db from "../config/db.js";

// Get all countries
export function getCountries(req, res) {
  const rows = db.prepare(`
    SELECT id, name, slug
    FROM countries
    ORDER BY name
  `).all();

  res.json(rows);
}

// Get all cities (locations) for a given country
export function getCities(req, res) {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ error: "country is required" });
  }

  const rows = db.prepare(`
    SELECT l.id, l.name, l.slug
    FROM locations l
    JOIN countries c ON l.country_id = c.id
    WHERE c.slug = ?
    ORDER BY l.name
  `).all(country);

  res.json(rows);
}

// Get all categories
export function getCategories(req, res) {
  const rows = db.prepare(`
    SELECT id, name, slug
    FROM categories
    ORDER BY name
  `).all();

  res.json(rows);
}

// Get all subcategories for a given category
export function getSubcategories(req, res) {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: "category is required" });
  }

  const rows = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE category_id = ?
    ORDER BY name
  `).all(category);

  res.json(rows);
}

// Add a new ad
export function addAd(req, res) {
  const { user_id, title, description, category_id, subcategory_id, location_id } = req.body;

  if (!user_id || !title || !description || !category_id || !subcategory_id || !location_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const stmt = db.prepare(`
    INSERT INTO ads (user_id, title, description, category_id, subcategory_id, location_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(user_id, title, description, category_id, subcategory_id, location_id);

  res.json({ success: true, ad_id: info.lastInsertRowid });
}
