-- Countries
INSERT INTO countries (id, name, slug) VALUES
(1, 'Ireland','ie'),
(2, 'United Kingdom','uk'),
(3, 'Canada','ca'),
(4, 'United States','us');

-- Locations (UK)
INSERT INTO locations (id, name, slug, country_id) VALUES
(1,'Manchester','manchester',2),
(2,'London','london',2),
(3,'Birmingham','birmingham',2),
(4,'Liverpool','liverpool',2),
(5,'Leeds','leeds',2),
(6,'Glasgow','glasgow',2),
(7,'Edinburgh','edinburgh',2),
(8,'Cardiff','cardiff',2),
(9,'Bristol','bristol',2),
(10,'Sheffield','sheffield',2);

-- Categories (new taxonomy)
INSERT INTO categories (id, name, slug) VALUES
(1, 'Long Term Relationships', 'long-term-relationships'),
(2, 'Short Term Relationships', 'short-term-relationships'),
(3, 'Personal Services', 'personal-services');

-- Subcategories
INSERT INTO subcategories (id, category_id, name, slug) VALUES
-- Long Term Relationships (category_id = 1)
(1, 1, 'Women Seeking Men', 'women-seeking-men'),
(2, 1, 'Men Seeking Women', 'men-seeking-women'),
(3, 1, 'Men Seeking Men', 'men-seeking-men'),
(4, 1, 'Women Seeking Women', 'women-seeking-women'),

-- Short Term Relationships (category_id = 2)
(5, 2, 'Women Seeking Men', 'women-seeking-men'),
(6, 2, 'Men Seeking Women', 'men-seeking-women'),
(7, 2, 'Men Seeking Men', 'men-seeking-men'),
(8, 2, 'Women Seeking Women', 'women-seeking-women'),
(9, 2, 'Couples Seeking Women', 'couples-seeking-women'),
(10, 2, 'Couples Seeking Men', 'couples-seeking-men'),
(11, 2, 'Couples Seeking Couples', 'couples-seeking-couples'),

-- Personal Services (category_id = 3)
(12, 3, 'Escorts', 'escorts'),
(13, 3, 'Massage', 'massage');

-- Users
INSERT INTO users (id, username, email, password) VALUES
(1,'irishgeoff','irishgeoff@yahoo.com','{{PASSWORD_HASH}}');

-- Ads (100 total: 10 per location, friendly tone, location mentioned)
INSERT INTO ads (user_id, title, description, category_id, subcategory_id, location_id) VALUES
-- Manchester (location_id = 1)
(1,'Manchester — Women seeking men','Friendly Manchester local, women seeking men for long term in Manchester.',1,1,1),
(1,'Manchester — Men seeking women','Manchester man seeking women for long term connection in Manchester.',1,2,1),
(1,'Manchester — Men seeking men','Manchester resident, men seeking men for long term in Manchester.',1,3,1),
(1,'Manchester — Women seeking women','Women seeking women around Manchester for long term connection.',1,4,1),
(1,'Manchester — Short term, women seeking men','Open to short term women seeking men around Manchester.',2,5,1),
(1,'Manchester — Short term, men seeking women','Short term men seeking women in the Manchester area.',2,6,1),
(1,'Manchester — Short term, men seeking men','Short term men seeking men around Manchester.',2,7,1),
(1,'Manchester — Short term, women seeking women','Short term women seeking women in Manchester.',2,8,1),
(1,'Manchester — Couples seeking women','Couple in Manchester seeking women for short term connection.',2,9,1),
(1,'Manchester — Couples seeking couples','Couple in Manchester seeking other couples locally.',2,11,1),

-- London (location_id = 2)
(1,'London — Women seeking men','Friendly London local, women seeking men for long term in London.',1,1,2),
(1,'London — Men seeking women','London man seeking women for long term connection in London.',1,2,2),
(1,'London — Men seeking men','London resident, men seeking men for long term in London.',1,3,2),
(1,'London — Women seeking women','Women seeking women around London for long term connection.',1,4,2),
(1,'London — Short term, women seeking men','Open to short term women seeking men around London.',2,5,2),
(1,'London — Short term, men seeking women','Short term men seeking women in the London area.',2,6,2),
(1,'London — Short term, men seeking men','Short term men seeking men around London.',2,7,2),
(1,'London — Short term, women seeking women','Short term women seeking women in London.',2,8,2),
(1,'London — Couples seeking women','Couple in London seeking women for short term connection.',2,9,2),
(1,'London — Couples seeking couples','Couple in London seeking other couples locally.',2,11,2),

