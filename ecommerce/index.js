const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const { router } = require("./routes");
const { databaseConnect } = require("./config/database-connection");
const { authMiddleware } = require("./middleware/auth-middleware");
const app = express();
const PORT = 3000;

// Register Rendering Engine
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
      eq: (a, b) => a == b,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "BarkingCat",
    cookie: { maxAge: 6000000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(authMiddleware);

//Register Router
app.use(router);
databaseConnect();
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server");
  } else {
    console.log(`Server Started on port ${PORT}`);
  }
});
