const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using https
  })
);

// Set up Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Simple authentication middleware
const authenticate = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Handlebars Demo",
    message: "Welcome to our Handlebars Demo!",
    items: [
      { name: "Item 1", description: "This is item 1" },
      { name: "Item 2", description: "This is item 2" },
      { name: "Item 3", description: "This is item 3" },
    ],
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    content: "This is a demo application showcasing Handlebars templating.",
  });
});

// Login routes
app.get("/login", (req, res) => {
  res.render("login", {
    layout: false,
    title: "Login",
    error: null,
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session = req.session || {};
    req.session.authenticated = true;
    res.redirect("/dashboard");
  } else {
    res.render("login", {
      title: "Login",
      error: "Invalid username or password",
    });
  }
});

app.get("/dashboard", authenticate, (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    username: "admin",
  });
});

app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
