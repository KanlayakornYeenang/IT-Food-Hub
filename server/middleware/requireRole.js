const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.user_role === role) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = requireRole;
