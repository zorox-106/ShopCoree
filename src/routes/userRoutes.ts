import express from 'express';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

// User routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/login', userController.login);

export default router;
