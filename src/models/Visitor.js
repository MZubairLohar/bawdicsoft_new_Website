import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema({
  ip: String,
  company: { type: String, default: 'Unknown' },
  city: String,
  country: String,
  device: String,
  sessionId: String,
  page: String,
  referrer: String,
  visitedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);