import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  company: { type: String },
  location: { type: String },
  salary: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
