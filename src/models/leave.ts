import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    type: {
      type: String,
      enum: ['Casual', 'Sick', 'Annual', 'Unpaid'],
      default: 'Casual',
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    adminRemarks: { type: String },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Leave || mongoose.model('Leave', LeaveSchema);
