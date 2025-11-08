import express from "express";
import { protect } from "../middleware/auth.js";
import SeekerProfile from "../models/seekerprofile.js";

const router = express.Router();

// ✅ Get Seeker Profile with user details
router.get("/me", protect, async (req, res) => {
  try {
    const profile = await SeekerProfile.findOne({ user: req.user.id })
      .populate("user", ["name", "email", "role"]);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
