import db from "../config/db.js";

// ------------------------------
// Countries
// ------------------------------
export function getCountries(req, res) {
  const rows = db.prepare(`
    SELECT id, name, slug
    FROM countries
    ORDER BY name
  `).all();

  res.json(rows);
}

// ------------------------------
// Locations by country
// ------------------------------
export function getLocations(req, res) {
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

// ------------------------------
// Categories
// ------------------------------
export function getCategories(req, res) {
  const rows = db.prepare(`
    SELECT id, name, slug
    FROM categories
    ORDER BY name
  `).all();

  res.json(rows);
}

// ------------------------------
// Subcategories by category
// ------------------------------
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

// ------------------------------
// Get a single ad (for editing)
// ------------------------------
export function getAd(req, res) {
  const { id } = req.params;

  const ad = db.prepare(`
    SELECT a.*,
           l.country_id,
           c.slug AS country_slug
    FROM ads a
    JOIN locations l ON a.location_id = l.id
    JOIN countries c ON l.country_id = c.id
    WHERE a.id = ?
  `).get(id);

  if (!ad) {
    return res.status(404).json({ error: "Ad not found" });
  }

  res.json(ad);
}

// ------------------------------
// Create ad (API version)
// ------------------------------
export function createAd(req, res) {
  const userId = req.session.userId;   // FIXED

  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { title, description, category_id, subcategory_id, location_id } = req.body;

  if (!title || !description || !category_id || !subcategory_id || !location_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const stmt = db.prepare(`
    INSERT INTO ads (user_id, title, description, category_id, subcategory_id, location_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    userId,
    title.trim(),
    description.trim(),
    category_id,
    subcategory_id,
    location_id
  );

  res.json({ success: true, id: result.lastInsertRowid });
}

// ------------------------------
// Update ad (API version)
// ------------------------------
export function updateAd(req, res) {
  const userId = req.session.userId;   // FIXED

  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { id } = req.params;
  const { title, description, category_id, subcategory_id, location_id } = req.body;

  if (!title || !description || !category_id || !subcategory_id || !location_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Optional: ensure user owns the ad
  const ad = db.prepare(`SELECT user_id FROM ads WHERE id = ?`).get(id);
  if (!ad) return res.status(404).json({ error: "Ad not found" });
  if (ad.user_id !== userId) return res.status(403).json({ error: "Forbidden" });

  db.prepare(`
    UPDATE ads
    SET title = ?, description = ?, category_id = ?, subcategory_id = ?, location_id = ?
    WHERE id = ?
  `).run(
    title.trim(),
    description.trim(),
    category_id,
    subcategory_id,
    location_id,
    id
  );

  res.json({ success: true });
}

