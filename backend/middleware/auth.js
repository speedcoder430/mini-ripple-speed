const admin = require("../config/firebase-admin");
const UserModel = require("../models/user.model");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication required" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await UserModel.findById(decoded.userId).select("_id name email");

//     if (!user) {
//       console.error("Auth Error: User not found for ID:", decoded.userId);
//       return res.status(401).json({ error: "Authentication failed" }); // generic
//     }

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     req.user = user;           // ✅ Attach authenticated user to request
//     req.token = token;
//     next();                    // ✅ Proceed to the route handler
//   } catch (error) {
//     res.status(401).json({ error: "Please authenticate" });
//   }
// };


// middleware/firebaseAuth.js


const firebaseAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    req.user = decodedToken; // contains uid, email, etc.
    next();
  } catch (err) {
    console.error("Firebase Auth Error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = firebaseAuth;
