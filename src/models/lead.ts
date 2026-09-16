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

    // 🆕 AI Agent fields (Phase 1 Dev Brief)
    intentScore: { type: Number, default: null },
    intentLabel: {
      type: String,
      enum: ['Hot', 'Warm', 'Cold', null],
      default: null,
    },
    pageCapturedFrom: { type: String, default: null },
    wantsToBuild: { type: String, default: null },
    visitorId: { type: String, default: null },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);