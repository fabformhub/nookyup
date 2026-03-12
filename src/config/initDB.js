// src/config/initDB.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
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
  /* ---------------- COUNTRIES (UK + IRELAND ONLY) ---------------- */

  const insertCountry = db.prepare(
    `INSERT INTO countries (id, name, slug) VALUES (?, ?, ?)`
  );

  insertCountry.run(1, "Ireland", "ie");
  insertCountry.run(2, "United Kingdom", "uk");

  /* ---------------- USER ---------------- */

  db.prepare(
    `INSERT INTO users (id, username, email, password)
     VALUES (?, ?, ?, ?)`
  ).run(SEED_USER_ID, "irishgeoff", "irishgeoff@yahoo.com", passwordHash);

  /* ---------------- LOCATIONS (UK + IRELAND CITIES) ---------------- */

  const insertLocation = db.prepare(
    `INSERT INTO locations (id, name, slug, country_id)
     VALUES (?, ?, ?, ?)`
  );

  const locationsData = [
    // England (country_id = 2)
    ["Bath", "bath", 2],
    ["Birmingham", "birmingham", 2],
    ["Bradford", "bradford", 2],
    ["Brighton & Hove", "brighton-and-hove", 2],
    ["Bristol", "bristol", 2],
    ["Cambridge", "cambridge", 2],
    ["Canterbury", "canterbury", 2],
    ["Carlisle", "carlisle", 2],
    ["Chelmsford", "chelmsford", 2],
    ["Chester", "chester", 2],
    ["Chichester", "chichester", 2],
    ["Colchester", "colchester", 2],
    ["Coventry", "coventry", 2],
    ["Derby", "derby", 2],
    ["Doncaster", "doncaster", 2],
    ["Durham", "durham", 2],
    ["Ely", "ely", 2],
    ["Exeter", "exeter", 2],
    ["Gloucester", "gloucester", 2],
    ["Hereford", "hereford", 2],
    ["Kingston-upon-Hull", "kingston-upon-hull", 2],
    ["Lancaster", "lancaster", 2],
    ["Leeds", "leeds", 2],
    ["Leicester", "leicester", 2],
    ["Lichfield", "lichfield", 2],
    ["Lincoln", "lincoln", 2],
    ["Liverpool", "liverpool", 2],
    ["London", "london", 2],
    ["Manchester", "manchester", 2],
    ["Milton Keynes", "milton-keynes", 2],
    ["Newcastle-upon-Tyne", "newcastle-upon-tyne", 2],
    ["Norwich", "norwich", 2],
    ["Nottingham", "nottingham", 2],
    ["Oxford", "oxford", 2],
    ["Peterborough", "peterborough", 2],
    ["Plymouth", "plymouth", 2],
    ["Portsmouth", "portsmouth", 2],
    ["Preston", "preston", 2],
    ["Ripon", "ripon", 2],
    ["Salford", "salford", 2],
    ["Salisbury", "salisbury", 2],
    ["Sheffield", "sheffield", 2],
    ["Southampton", "southampton", 2],
    ["Southend-on-Sea", "southend-on-sea", 2],
    ["St Albans", "st-albans", 2],
    ["Stoke-on-Trent", "stoke-on-trent", 2],
    ["Sunderland", "sunderland", 2],
    ["Truro", "truro", 2],
    ["Wakefield", "wakefield", 2],
    ["Wells", "wells", 2],
    ["Westminster", "westminster", 2],
    ["Winchester", "winchester", 2],
    ["Wolverhampton", "wolverhampton", 2],
    ["Worcester", "worcester", 2],
    ["York", "york", 2],

    // Northern Ireland (country_id = 2)
    ["Armagh", "armagh", 2],
    ["Bangor", "bangor-ni", 2],
    ["Belfast", "belfast", 2],
    ["Lisburn", "lisburn", 2],
    ["Londonderry", "londonderry", 2],
    ["Newry", "newry", 2],

    // Scotland (country_id = 2)
    ["Aberdeen", "aberdeen", 2],
    ["Dundee", "dundee", 2],
    ["Dunfermline", "dunfermline", 2],
    ["Edinburgh", "edinburgh", 2],
    ["Glasgow", "glasgow", 2],
    ["Inverness", "inverness", 2],
    ["Perth", "perth", 2],
    ["Stirling", "stirling", 2],

    // Wales (country_id = 2)
    ["Bangor (Wales)", "bangor-wales", 2],
    ["Cardiff", "cardiff", 2],
    ["Newport", "newport", 2],
    ["St Asaph", "st-asaph", 2],
    ["St Davids", "st-davids", 2],
    ["Swansea", "swansea", 2],
    ["Wrexham", "wrexham", 2],

    // Republic of Ireland (country_id = 1)
    ["Dublin", "dublin", 1],
    ["Cork", "cork", 1],
    ["Limerick", "limerick", 1],
    ["Galway", "galway", 1],
    ["Waterford", "waterford", 1]
  ];

  locationsData.forEach(([name, slug, countryId], index) => {
    insertLocation.run(index + 1, name, slug, countryId);
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

  const subcategoriesSeed = [
    // Long Term
    [1, 1, "Women Seeking Men", "women-seeking-men"],
    [2, 1, "Men Seeking Women", "men-seeking-women"],
    [3, 1, "Men Seeking Men", "men-seeking-men"],
    [4, 1, "Women Seeking Women", "women-seeking-women"],

    // Short Term (full 3×3 matrix)
    [5, 2, "Women Seeking Men", "women-seeking-men"],
    [6, 2, "Women Seeking Women", "women-seeking-women"],
    [7, 2, "Women Seeking Couples", "women-seeking-couples"],
    [8, 2, "Men Seeking Women", "men-seeking-women"],
    [9, 2, "Men Seeking Men", "men-seeking-men"],
    [10, 2, "Men Seeking Couples", "men-seeking-couples"],
    [11, 2, "Couples Seeking Women", "couples-seeking-women"],
    [12, 2, "Couples Seeking Men", "couples-seeking-men"],
    [13, 2, "Couples Seeking Couples", "couples-seeking-couples"],

    // Personal Services
    [14, 3, "Escorts", "escorts"],
    [15, 3, "Massage", "massage"]
  ];

  subcategoriesSeed.forEach(sc => insertSubcategory.run(...sc));
})();

