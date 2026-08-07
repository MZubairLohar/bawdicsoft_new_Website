import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    position: { type: String, required: true },
    department: { type: String },
    salary: { type: Number },
    dateOfJoining: { type: Date },
    status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
    role: { type: String, enum: ['admin', 'manager', 'rep', 'employee'], default: 'employee' },
    avatar: { type: String },
    notes: { type: String },
    // Reference to the User account that lets this employee log in to /employee
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

// Prevents Mongoose from compiling the model multiple times in development
export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
