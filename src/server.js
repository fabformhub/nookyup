import express from "express";
import session from "express-session";
import SQLiteStoreFactory from "connect-sqlite3";
import csrf from "csurf";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/db.js";
import expressLayouts from "express-ejs-layouts";

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQLiteStore = SQLiteStoreFactory(session);
const app = express();

import { getFlagEmoji } from "./utils/flags.js";
app.locals.getFlagEmoji = getFlagEmoji;

// -----------------------------
// STATIC FILES
// -----------------------------
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// BODY PARSERS
// -----------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----------------------------
// SESSION SETUP
// -----------------------------
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.sqlite" }),
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

// -----------------------------
// DEFAULT PAGE TITLE
// -----------------------------
app.use((req, res, next) => {
  res.locals.title = "NookyUp";
  next();
});

// -----------------------------
// FLASH HELPER
// -----------------------------
app.use((req, res, next) => {
  req.flash = function (msg) {
    if (!req.session.messages) req.session.messages = [];
    req.session.messages.push(msg);
  };
  next();
});

app.use((req, res, next) => {
  res.locals.messages = req.session.messages || [];
  req.session.messages = [];
  next();
});

// -----------------------------
// USER INFO IN VIEWS
// -----------------------------
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;

  if (req.session.userId) {
    const user = db
      .prepare("SELECT email FROM users WHERE id = ?")
      .get(req.session.userId);
    res.locals.userEmail = user?.email || null;
  } else {
    res.locals.userEmail = null;
  }

  next();
});


// Skip CSRF for /api/*
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // skip CSRF for API routes
  }

  csrf({ ignoreMethods: ["GET", "HEAD", "OPTIONS"] })(req, res, next);
});

app.use((req, res, next) => {
  if (!req.path.startsWith('/api')) {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
})

// -----------------------------
// AUTO‑REDIRECT LOGGED‑IN USERS TO /dashboard
// -----------------------------
app.use((req, res, next) => {
  const loggedIn = !!req.session.userId;
  const publicPages = ["/", "/login", "/signup", "/about", "/contact"];

  if (loggedIn && publicPages.includes(req.path)) {
    return res.redirect("/dashboard");
  }

  next();
});

// -----------------------------
// GLOBAL USER + CURRENT ROUTE
// -----------------------------
app.use((req, res, next) => {
  const normalizedPath = req.path.replace(/\/$/, "") || "/";
  res.locals.currentRoute = normalizedPath;

  if (!req.session.userId) {
    res.locals.user = null;
    return next();
  }

  const user = db
    .prepare("SELECT id, email FROM users WHERE id = ?")
    .get(req.session.userId);

  res.locals.user = user || null;
  next();
});

// -----------------------------
// VIEW ENGINE + LAYOUTS
// -----------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// -----------------------------
// ROUTES (ORDER MATTERS)
// -----------------------------

// 1️⃣ API ROUTES FIRST (prevents conflicts with dynamic page routes)
import apiRoutes from "./routes/api.js";
app.use("/api", apiRoutes);

// 2️⃣ Authentication routes
import authRoutes from "./routes/auth.js";
app.use("/", authRoutes);

// 3️⃣ Dashboard routes
import dashboardRoutes from "./routes/dashboard.js";
app.use("/dashboard", dashboardRoutes);

// 4️⃣ Page routes
import pageRoutes from "./routes/page.js";
app.use("/", pageRoutes);

// 4️⃣ Ads  routes
import adsRoutes from "./routes/ads.js";
app.use("/", adsRoutes);


// 5️⃣ Browse routes (dynamic, wildcard routes) last
import browseRoutes from "./routes/browse.js";
app.use("/", browseRoutes);

// 6️⃣ Optional: admin, messages, payment, etc. routes
// import adminRoutes from "./routes/admin.js";
// import messagesRoutes from "./routes/messages.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// app.use("/admin", adminRoutes);
// app.use("/messages", messagesRoutes);
// app.use("/", paymentRoutes);

// -----------------------------
// 404 HANDLER
// -----------------------------
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});

// -----------------------------
// ERROR HANDLER
// -----------------------------
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).send("Invalid CSRF token");
  }
  console.error(err);
  res.status(500).send("Something went wrong");
});

// -----------------------------
// START SERVER
// -----------------------------
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