-- Birmingham (location_id = 3)
(1,'Birmingham — Women seeking men','Friendly Birmingham local, women seeking men for long term in Birmingham.',1,1,3),
(1,'Birmingham — Men seeking women','Birmingham man seeking women for long term connection in Birmingham.',1,2,3),
(1,'Birmingham — Men seeking men','Birmingham resident, men seeking men for long term in Birmingham.',1,3,3),
(1,'Birmingham — Women seeking women','Women seeking women around Birmingham for long term connection.',1,4,3),
(1,'Birmingham — Short term, women seeking men','Open to short term women seeking men around Birmingham.',2,5,3),
(1,'Birmingham — Short term, men seeking women','Short term men seeking women in the Birmingham area.',2,6,3),
(1,'Birmingham — Short term, men seeking men','Short term men seeking men around Birmingham.',2,7,3),
(1,'Birmingham — Short term, women seeking women','Short term women seeking women in Birmingham.',2,8,3),
(1,'Birmingham — Couples seeking women','Couple in Birmingham seeking women for short term connection.',2,9,3),
(1,'Birmingham — Couples seeking couples','Couple in Birmingham seeking other couples locally.',2,11,3),

-- Liverpool (location_id = 4)
(1,'Liverpool — Women seeking men','Friendly Liverpool local, women seeking men for long term in Liverpool.',1,1,4),
(1,'Liverpool — Men seeking women','Liverpool man seeking women for long term connection in Liverpool.',1,2,4),
(1,'Liverpool — Men seeking men','Liverpool resident, men seeking men for long term in Liverpool.',1,3,4),
(1,'Liverpool — Women seeking women','Women seeking women around Liverpool for long term connection.',1,4,4),
(1,'Liverpool — Short term, women seeking men','Open to short term women seeking men around Liverpool.',2,5,4),
(1,'Liverpool — Short term, men seeking women','Short term men seeking women in the Liverpool area.',2,6,4),
(1,'Liverpool — Short term, men seeking men','Short term men seeking men around Liverpool.',2,7,4),
(1,'Liverpool — Short term, women seeking women','Short term women seeking women in Liverpool.',2,8,4),
(1,'Liverpool — Couples seeking women','Couple in Liverpool seeking women for short term connection.',2,9,4),
(1,'Liverpool — Couples seeking couples','Couple in Liverpool seeking other couples locally.',2,11,4),

-- Leeds (location_id = 5)
(1,'Leeds — Women seeking men','Friendly Leeds local, women seeking men for long term in Leeds.',1,1,5),
(1,'Leeds — Men seeking women','Leeds man seeking women for long term connection in Leeds.',1,2,5),
(1,'Leeds — Men seeking men','Leeds resident, men seeking men for long term in Leeds.',1,3,5),
(1,'Leeds — Women seeking women','Women seeking women around Leeds for long term connection.',1,4,5),
(1,'Leeds — Short term, women seeking men','Open to short term women seeking men around Leeds.',2,5,5),
(1,'Leeds — Short term, men seeking women','Short term men seeking women in the Leeds area.',2,6,5),
(1,'Leeds — Short term, men seeking men','Short term men seeking men around Leeds.',2,7,5),
(1,'Leeds — Short term, women seeking women','Short term women seeking women in Leeds.',2,8,5),
(1,'Leeds — Couples seeking women','Couple in Leeds seeking women for short term connection.',2,9,5),
(1,'Leeds — Couples seeking couples','Couple in Leeds seeking other couples locally.',2,11,5),

-- Glasgow (location_id = 6)
(1,'Glasgow — Women seeking men','Friendly Glasgow local, women seeking men for long term in Glasgow.',1,1,6),
(1,'Glasgow — Men seeking women','Glasgow man seeking women for long term connection in Glasgow.',1,2,6),
(1,'Glasgow — Men seeking men','Glasgow resident, men seeking men for long term in Glasgow.',1,3,6),
(1,'Glasgow — Women seeking women','Women seeking women around Glasgow for long term connection.',1,4,6),
(1,'Glasgow — Short term, women seeking men','Open to short term women seeking men around Glasgow.',2,5,6),
(1,'Glasgow — Short term, men seeking women','Short term men seeking women in the Glasgow area.',2,6,6),
(1,'Glasgow — Short term, men seeking men','Short term men seeking men around Glasgow.',2,7,6),
(1,'Glasgow — Short term, women seeking women','Short term women seeking women in Glasgow.',2,8,6),
(1,'Glasgow — Couples seeking women','Couple in Glasgow seeking women for short term connection.',2,9,6),
(1,'Glasgow — Couples seeking couples','Couple in Glasgow seeking other couples locally.',2,11,6),

-- Edinburgh (location_id = 7)
(1,'Edinburgh — Women seeking men','Friendly Edinburgh local, women seeking men for long term in Edinburgh.',1,1,7),
(1,'Edinburgh — Men seeking women','Edinburgh man seeking women for long term connection in Edinburgh.',1,2,7),
(1,'Edinburgh — Men seeking men','Edinburgh resident, men seeking men for long term in Edinburgh.',1,3,7),
(1,'Edinburgh — Women seeking women','Women seeking women around Edinburgh for long term connection.',1,4,7),
(1,'Edinburgh — Short term, women seeking men','Open to short term women seeking men around Edinburgh.',2,5,7),
(1,'Edinburgh — Short term, men seeking women','Short term men seeking women in the Edinburgh area.',2,6,7),
(1,'Edinburgh — Short term, men seeking men','Short term men seeking men around Edinburgh.',2,7,7),
(1,'Edinburgh — Short term, women seeking women','Short term women seeking women in Edinburgh.',2,8,7),
(1,'Edinburgh — Couples seeking women','Couple in Edinburgh seeking women for short term connection.',2,9,7),
(1,'Edinburgh — Couples seeking couples','Couple in Edinburgh seeking other couples locally.',2,11,7),

