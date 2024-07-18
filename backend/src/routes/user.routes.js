import {Router} from 'express';
import { createUser, deleteUser, getUser, getUsers } from '../controllers/user.controller.js';

const router = Router()

router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.post('/users', createUser)
router.delete('/user/:id', deleteUser)

export default router