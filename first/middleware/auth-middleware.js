const jwt = require("jsonwebtoken");
const publicURL = ["/users/login"];

const authMiddleware = (req, res, next) => {
  const url = req.url;
  if (publicURL.includes(url)) {
    next();
  } else {
    const headers = req.headers;
    const bearerToken = headers["authorization"];
    if (bearerToken) {
      const tokens = bearerToken.split(" ");
      const jwtToken = tokens[1];
      try {
        const payload = jwt.verify(jwtToken, "SecretTOKEN");
        next();
      } catch (ex) {
        res.status(403);
        res.json({ message: "AccessDenied" });
      }
    } else {
      res.status(401);
      res.json({ message: "AccessDenied" });
      // Allow Access For Login
    }
  }
};

module.exports = { authMiddleware };
