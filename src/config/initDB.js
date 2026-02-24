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

// Paths to schema + seed files
const schemaPath = path.join(__dirname, "schema.sql");
const seedPath = path.join(__dirname, "seed.sql");

// Delete old DB
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log("Deleted old nookyup.db");
}

// Create new DB
const fresh = new Database(DB_PATH);
console.log("Created new nookyup.db");

// Helper to run SQL with placeholder replacement
function runSQL(filePath, replacements = {}) {
  let sql = fs.readFileSync(filePath, "utf8");

  for (const [key, value] of Object.entries(replacements)) {
    sql = sql.replaceAll(`{{${key}}}`, value);
  }

  fresh.exec(sql);
  console.log(`Executed: ${path.basename(filePath)}`);
}

// Run schema first
runSQL(schemaPath);

// Then seed data
runSQL(seedPath, { PASSWORD_HASH: passwordHash });

console.log("Database initialized successfully.");
fresh.close();

