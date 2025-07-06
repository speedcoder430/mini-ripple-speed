const UserModel = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("Authorization")?.replace("Bearer ", "");

    // if (!token) {
    //   return res.status(401).json({ error: "Authentication required" });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await UserModel.findById(decoded.userId).select("_id name email");

    // if (!user) {
    //   console.error("Auth Error: User not found for ID:", decoded.userId);
    //   return res.status(401).json({ error: "Authentication failed" }); // generic
    // }

    // if (!user) {
    //   return res.status(401).json({ error: "User not found" });
    // }

    // req.user = user;           // ✅ Attach authenticated user to request
    // req.token = token

    req.user = {
        _id: "64fa66c3c3b7d0a9a0f1a111"
    }
    next();                    // ✅ Proceed to the route handler
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports= auth;