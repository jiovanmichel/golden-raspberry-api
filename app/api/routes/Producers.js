import { Router } from 'express';

import ProducersControllers from '../controllers/Producers.js';

const router = Router();

router.get('/awards-min-max-interval', ProducersControllers.getMinMaxAwardsInterval)

export default router;