console.log("🌱 Core data seeded");

/* ------------------------------------------------------------------
   HELPERS FOR FAKE, REALISTIC ADS
------------------------------------------------------------------ */

function buildLongTermTitle(locName, subName) {
  const tone = faker.helpers.arrayElement([
    "looking for something real",
    "hoping to meet someone genuine",
    "ready for a real connection",
    "done with games, want something honest"
  ]);
  return `${locName} • ${subName} ${tone}`;
}

function buildShortTermTitle(locName, subName) {
  const tone = faker.helpers.arrayElement([
    "up for fun, no pressure",
    "open to casual vibes",
    "looking for good chemistry",
    "seeing who’s out there tonight"
  ]);
  return `${locName} • ${subName} ${tone}`;
}

function buildServicesTitle(locName, subName) {
  const tone = faker.helpers.arrayElement([
    "discreet and professional",
    "friendly and reliable",
    "relaxing and respectful",
    "calm, private and comfortable"
  ]);
  return `${locName} • ${subName} — ${tone}`;
}

function buildLongTermDescription(locName, subName) {
  const traits = faker.helpers.arrayElements(
    [
      "kind",
      "honest",
      "down to earth",
      "easy-going",
      "loyal",
      "thoughtful",
      "open-minded",
      "warm",
      "funny",
      "grounded"
    ],
    3
  );
  const interests = faker.helpers.arrayElements(
    [
      "live music",
      "films",
      "good food",
      "coffee dates",
      "weekend trips",
      "long walks",
      "books",
      "podcasts",
      "nights in",
      "exploring new places"
    ],
    3
  );

  return (
    `Based in ${locName} and posting under "${subName}". ` +
    `Friends would probably say I'm ${traits.join(", ")}. ` +
    `I’m into ${interests.join(", ")} and I really value good conversation and mutual respect. ` +
    `Looking for something that feels real, with someone who knows what they want and isn’t into drama.`
  );
}

