export default (...allowedRoles) => (
  (req, res, next) => {
    if(!req?.role) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = rolesArray.find(role => role === req.role);
    if(!result) return res.sendStatus(401);
    next();
  }
)