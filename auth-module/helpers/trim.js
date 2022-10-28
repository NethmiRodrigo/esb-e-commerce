const trim = (req, res, next) => {
  const exceptions = ["password"];

  //Remove trailing white spaces from request body params
  Object.keys(req.body).forEach((key) => {
    if (!exceptions.includes(key) && typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });

  next();
};

module.exports = trim;
