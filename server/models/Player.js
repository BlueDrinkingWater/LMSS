import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  jerseyNumber: { type: Number, required: true },
  photo: { type: String, default: '' },
  stats: {
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    steals: { type: Number, default: 0 },
    blocks: { type: Number, default: 0 },
    fouls: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 }
  }
}, { timestamps: true });

export default mongoose.model('Player', playerSchema);