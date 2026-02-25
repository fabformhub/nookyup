// src/controllers/subcategoriesController.js
import db from "../config/db.js";

export const listSubcategories = (req, res) => {
  const { countrySlug, locationSlug, categorySlug, categoryId } = req.params;

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

  // 3. Lookup category
  const category = db.prepare(`
    SELECT id, name, slug
    FROM categories
    WHERE id = ? AND slug = ?
  `).get(categoryId, categorySlug);

  if (!category) return res.status(404).send("Category not found");

  // 4. Fetch subcategories for this category
  const subcategories = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE category_id = ?
    ORDER BY name ASC
  `).all(category.id);

  // 5. Render
  res.render("subcategories", {
    country,
    location,
    category,
    subcategories
  });
};

