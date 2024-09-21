const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// router.get('/dashboard', authorise, (req, res) => {
//   res.status(200).json({ message: 'Welcome to the dashboard', userId: req.user.id });
// });

