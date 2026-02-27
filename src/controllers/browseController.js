import db from "../config/db.js";

export const about = (req, res) => {
  res.render("about", { title: "About" });
};

export const contact = (req, res) => {
  res.render("contact", { title: "Contact" });
};

/* ---------------------------
   LIST COUNTRIES
---------------------------- */
export const listCountries = (req, res) => {
  try {
    const countries = db.prepare(`
      SELECT id, name, slug
      FROM countries
      ORDER BY name ASC
    `).all();

    res.render("countries", { countries });
  } catch (err) {
    console.error("Countries controller error:", err);
    res.status(500).send("Server error");
  }
};

/* ---------------------------
   LIST LOCATIONS
---------------------------- */
export const listLocations = (req, res) => {
  const { countrySlug } = req.params;

  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  const locations = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE country_id = ?
    ORDER BY name ASC
  `).all(country.id);

  res.render("locations", { country, locations });
};

/* ---------------------------
   LIST CATEGORIES
---------------------------- */
export const listCategories = (req, res) => {
  const { countrySlug, locationSlug } = req.params;

  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  const categories = db.prepare(`
    SELECT id, name, slug
    FROM categories
    ORDER BY name ASC
  `).all();

  res.render("categories", { country, location, categories });
};

/* ---------------------------
   LIST SUBCATEGORIES
---------------------------- */
export const listSubcategories = (req, res) => {
  const { countrySlug, locationSlug, categorySlug } = req.params;

  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  const category = db.prepare(`
    SELECT id, name, slug
    FROM categories
    WHERE slug = ?
  `).get(categorySlug);

  if (!category) return res.status(404).send("Category not found");

  const subcategories = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE category_id = ?
    ORDER BY name ASC
  `).all(category.id);

  res.render("subcategories", {
    country,
    location,
    category,
    subcategories
  });
};

/* ---------------------------
   LIST ADS
---------------------------- */
export const listAds = (req, res) => {
  const {
    countrySlug,
    locationSlug,
    categorySlug,
    subcategorySlug
  } = req.params;

  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  const category = db.prepare(`
    SELECT id, name, slug
    FROM categories
    WHERE slug = ?
  `).get(categorySlug);

  if (!category) return res.status(404).send("Category not found");

  const subcategory = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE slug = ? AND category_id = ?
  `).get(subcategorySlug, category.id);

  if (!subcategory) return res.status(404).send("Subcategory not found");

  const ads = db.prepare(`
    SELECT id, title, description, created_at
    FROM ads
    WHERE category_id = ?
      AND subcategory_id = ?
      AND location_id = ?
    ORDER BY created_at DESC
  `).all(category.id, subcategory.id, location.id);

  res.render("ads", {
    country,
    location,
    category,
    subcategory,
    ads
  });
};

/* ---------------------------
   VIEW SINGLE AD
---------------------------- */

/* ---------------------------
   VIEW SINGLE AD
---------------------------- */
export const viewAd = (req, res) => {
  const {
    countrySlug,
    locationSlug,
    categorySlug,
    subcategorySlug,
    adId,
    adSlug
  } = req.params;

  // ✅ adId is now guaranteed to be numeric
  const adIdNum = Number(adId);
  if (!Number.isInteger(adIdNum)) {
    return res.status(400).send("Invalid ad ID");
  }

  const country = db.prepare(`
    SELECT id, name, slug
    FROM countries
    WHERE slug = ?
  `).get(countrySlug);

  if (!country) return res.status(404).send("Country not found");

  const location = db.prepare(`
    SELECT id, name, slug
    FROM locations
    WHERE slug = ? AND country_id = ?
  `).get(locationSlug, country.id);

  if (!location) return res.status(404).send("Location not found");

  const category = db.prepare(`
    SELECT id, name, slug
    FROM categories
    WHERE slug = ?
  `).get(categorySlug);

  if (!category) return res.status(404).send("Category not found");

  const subcategory = db.prepare(`
    SELECT id, name, slug
    FROM subcategories
    WHERE slug = ? AND category_id = ?
  `).get(subcategorySlug, category.id);

  if (!subcategory) return res.status(404).send("Subcategory not found");

  const ad = db.prepare(`
    SELECT id, title, description, created_at
    FROM ads
    WHERE id = ?
      AND category_id = ?
      AND subcategory_id = ?
      AND location_id = ?
  `).get(adIdNum, category.id, subcategory.id, location.id);

  if (!ad) return res.status(404).send("Ad not found");

  res.render("single-ad", {
    country,
    location,
    category,
    subcategory,
    ad
  });
};
