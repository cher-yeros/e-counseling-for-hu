const jwt = require('jsonwebtoken');
const key = 'key';
module.exports = async function (req, res, next) {
  const token = req.header('x-api-key');
  console.log(req.headers);
  if (!token) return res.status(401).send({
    "success": "false",
    "message": "Access Token."
  });

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send({
      "success": "false",
      "message": "Access denied."
    });
  }

}