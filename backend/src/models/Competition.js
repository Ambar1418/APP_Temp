const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  tags: [{ type: String }],
  certificateBadge: {
    en: { type: String, default: "Winners get certificate" },
    hi: { type: String, default: "विजेताओं को प्रमाण पत्र मिलता है" }
  },
  prizePool: { type: Number, required: true, default: 1500 },
  entryFee: { type: Number, required: true, default: 99 },
  maxSpots: { type: Number, required: true, default: 20 },
  bookedSpots: { type: Number, required: true, default: 1 },
  judge: {
    name: { type: String, required: true },
    avatar: { type: String },
    title: { type: String },
    experience: { type: String },
    videoUrl: { type: String }
  },
  registrationEndsAt: { type: Date, required: true },
  importantDates: {
    registerBefore: { en: String, hi: String },
    submissionStarts: { en: String, hi: String },
    submissionEnds: { en: String, hi: String },
    resultDate: { en: String, hi: String }
  },
  previousWinners: [{
    id: String,
    name: String,
    title: String,
    avatar: String,
    videoUrl: String
  }],
  contentTabs: {
    about: { en: String, hi: String },
    judging: { en: String, hi: String },
    rules: { en: String, hi: String }
  },
  rewards: [{
    rank: { en: String, hi: String },
    amount: Number
  }],
  referralCode: { type: String, default: 'referral123' },
  referralEarnAmount: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);
