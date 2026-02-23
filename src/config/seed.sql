-- ============================================================
-- FULL UNIFIED SEED FILE
-- ============================================================

-- Drop existing tables
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS users;

------------------------------------------------------------
-- Users
------------------------------------------------------------
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

------------------------------------------------------------
-- Countries
------------------------------------------------------------
CREATE TABLE countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

------------------------------------------------------------
-- Locations
------------------------------------------------------------
CREATE TABLE locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  country_id INTEGER NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);

------------------------------------------------------------
-- Categories
------------------------------------------------------------
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

------------------------------------------------------------
-- Subcategories
------------------------------------------------------------
CREATE TABLE subcategories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

------------------------------------------------------------
-- Ads
------------------------------------------------------------
CREATE TABLE ads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  subcategory_id INTEGER,
  location_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

------------------------------------------------------------
-- Messages
------------------------------------------------------------
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

-- ============================================================
-- SEED DATA
-- ============================================================

------------------------------------------------------------
-- Countries
------------------------------------------------------------
INSERT INTO countries (name, slug) VALUES
('United Kingdom', 'uk'),
('Ireland', 'ie'),
('United States', 'us'),
('Canada', 'ca');

------------------------------------------------------------
-- Locations (UK)
------------------------------------------------------------
INSERT INTO locations (name, slug, country_id) VALUES
('Manchester', 'manchester', 1),
('London', 'london', 1),
('Birmingham', 'birmingham', 1),
('Liverpool', 'liverpool', 1),
('Leeds', 'leeds', 1),
('Glasgow', 'glasgow', 1),
('Edinburgh', 'edinburgh', 1),
('Cardiff', 'cardiff', 1),
('Bristol', 'bristol', 1),
('Sheffield', 'sheffield', 1);

------------------------------------------------------------
-- Categories
------------------------------------------------------------
INSERT INTO categories (name, slug) VALUES
('Men Seeking Women', 'men-seeking-women'),
('Men Seeking Men', 'men-seeking-men'),
('Women Seeking Men', 'women-seeking-men'),
('Women Seeking Women', 'women-seeking-women'),
('Casual Encounters', 'casual-encounters'),
('Serious Relationships', 'serious-relationships'),
('Friends & Chat', 'friends-chat'),
('Kinks & Fetish', 'kinks-fetish'),
('Swingers & Couples', 'swingers-couples'),
('Discreet & NSA', 'discreet-nsa');

------------------------------------------------------------
-- Subcategories
------------------------------------------------------------
INSERT INTO subcategories (category_id, name, slug) VALUES
(1, 'Dating', 'dating'),
(1, 'Casual Fun', 'casual-fun'),
(1, 'Long Term', 'long-term'),

(2, 'Casual', 'casual'),
(2, 'Bears', 'bears'),
(2, 'Twinks', 'twinks'),

(3, 'Dating', 'dating'),
(3, 'Casual Fun', 'casual-fun'),
(3, 'Long Term', 'long-term'),

(4, 'Romantic', 'romantic'),
(4, 'Casual', 'casual'),
(4, 'Friendship', 'friendship'),

(5, 'One Night', 'one-night'),
(5, 'Friends With Benefits', 'friends-with-benefits'),

(6, 'Marriage Minded', 'marriage-minded'),
(6, 'Long Term', 'long-term'),

(7, 'Online Chat', 'online-chat'),
(7, 'Penpals', 'penpals'),

(8, 'BDSM', 'bdsm'),
(8, 'Roleplay', 'roleplay'),

(9, 'Couples', 'couples'),
(9, 'Group Fun', 'group-fun'),

(10, 'No Strings', 'no-strings'),
(10, 'Discreet Meets', 'discreet-meets');

------------------------------------------------------------
-- User: irishgeoff
------------------------------------------------------------
INSERT INTO users (username, email, password_hash) VALUES
('irishgeoff', 'irishgeoff@yahoo.com', '{{PASSWORD_HASH}}');

------------------------------------------------------------
-- Sample UK Ads (expanded)
------------------------------------------------------------
INSERT INTO ads (user_id, title, description, category_id, subcategory_id, location_id) VALUES
(1, 'Manchester — Looking for genuine connection', 'Easygoing, friendly, and open to meeting someone real. Coffee first, see where it goes.', 1, 1, 1),
(1, 'London — Casual meetups', 'No pressure, just good vibes. Discreet and respectful.', 5, 11, 2),
(1, 'Liverpool — Up for chats and drinks', 'Let’s grab a drink and see if we click.', 7, 13, 4),
(1, 'Leeds — Discreet meets only', 'Prefer privacy and maturity. No drama.', 10, 20, 5),
(1, 'Birmingham — Long term vibes', 'Looking for something meaningful and lasting.', 6, 16, 3),
(1, 'Glasgow — Friendly guy looking to meet', 'Open-minded and easygoing. Let’s chat.', 1, 2, 6),
(1, 'Edinburgh — Coffee and conversation', 'Love deep chats and good company.', 3, 7, 7),
(1, 'Cardiff — No strings fun', 'Just keeping things simple and fun.', 5, 11, 8),
(1, 'Bristol — Looking for friendship first', 'Let’s build something real.', 7, 13, 9),
(1, 'Sheffield — Open to new connections', 'Seeing who’s out there.', 1, 1, 10);

------------------------------------------------------------
-- Sample Messages
------------------------------------------------------------
INSERT INTO messages (sender_id, receiver_id, ad_id, content) VALUES
(1, 1, 1, 'Testing message system — looks good!'),
(1, 1, 2, 'Another test message for ad 2.');

