const express = require("express");

const app = express();

app.use(express.json());

const users = [];

app.post("/", (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    res.json({ message: "Invalid Request Body" });
  } else {
    users.push({ username, name, password });
    res.json({ message: "User Added Successfully" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "User Fetched Successfully.", data: users });
});

app.get("/:username", (req, res) => {
  let { username } = req.params;
  let responseUser;
  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username) {
      responseUser = users[i];
      break;
    }
  }
  if (responseUser) {
    res.json({ message: "User Fetched Successfully", data: responseUser });
  } else {
    res.json({ message: "User not found" });
  }
});

app.delete("/:username", (req, res) => {
  let { username } = req.params;
  let responseUser;
  for (let i = 0; i < users.length; i++) {
    if (username == users[i].username) {
      users.splice(i, 1);
      break;
    }
  }
});

app.put("/", (req, res) => {});

app.get("/check", (req, res) => {
  console.log("Health Check");
  res.send({ Health: "Check" });
});

app.patch("/", (req, res) => {});

app.delete("/", (req, res) => {});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server Started at port 3000....");
  }
});
