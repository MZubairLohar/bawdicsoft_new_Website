import mongoose from 'mongoose';

// Tracks each unique site opening (one per visitor session).
// NOTE: We intentionally do NOT store the visitor's IP address.
// Only aggregate/anonymized location data is persisted.
const SiteVisitSchema = new mongoose.Schema(
  {
    country: { type: String, default: 'Unknown' },
    city: { type: String, default: 'Unknown' },
    region: { type: String, default: 'Unknown' },
    path: { type: String, default: '/' },
    sessionId: { type: String },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.SiteVisit || mongoose.model('SiteVisit', SiteVisitSchema);
