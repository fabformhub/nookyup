import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import { DB_PATH } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate hashed password for seed user
const passwordHash = bcrypt.hashSync("B@ckinDerry!1a", 10);

// SQL file paths
const schemaPath = path.join(__dirname, "schema.sql");
const seedCountriesPath = path.join(__dirname, "seed_countries.sql");
const seedLocationsPath = path.join(__dirname, "seed_locations.sql");
const seedCategoriesPath = path.join(__dirname, "seed_categories.sql");
const seedSubcategoriesPath = path.join(__dirname, "seed_subcategories.sql");
const seedUsersPath = path.join(__dirname, "seed_users.sql");

// Delete old DB
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("Deleted old nookyup.db");
}

// Create new DB
const fresh = new Database(DB_PATH);
console.log("Created new nookyup.db");

// Helper to run SQL files with optional replacements
function runSQL(filePath, replacements = {}) {
  let sql = fs.readFileSync(filePath, "utf8");

  // Replace placeholders like {{PASSWORD_HASH}}
  for (const [key, value] of Object.entries(replacements)) {
    sql = sql.replaceAll(`{{${key}}}`, value);
  }

  fresh.exec(sql);
  console.log(`Executed: ${path.basename(filePath)}`);
}

// Run schema + seeds
runSQL(schemaPath);
runSQL(seedCountriesPath);
runSQL(seedLocationsPath);
runSQL(seedCategoriesPath);
runSQL(seedSubcategoriesPath);

// Seed users with hashed password
runSQL(seedUsersPath, { PASSWORD_HASH: passwordHash });

console.log("Database initialized successfully.");
fresh.close();

