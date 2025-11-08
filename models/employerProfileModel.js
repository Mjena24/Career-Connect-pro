import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
    },
    companyDescription: {
      type: String,
    },
    companyLocation: {
      type: String,
    },
    postedJobs: [
      {
        title: String,
        applicants: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const EmployerProfile = mongoose.model("EmployerProfile", employerProfileSchema);
export default EmployerProfile;
