export function roles(roles) {
  return (req, res, next) => {
    const userRoles = req.roles;
    if (userRoles.some((userRole) => roles.indexOf(userRole) >= 0)) {
      next();
    } else {
      return res.status(403).json("acces denied");
    }
  };
}
