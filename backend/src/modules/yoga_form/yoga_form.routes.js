import { Router } from 'express';
import Yoga_formController from './yoga_form.controller.js';

const router = Router();
const yoga_formController = new Yoga_formController();

router.get('/', yoga_formController.getAll);
router.post('/', yoga_formController.create);
router.delete('/:id', yoga_formController.delete);


export default router;