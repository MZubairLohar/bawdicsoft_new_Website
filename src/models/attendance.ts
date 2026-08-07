import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Half Day', 'On Leave'],
      default: 'Present',
    },
    // Computed hours worked (in hours) - auto-calculated from checkIn/checkOut
    hoursWorked: { type: Number, default: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

// Ensure one attendance record per employee per day
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
