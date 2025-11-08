import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    companyName: { type: String, required: true },
    industry: { type: String },
    location: { type: String },
    website: { type: String },
    about: { type: String },
    contactEmail: { type: String },
    phone: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Employer", employerSchema);
