// src/controllers/adsController.js
import db from "../config/db.js";

export const listAds = (req, res) => {
  const {
    countrySlug,
    locationSlug,
    categorySlug,
    categoryId,
    subcategorySlug,
    subcategoryId
  } = req.params;

  // Convert string IDs to numbers
  const categoryIdNum = Number(categoryId);
  const subcategoryIdNum = Number(subcategoryId);

  if (Number.isNaN(categoryIdNum) || Number.isNaN(subcategoryIdNum)) {
    return res.status(400).send("Invalid category or subcategory ID");
  }

  // 1. Get country
  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // 2. Get location within that country
  const location = db.prepare(`
    SELECT id, name, slug, country_id
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found in this country");

  // 3. Validate category + subcategory relationship
  const taxonomy = db.prepare(`
    SELECT c.id AS category_id, c.name AS category_name, c.slug AS category_slug,
           s.id AS subcategory_id, s.name AS subcategory_name, s.slug AS subcategory_slug
    FROM categories c
    JOIN subcategories s ON s.category_id = c.id
    WHERE c.id = ? AND c.slug = ?
      AND s.id = ? AND s.slug = ?
  `).get(categoryIdNum, categorySlug, subcategoryIdNum, subcategorySlug);

  if (!taxonomy) {
    return res.status(404).send("Category or subcategory not found / mismatched");
  }

  const category = {
    id: taxonomy.category_id,
    name: taxonomy.category_name,
    slug: taxonomy.category_slug
  };

  const subcategory = {
    id: taxonomy.subcategory_id,
    name: taxonomy.subcategory_name,
    slug: taxonomy.subcategory_slug
  };

  // 4. Fetch ads — only ads for this country, location, category, and subcategory
  const ads = db.prepare(`
    SELECT a.id, a.title, a.description, a.created_at
    FROM ads a
    JOIN locations l ON a.location_id = l.id
    JOIN countries c ON l.country_id = c.id
    WHERE a.category_id = ?
      AND a.subcategory_id = ?
      AND l.id = ?
      AND c.id = ?
    ORDER BY a.created_at DESC
  `).all(
    category.id,
    subcategory.id,
    location.id,
    country.id
  );

  // 5. Render view
  res.render("ads", {
    country,
    location,
    category,
    subcategory,
    ads
  });
};
