import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  source: { type: String, default: 'Company Tracker' },
  status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);