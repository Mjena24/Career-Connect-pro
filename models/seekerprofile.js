import mongoose from "mongoose";

const seekerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfBirth: { type: String },
  experience: { type: String },
  location: { type: String },
  resume: { type: String },
});

// ✅ Fix OverwriteModelError
const SeekerProfile =
  mongoose.models.SeekerProfile ||
  mongoose.model("SeekerProfile", seekerProfileSchema);

export default SeekerProfile;
