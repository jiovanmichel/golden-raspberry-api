import { Router } from 'express';

import MoviesControllers from '../controllers/Movies.js';

const router = Router();

router.get('/', MoviesControllers.findAll);

router.get('/:id', MoviesControllers.findById);

router.post('/', MoviesControllers.create);

router.put('/:id', MoviesControllers.update);

router.patch('/:id', MoviesControllers.patch);

router.delete('/:id', MoviesControllers.delete);

export default router;
