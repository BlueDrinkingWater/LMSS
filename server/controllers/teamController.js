import Team from '../models/Team.js';

export const registerTeam = async (req, res) => {
  try {
    const { name, jerseyColor, homeCourt, coachingStaff, history } = req.body;
    const logo = req.file ? req.file.path : '';

    const team = await Team.create({
      name,
      jerseyColor,
      homeCourt,
      coachingStaff: JSON.parse(coachingStaff || '[]'),
      history,
      logo,
      coach: req.user._id,
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ coach: req.user._id });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('coach', 'name email');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};