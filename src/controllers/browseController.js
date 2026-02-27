import db from "../config/db.js";

export const about = (req, res) => {
  res.render("about", { title: "About" });
};

export const contact = (req, res) => {
  res.render("contact", { title: "Contact" });
};

export const listCountries = (req, res) => {
  try {
    const countries = db.prepare(`
      SELECT id, name, slug
      FROM countries
      ORDER BY name ASC
    `).all();

    res.render("countries", { countries });

  } catch (err) {
    console.error("Countries  controller error:", err);
    res.status(500).send("Server error");
  }
};


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


export const listAds = (req, res) => {
  const {
    countrySlug,
    locationSlug,
    categorySlug,
    categoryId,
    subcategorySlug,
    subcategoryId
  } = req.params;

  const categoryIdNum = Number(categoryId);
  const subcategoryIdNum = Number(subcategoryId);

  if (!Number.isInteger(categoryIdNum) || !Number.isInteger(subcategoryIdNum)) {
    return res.status(400).send("Invalid category or subcategory ID");
  }

  // --- Country ---
  const country = db.prepare(
    `SELECT id, name, slug
     FROM countries
     WHERE slug = ?`
  ).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // --- Location ---
  const location = db.prepare(
    `SELECT id, name, slug, country_id
     FROM locations
     WHERE slug = ? AND country_id = ?`
  ).get(locationSlug, country.id);

  if (!location) {
    return res.status(404).send("Location not found in this country");
  }

  // --- Category + Subcategory relationship ---
  const categoryMatch = db.prepare(
    `SELECT 
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug,
        s.id AS subcategory_id, s.name AS subcategory_name, s.slug AS subcategory_slug
     FROM categories c
     JOIN subcategories s ON s.category_id = c.id
     WHERE c.id = ? AND c.slug = ?
       AND s.id = ? AND s.slug = ?`
  ).get(categoryIdNum, categorySlug, subcategoryIdNum, subcategorySlug);

  if (!categoryMatch) {
    return res.status(404).send("Category or subcategory not found / mismatched");
  }

  const category = {
    id: categoryMatch.category_id,
    name: categoryMatch.category_name,
    slug: categoryMatch.category_slug
  };

  const subcategory = {
    id: categoryMatch.subcategory_id,
    name: categoryMatch.subcategory_name,
    slug: categoryMatch.subcategory_slug
  };

  // --- Ads ---
  const ads = db.prepare(
    `SELECT a.id, a.title, a.description, a.created_at
     FROM ads a
     JOIN locations l ON a.location_id = l.id
     JOIN countries c ON l.country_id = c.id
     WHERE a.category_id = ?
       AND a.subcategory_id = ?
       AND l.id = ?
       AND c.id = ?
     ORDER BY a.created_at DESC`
  ).all(category.id, subcategory.id, location.id, country.id);

  // --- Render ---
  res.render("ads", {
    country,
    location,
    category,
    subcategory,
    ads
  });
};

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

  const categoryIdNum = Number(categoryId);
  const subcategoryIdNum = Number(subcategoryId);
  const adIdNum = Number(adId);

  if (!Number.isInteger(categoryIdNum) ||
      !Number.isInteger(subcategoryIdNum) ||
      !Number.isInteger(adIdNum)) {
    return res.status(400).send("Invalid ID");
  }

  // --- Country ---
  const country = db.prepare(
    `SELECT id, name, slug
     FROM countries
     WHERE slug = ?`
  ).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  // --- Location ---
  const location = db.prepare(
    `SELECT id, name, slug
     FROM locations
     WHERE slug = ? AND country_id = ?`
  ).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  // --- Category + Subcategory relationship ---
  const categoryMatch = db.prepare(
    `SELECT 
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug,
        s.id AS subcategory_id, s.name AS subcategory_name, s.slug AS subcategory_slug
     FROM categories c
     JOIN subcategories s ON s.category_id = c.id
     WHERE c.id = ? AND c.slug = ?
       AND s.id = ? AND s.slug = ?`
  ).get(categoryIdNum, categorySlug, subcategoryIdNum, subcategorySlug);

  if (!categoryMatch) {
    return res.status(404).send("Category or subcategory not found / mismatched");
  }

  const category = {
    id: categoryMatch.category_id,
    name: categoryMatch.category_name,
    slug: categoryMatch.category_slug
  };

  const subcategory = {
    id: categoryMatch.subcategory_id,
    name: categoryMatch.subcategory_name,
    slug: categoryMatch.subcategory_slug
  };

  // --- Ad ---
  const ad = db.prepare(
    `SELECT id, title, description, created_at
     FROM ads
     WHERE id = ?
       AND category_id = ?
       AND subcategory_id = ?
       AND location_id = ?`
  ).get(adIdNum, category.id, subcategory.id, location.id);

  if (!ad) return res.status(404).send("Ad not found");

  // --- Render ---
  res.render("single-ad", {
    country,
    location,
    category,
    subcategory,
    ad
  });
};

