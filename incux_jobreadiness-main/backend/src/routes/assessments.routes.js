import { Router } from 'express';
import { 
  getAllAssessments, 
  getAssessmentById, 
  createAssessment, 
  updateAssessment, 
  deleteAssessment,
  getAssessmentQuestions,
  addQuestionsToAssessment,
  removeQuestionFromAssessment
} from '../controllers/assessments.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = Router();

// Public assessment catalog metadata (candidate & admin can browse available assessments)
router.get('/', getAllAssessments);
router.get('/:id', getAssessmentById);

// All protected endpoints below require authentication
router.use(authenticateToken);

// Candidate & Admin can fetch questions during assessment session
router.get('/:id/questions', getAssessmentQuestions);

// Admin-only management endpoints
router.post('/', requireRole('admin'), createAssessment);
router.put('/:id', requireRole('admin'), updateAssessment);
router.delete('/:id', requireRole('admin'), deleteAssessment);

// Manage questions linked to an assessment
router.post('/:id/questions', requireRole('admin'), addQuestionsToAssessment);
router.delete('/:id/questions/:questionId', requireRole('admin'), removeQuestionFromAssessment);

export default router;

