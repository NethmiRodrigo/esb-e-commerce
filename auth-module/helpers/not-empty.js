const notEmpty = (req, res, next) => {
  //Throw error if params in body is empty
  Object.keys(req.body).forEach((key) => {
    if (
      req.body[key] == null ||
      (typeof req.body[key] === "string" && req.body[key].length <= 0)
    )
      return res.status(500).json({ [key]: `${key} param is empty` });
  });

  next();
};

module.exports = notEmpty;
