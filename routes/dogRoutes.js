import express from 'express';

import dogControllers from '../controllers/dogControllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const { getDogs, getDog, addDogForm, addDog, updateDog, deleteDog } =
    dogControllers;

router.get('/dogs', getDogs);
router.get('/dogs/:id', getDog);
router.get('/add', verifyToken, addDogForm);
router.post('/add', verifyToken, addDog);
router.put('/dogs/:id', verifyToken, updateDog);
router.delete('/dogs/:id', verifyToken, deleteDog);

export default router;
