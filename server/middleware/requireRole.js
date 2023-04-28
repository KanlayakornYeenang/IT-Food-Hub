

const requireRole = (req, res, next) => {
  console.log(req.user.user_role)
  const role = req.user.user_role
  if(role != 'delivery'){
    res.status(404).send("You can't do this!!, role is not allowed")
  }
  next()
};

module.exports = requireRole;
