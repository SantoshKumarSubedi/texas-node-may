const requestLogger = (req, res, next) => {
  console.log(`Api ${req.url} Accessed At ${new Date()}`);
  if (["POST", "PUT"].includes(req.method)) {
    console.log(`API BODY: ${JSON.stringify(req.body)}`);
  }
  next();
};

module.exports = { requestLogger };
