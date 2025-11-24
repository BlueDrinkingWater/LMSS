import Player from '../models/Player.js';
import Team from '../models/Team.js';

// Add Player
export const addPlayer = async (req, res) => {
  try {
    const { teamId, name, position, jerseyNumber } = req.body;
    const photo = req.file ? req.file.path : '';

    // Check if the user owns the team
    const team = await Team.findOne({ _id: teamId, coach: req.user._id });
    if (!team) return res.status(403).json({ message: 'You can only add players to your own team' });

    const player = await Player.create({
      team: teamId,
      name,
      position,
      jerseyNumber,
      photo
    });

    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Stats
export const updatePlayerStats = async (req, res) => {
  try {
    const { playerId } = req.params;
    const stats = req.body; // { points, rebounds, ... }

    const player = await Player.findById(playerId).populate('team');
    if (!player) return res.status(404).json({ message: 'Player not found' });

    // Verify ownership
    if (player.team.coach.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update stats for this player' });
    }

    // Update stats (accumulate or replace logic can go here, currently replacing/adding)
    player.stats = { ...player.stats, ...stats };
    await player.save();

    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeamPlayers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const players = await Player.find({ team: teamId });
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}