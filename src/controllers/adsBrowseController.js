// src/controllers/adsBrowseController.js
import db from "../config/db.js";

// Helper to build canonical URLs
function buildUrl(parts) {
  return "/" + parts.filter(Boolean).join("/");
}

export const browse = (req, res) => {
  const {
    countrySlug,
    citySlug,
    categorySlug,
    categoryId,
    subcategorySlug,
    subcategoryId
  } = req.params;

  //
  // 1. CITY LOOKUP (required)
  //
  const city = db.prepare(`
    SELECT id, name, slug, country_slug
    FROM locations
    WHERE slug = ?
  `).get(citySlug);

  if (!city) return res.status(404).send("City not found");

  //
  // 2. CATEGORY LOOKUP (optional)
  //
  let category = null;

  if (categoryId) {
    category = db.prepare(`
      SELECT id, name, slug
      FROM categories
      WHERE id = ?
    `).get(categoryId);

    if (!category) return res.status(404).send("Category not found");

    // Canonical redirect if slug mismatch
    if (category.slug !== categorySlug) {
      return res.redirect(
        301,
        buildUrl([
          countrySlug,
          citySlug,
          category.slug,
          category.id
        ])
      );
    }
  }

  //
  // 3. SUBCATEGORY LOOKUP (optional)
  //
  let subcategory = null;

  if (subcategoryId) {
    subcategory = db.prepare(`
      SELECT id, name, slug
      FROM subcategories
      WHERE id = ?
    `).get(subcategoryId);

    if (!subcategory) return res.status(404).send("Subcategory not found");

    // Canonical redirect if slug mismatch
    if (subcategory.slug !== subcategorySlug) {
      return res.redirect(
        301,
        buildUrl([
          countrySlug,
          citySlug,
          category.slug,
          category.id,
          subcategory.slug,
          subcategory.id
        ])
      );
    }
  }

  //
  // 4. BUILD DYNAMIC SQL FILTERS
  //
  const filters = ["ads.location_slug = ?"];
  const params = [citySlug];

  if (category) {
    filters.push("ads.category_id = ?");
    params.push(category.id);
  }

  if (subcategory) {
    filters.push("ads.subcategory_id = ?");
    params.push(subcategory.id);
  }

  const sql = `
    SELECT ads.*
    FROM ads
    WHERE ${filters.join(" AND ")}
    ORDER BY ads.created_at DESC
    LIMIT 100
  `;

  const ads = db.prepare(sql).all(...params);

  //
  // 5. RENDER PAGE
  //
  res.render("browse", {
    city,
    category,
    subcategory,
    ads
  });
};
