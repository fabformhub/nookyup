import db from "../config/db.js";

export const about = (req, res) => {
  res.render("about", { title: "About" });
};

export const contact = (req, res) => {
  res.render("contact", { title: "Contact" });
};

export const home = (req, res) => {
  try {
    const countries = db.prepare(`
      SELECT id, name, slug
      FROM countries
      ORDER BY name ASC
    `).all();

    res.render("home", { countries });

  } catch (err) {
    console.error("Home controller error:", err);
    res.status(500).send("Server error");
  }
};

