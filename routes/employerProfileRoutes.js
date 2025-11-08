import express from "express";
import { protect } from "../middleware/auth.js";
import { getEmployerProfile, updateEmployerProfile } from "../controllers/employerController.js";

const router = express.Router();

// GET employer profile
router.get("/profile", protect, getEmployerProfile);

// POST or PUT employer profile update
router.post("/update", protect, updateEmployerProfile);

export default router;
