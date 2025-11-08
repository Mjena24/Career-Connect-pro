import SeekerProfile from "../models/seekerProfileModel.js";

export const createOrUpdateSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body, user: req.user.id },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSeekerProfile = async (req, res) => {
  try {
    const profile = await SeekerProfile.findOne({ user: req.user.id }).populate("user", "name email");
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
