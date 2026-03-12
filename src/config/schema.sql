-- DROP TABLES IN CORRECT DEPENDENCY ORDER
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS countries;

-- USERS
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- COUNTRIES
CREATE TABLE countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- LOCATIONS
CREATE TABLE locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country_id INTEGER NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

-- CATEGORIES
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- SUBCATEGORIES
CREATE TABLE subcategories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  UNIQUE (category_id, slug)
);

-- ADS
CREATE TABLE ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  subcategory_id INTEGER NOT NULL,
  location_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- MESSAGES
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  ad_id INTEGER,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id),
  FOREIGN KEY (ad_id) REFERENCES ads(id)
);

-- INDEXES
CREATE INDEX idx_locations_country ON locations(country_id);
CREATE INDEX idx_subcategories_category ON subcategories(category_id);
CREATE INDEX idx_ads_category ON ads(category_id);
CREATE INDEX idx_ads_subcategory ON ads(subcategory_id);
CREATE INDEX idx_ads_location ON ads(location_id);
CREATE INDEX idx_ads_user ON ads(user_id);

