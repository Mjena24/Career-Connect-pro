import express from "express";
import { protect } from "../middleware/auth.js";
import User from "../models/userModel.js";

const router = express.Router();

// ✅ GET Logged-in user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
