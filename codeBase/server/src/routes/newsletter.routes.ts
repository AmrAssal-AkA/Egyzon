import express from 'express';

import { subscribeNewsletter } from '../controller/newsletter.controller';
import { validate } from '../middleware/validate';
import { subscribeNewsletterSchema } from '../validators/newsletter.validate';

const router = express.Router();

router.post('/subscribe', validate(subscribeNewsletterSchema), subscribeNewsletter);

export default router;


