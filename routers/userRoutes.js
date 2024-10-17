import {Router} from 'express'
import { dashboard_search, login, register } from '../controller/userController.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = Router();
router.post('/register' , register);
router.post('/login' , login);
// router.get('/dashboard' , dashboard);
export default router;