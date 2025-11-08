import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links profile to the registered user
      required: true,
    },
    dateOfBirth: { type: String },
    experience: { type: String },
    location: { type: String },
    resume: { type: String },
    jobsApplied: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
