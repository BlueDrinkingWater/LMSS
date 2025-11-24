import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, default: '' }, // URL from Cloudinary
  jerseyColor: { type: String, required: true },
  homeCourt: { type: String },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The subscriber
  coachingStaff: [{ name: String, role: String }],
  leagueStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  history: { type: String }
}, { timestamps: true });

export default mongoose.model('Team', teamSchema);