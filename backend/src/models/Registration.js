const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  competitionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
  userName: { type: String, default: 'Prashant' },
  userEmail: { type: String, default: 'prashant@example.com' },
  paymentId: { type: String, required: true },
  status: { type: String, enum: ['registered', 'submitted'], default: 'registered' },
  submission: {
    title: String,
    videoUrl: String,
    notes: String,
    submittedAt: Date
  }
}, { timestamps: true });

// Ensure unique registration per user per competition
registrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
