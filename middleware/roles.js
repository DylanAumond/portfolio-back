export function roles(roles) {
  return (req, res, next) => {
    // check if user's roles are allowed
    if (req.roles.some((userRole) => roles.indexOf(userRole.libelle) >= 0)) return next()

    // return http response with code 403
    return res.status(403).json('acces denied')
  }
}
