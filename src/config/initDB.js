import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import { DB_PATH } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------------------------------------------------------
   CONFIG
------------------------------------------------------------------ */

const ADS_PER_CITY = 10;
const SEED_USER_PASSWORD = "B@ckinDerry!1a";
const SEED_USER_ID = 1;

/* ------------------------------------------------------------------
   DEV SAFETY (OPTIONAL BUT RECOMMENDED)
------------------------------------------------------------------ */

// Uncomment when ready
// if (process.env.NODE_ENV === "production") {
//   throw new Error("❌ initDB.js must never run in production");
// }

/* ------------------------------------------------------------------
   RESET DATABASE
------------------------------------------------------------------ */

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("🗑️  Deleted old database");
}

const db = new Database(DB_PATH);
db.pragma("foreign_keys = ON");
console.log("🆕 Created new database");

/* ------------------------------------------------------------------
   APPLY SCHEMA
------------------------------------------------------------------ */

const schemaPath = path.join(__dirname, "schema.sql");
db.exec(fs.readFileSync(schemaPath, "utf8"));
console.log("📐 Schema applied");

/* ------------------------------------------------------------------
   SEED CORE DATA
------------------------------------------------------------------ */

const passwordHash = bcrypt.hashSync(SEED_USER_PASSWORD, 10);

db.transaction(() => {
  /* ---------------- COUNTRIES ---------------- */

  const insertCountry = db.prepare(
    `INSERT INTO countries (id, name, slug) VALUES (?, ?, ?)`
  );

  insertCountry.run(1, "Ireland", "ie");
  insertCountry.run(2, "United Kingdom", "uk");
  insertCountry.run(3, "Canada", "ca");
  insertCountry.run(4, "United States", "us");

  /* ---------------- USER ---------------- */

  db.prepare(
    `INSERT INTO users (id, username, email, password)
     VALUES (?, ?, ?, ?)`
  ).run(
    SEED_USER_ID,
    "irishgeoff",
    "irishgeoff@yahoo.com",
    passwordHash
  );

  /* ---------------- LOCATIONS (UK) ---------------- */

  const insertLocation = db.prepare(
    `INSERT INTO locations (id, name, slug, country_id)
     VALUES (?, ?, ?, ?)`
  );

  [
    ["Manchester", "manchester"],
    ["London", "london"],
    ["Birmingham", "birmingham"],
    ["Liverpool", "liverpool"],
    ["Leeds", "leeds"],
    ["Glasgow", "glasgow"],
    ["Edinburgh", "edinburgh"],
    ["Cardiff", "cardiff"],
    ["Bristol", "bristol"],
    ["Sheffield", "sheffield"]
  ].forEach(([name, slug], index) => {
    insertLocation.run(index + 1, name, slug, 2);
  });

  /* ---------------- CATEGORIES ---------------- */

  const insertCategory = db.prepare(
    `INSERT INTO categories (id, name, slug)
     VALUES (?, ?, ?)`
  );

  insertCategory.run(
    1,
    "Long Term Relationships",
    "long-term-relationships"
  );
  insertCategory.run(
    2,
    "Short Term Relationships",
    "short-term-relationships"
  );
  insertCategory.run(
    3,
    "Personal Services",
    "personal-services"
  );

  /* ---------------- SUBCATEGORIES ---------------- */

  const insertSubcategory = db.prepare(
    `INSERT INTO subcategories (id, category_id, name, slug)
     VALUES (?, ?, ?, ?)`
  );

  const subcategories = [
    [1, 1, "Women Seeking Men", "women-seeking-men"],
    [2, 1, "Men Seeking Women", "men-seeking-women"],
    [3, 1, "Men Seeking Men", "men-seeking-men"],
    [4, 1, "Women Seeking Women", "women-seeking-women"],

    [5, 2, "Women Seeking Men", "women-seeking-men"],
    [6, 2, "Men Seeking Women", "men-seeking-women"],
    [7, 2, "Men Seeking Men", "men-seeking-men"],
    [8, 2, "Women Seeking Women", "women-seeking-women"],
    [9, 2, "Couples Seeking Women", "couples-seeking-women"],
    [10, 2, "Couples Seeking Men", "couples-seeking-men"],
    [11, 2, "Couples Seeking Couples", "couples-seeking-couples"],

    [12, 3, "Escorts", "escorts"],
    [13, 3, "Massage", "massage"]
  ];

  subcategories.forEach(sc => insertSubcategory.run(...sc));
})();

console.log("🌱 Core data seeded");

/* ------------------------------------------------------------------
   GENERATE ADS
------------------------------------------------------------------ */

const locations = db.prepare(
  `SELECT id, name FROM locations`
).all();

const subcategories = db.prepare(
  `SELECT id, name, category_id FROM subcategories`
).all();

const insertAd = db.prepare(`
  INSERT INTO ads
  (user_id, title, description, category_id, subcategory_id, location_id)
  VALUES (?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const sub of subcategories) {
    for (const loc of locations) {
      for (let i = 1; i <= ADS_PER_CITY; i++) {
        insertAd.run(
          SEED_USER_ID,
          `${loc.name} — Listing ${i} (${sub.name})`,
          `General listing based in ${loc.name}.`,
          sub.category_id,
          sub.id,
          loc.id
        );
      }
    }
  }
})();

console.log("📣 Ads generated");

/* ------------------------------------------------------------------
   DONE
------------------------------------------------------------------ */

db.close();
console.log("🚀 Database fully initialized");
