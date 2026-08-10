import mongoose from 'mongoose';

// Tracks visitor interactions (clicks on buttons/links such as WhatsApp,
// contact form, etc.). Only aggregate/anonymized data is stored — no IP.
const InteractionSchema = new mongoose.Schema(
  {
    type: { type: String, default: 'click' }, // e.g. 'whatsapp', 'contact', 'link'
    label: { type: String, default: 'unknown' }, // human-readable element label
    sessionId: { type: String },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Interaction || mongoose.model('Interaction', InteractionSchema);
