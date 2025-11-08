import EmployerProfile from "../models/employerProfileModel.js";

// ✅ Create or Update Employer Profile
export const updateEmployerProfile = async (req, res) => {
  try {
    const { companyName, companyWebsite, companyDescription, companyLocation } = req.body;

    let profile = await EmployerProfile.findOne({ user: req.user._id });

    if (profile) {
      // Update existing
      profile.companyName = companyName || profile.companyName;
      profile.companyWebsite = companyWebsite || profile.companyWebsite;
      profile.companyDescription = companyDescription || profile.companyDescription;
      profile.companyLocation = companyLocation || profile.companyLocation;
      await profile.save();
    } else {
      // Create new
      profile = await EmployerProfile.create({
        user: req.user._id,
        companyName,
        companyWebsite,
        companyDescription,
        companyLocation,
      });
    }

    res.status(201).json(profile);
  } catch (error) {
    console.error("Error updating employer profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Employer Profile
export const getEmployerProfile = async (req, res) => {
  try {
    const profile = await EmployerProfile.findOne({ user: req.user._id }).populate("user", ["name", "email", "role"]);
    if (!profile) return res.status(404).json({ message: "Employer profile not found" });
    res.json(profile);
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
