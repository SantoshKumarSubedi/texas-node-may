const publicURL = ["/login", "/registration"];

const authMiddleware = (req, res, next) => {
  const url = req.url;
  if (publicURL.includes(url)) {
    next();
  } else {
    const { userId, isAuthenticated } = req.session;
    if (isAuthenticated) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};

module.exports = { authMiddleware };