function buildShortTermDescription(locName, subName) {
  const traits = faker.helpers.arrayElements(
    [
      "chilled",
      "open-minded",
      "confident",
      "respectful",
      "playful",
      "easy-going",
      "spontaneous",
      "laid-back"
    ],
    2
  );
  const interests = faker.helpers.arrayElements(
    [
      "late-night chats",
      "good laughs",
      "music",
      "drinks in town",
      "trying new places",
      "last-minute plans",
      "nights out",
      "nights in"
    ],
    3
  );

  return (
    `In ${locName} and using "${subName}" because I’m more into short-term, no-pressure connections right now. ` +
    `I’d say I’m ${traits.join(", ")} and I enjoy ${interests.join(", ")}. ` +
    `I’m big on clear boundaries, mutual respect and good vibes only. ` +
    `If we click, great — if not, no hard feelings.`
  );
}

function buildServicesDescription(locName, subName) {
  const style = faker.helpers.arrayElement([
    "calm and relaxing",
    "friendly and welcoming",
    "quiet and discreet",
    "professional and respectful"
  ]);
  const extras = faker.helpers.arrayElements(
    [
      "clean, comfortable space",
      "flexible times where possible",
      "clear communication",
      "no pressure, no hassle",
      "adults only, respectful clients"
    ],
    2
  );

  return (
    `Offering "${subName}" services in ${locName}. The atmosphere is ${style}, ` +
    `and I always aim to make people feel at ease. ` +
    `I focus on ${extras.join(" and ")}. ` +
    `This is a fully legal, consensual service and this listing is part of platform testing, ` +
    `but written to feel like a genuine advert.`
  );
}

/* ------------------------------------------------------------------
   GENERATE ADS (EVERY LOCATION × CATEGORY × SUBCATEGORY)
------------------------------------------------------------------ */

const locations = db.prepare(
  `SELECT id, name FROM locations`
).all();

const subcategories = db.prepare(
  `SELECT id, name, category_id FROM subcategories`
).all();

const categoriesById = db
  .prepare(`SELECT id, name, slug FROM categories`)
  .all()
  .reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {});

const insertAd = db.prepare(`
  INSERT INTO ads
  (user_id, title, description, category_id, subcategory_id, location_id)
  VALUES (?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const sub of subcategories) {
    const cat = categoriesById[sub.category_id];

    for (const loc of locations) {
      for (let i = 0; i < ADS_PER_CITY; i++) {
        let title;
        let description;

        if (cat.slug === "long-term-relationships") {
          title = buildLongTermTitle(loc.name, sub.name);
          description = buildLongTermDescription(loc.name, sub.name);
        } else if (cat.slug === "short-term-relationships") {
          title = buildShortTermTitle(loc.name, sub.name);
          description = buildShortTermDescription(loc.name, sub.name);
        } else if (cat.slug === "personal-services") {
          title = buildServicesTitle(loc.name, sub.name);
          description = buildServicesDescription(loc.name, sub.name);
        } else {
          title = `${loc.name} • ${sub.name}`;
          description =
            `Listing in ${loc.name} under "${sub.name}". ` +
            `This is a seeded advert used to test search, filters and messaging.`;
        }

        insertAd.run(
          SEED_USER_ID,
          title,
          description,
          sub.category_id,
          sub.id,
          loc.id
        );
      }
    }
  }
})();

console.log("📣 Ads generated for every location × category × subcategory");

/* ------------------------------------------------------------------
   DONE
------------------------------------------------------------------ */

db.close();
console.log("🚀 Database fully initialized");

