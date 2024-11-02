function mustLogin(req, res, next) {
  if (!req.user)
    return res.redirect(
      "/login" + (req.originalUrl ? `?from=${req.originalUrl}` : "")
    );
  next();
}

module.exports = mustLogin;
