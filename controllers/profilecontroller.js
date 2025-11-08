import Profile from "../models/Profile.js";

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { title, dob, phone, experience, location, skills, bio, linkedin, portfolio } = req.body;
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { title, dob, phone, experience, location, skills, bio, linkedin, portfolio },
        { new: true }
      );
    } else {
      profile = await Profile.create({
        user: req.user.id,
        title,
        dob,
        phone,
        experience,
        location,
        skills,
        bio,
        linkedin,
        portfolio,
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "email"]);
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
