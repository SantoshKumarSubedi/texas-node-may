const verifyRole = (role) => {
  return (req, res, next) => {
    const { roles } = req.jwt;
    if (roles && roles.includes(role)) {
      next();
    } else {
      res.status(403);
      res.json({ message: "AccessDenied" });
    }
  };
};

module.exports = { verifyRole };
