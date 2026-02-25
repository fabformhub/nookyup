// src/controllers/locationsController.js
import db from "../config/db.js";

export const listLocations = (req, res) => {
  const { countrySlug } = req.params;

  // 1. Lookup country by slug
  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // 2. Lookup locations by country_id
  const locations = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE country_id = ?
    ORDER BY name ASC
  `).all(country.id);

  // 3. Render
  res.render("locations", { country, locations });
};

