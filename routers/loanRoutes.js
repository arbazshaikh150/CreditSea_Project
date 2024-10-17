import {Router} from 'express'
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { loanApplied } from '../controller/loanController.js';
const loanRouter = Router();
loanRouter.post('/' , isLoggedIn , loanApplied);
// router.get('/dashboard' , dashboard);
export default loanRouter;