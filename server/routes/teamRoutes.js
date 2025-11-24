import express from 'express';
import { registerTeam, getMyTeams, getAllTeams } from '../controllers/teamController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', protect, upload.single('logo'), registerTeam);
router.get('/my-teams', protect, getMyTeams);
router.get('/', protect, admin, getAllTeams); // Admin only

export default router;