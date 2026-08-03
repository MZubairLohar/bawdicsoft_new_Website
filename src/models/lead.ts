import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    service: { type: String },
    message: { type: String },
    source: { type: String, default: 'Contact Form' },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
