import { Router } from 'express';
import { verifyToken, verifyRole } from '../middlewares/authentication';
import { logged, checkin } from '../controllers/users';

export const user_router : Router = Router();
user_router.post('/login', logged);
user_router.post('/user', checkin);