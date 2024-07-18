import {Router} from 'express';
import { createPets, deletePet, getPet, getPets } from '../controllers/pet.controller.js';

const router = Router()

router.get('/pets', getPets)
router.get('/pet/:id', getPet)
router.post('/pets', createPets)
router.delete('/pet/:id', deletePet)

export default router