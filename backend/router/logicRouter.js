import { ResourceController } from '../controller/ResourceController.js';
import express from 'express';
const router = express.Router();

router.post('/resource/processQueryTags', ResourceController.processQueryTags);
router.post('/resource/processTagAddSave', ResourceController.processTagAddSave);

export default router;