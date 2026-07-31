import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    category: { type: String, enum: ['design', 'video', 'content'], default: 'design' },
    projectImage: { type: String, required: true },
    alternate: { type: String },
    href: { type: String },
    projectDesc: { type: String, required: true },
    technologies: [{ type: String }], // Array of strings
    detailDesc: { type: String },
    challenge: { type: String },
    solution: { type: String },
    features: [{ type: String }], // Array of strings
    result: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);