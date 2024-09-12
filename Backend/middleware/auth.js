const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authorise = (req, res, next) => {
  try {
    let token = req.headers.authorization; 

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    token = token.split(" ")[1]; 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    console.log("Decoded User Info: ", decoded);
    
    next(); 
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

// router.get('/dashboard', authorise, (req, res) => {
//   res.status(200).json({ message: 'Welcome to the dashboard', userId: req.user.id });
// });

module.exports=authorise;