-- Cardiff (location_id = 8)
(1,'Cardiff — Women seeking men','Friendly Cardiff local, women seeking men for long term in Cardiff.',1,1,8),
(1,'Cardiff — Men seeking women','Cardiff man seeking women for long term connection in Cardiff.',1,2,8),
(1,'Cardiff — Men seeking men','Cardiff resident, men seeking men for long term in Cardiff.',1,3,8),
(1,'Cardiff — Women seeking women','Women seeking women around Cardiff for long term connection.',1,4,8),
(1,'Cardiff — Short term, women seeking men','Open to short term women seeking men around Cardiff.',2,5,8),
(1,'Cardiff — Short term, men seeking women','Short term men seeking women in the Cardiff area.',2,6,8),
(1,'Cardiff — Short term, men seeking men','Short term men seeking men around Cardiff.',2,7,8),
(1,'Cardiff — Short term, women seeking women','Short term women seeking women in Cardiff.',2,8,8),
(1,'Cardiff — Couples seeking women','Couple in Cardiff seeking women for short term connection.',2,9,8),
(1,'Cardiff — Couples seeking couples','Couple in Cardiff seeking other couples locally.',2,11,8),

-- Bristol (location_id = 9)
(1,'Bristol — Women seeking men','Friendly Bristol local, women seeking men for long term in Bristol.',1,1,9),
(1,'Bristol — Men seeking women','Bristol man seeking women for long term connection in Bristol.',1,2,9),
(1,'Bristol — Men seeking men','Bristol resident, men seeking men for long term in Bristol.',1,3,9),
(1,'Bristol — Women seeking women','Women seeking women around Bristol for long term connection.',1,4,9),
(1,'Bristol — Short term, women seeking men','Open to short term women seeking men around Bristol.',2,5,9),
(1,'Bristol — Short term, men seeking women','Short term men seeking women in the Bristol area.',2,6,9),
(1,'Bristol — Short term, men seeking men','Short term men seeking men around Bristol.',2,7,9),
(1,'Bristol — Short term, women seeking women','Short term women seeking women in Bristol.',2,8,9),
(1,'Bristol — Couples seeking women','Couple in Bristol seeking women for short term connection.',2,9,9),
(1,'Bristol — Couples seeking couples','Couple in Bristol seeking other couples locally.',2,11,9),

-- Sheffield (location_id = 10)
(1,'Sheffield — Women seeking men','Friendly Sheffield local, women seeking men for long term in Sheffield.',1,1,10),
(1,'Sheffield — Men seeking women','Sheffield man seeking women for long term connection in Sheffield.',1,2,10),
(1,'Sheffield — Men seeking men','Sheffield resident, men seeking men for long term in Sheffield.',1,3,10),
(1,'Sheffield — Women seeking women','Women seeking women around Sheffield for long term connection.',1,4,10),
(1,'Sheffield — Short term, women seeking men','Open to short term women seeking men around Sheffield.',2,5,10),
(1,'Sheffield — Short term, men seeking women','Short term men seeking women in the Sheffield area.',2,6,10),
(1,'Sheffield — Short term, men seeking men','Short term men seeking men around Sheffield.',2,7,10),
(1,'Sheffield — Short term, women seeking women','Short term women seeking women in Sheffield.',2,8,10),
(1,'Sheffield — Couples seeking women','Couple in Sheffield seeking women for short term connection.',2,9,10),
(1,'Sheffield — Couples seeking couples','Couple in Sheffield seeking other couples locally.',2,11,10);

-- Messages (simple test messages)
INSERT INTO messages (sender_id, receiver_id, ad_id, content) VALUES
(1, 1, 1, 'Just testing the messaging system — everything looks good on my end.'),
(1, 1, 5, 'Checking message delivery for this Manchester listing.'),
(1, 1, 11, 'Testing a quick message for the London ad.'),
(1, 1, 21, 'Sending a test message for the Birmingham post.'),
(1, 1, 31, 'Verifying that messages work correctly for the Liverpool listing.'),
(1, 1, 41, 'Glasgow message test — making sure everything sends properly.'),
(1, 1, 51, 'Testing the chat feature on this Edinburgh ad.'),
(1, 1, 61, 'Cardiff message test — confirming delivery.'),
(1, 1, 71, 'Bristol listing message check — all good so far.'),
(1, 1, 81, 'Testing the Sheffield ad messaging system.');

