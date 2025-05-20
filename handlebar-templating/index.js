const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const PORT = 3000;

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("helloworld", {
    subject: "Message To The World",
    message: "Hello World",
    showError: false,
  });
});

app.get("/about/:id", (req, res) => {
  const { id } = req.params;
  const { message } = req.query;
  res.render("about", { id, message });
});

app.get("/user/create", (req, res) => {
  res.render("createuser");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to log message");
  } else {
    console.log(`Server Started on port ${PORT}`);
  }
});
