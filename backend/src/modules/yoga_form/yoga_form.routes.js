import { Router } from 'express';
import Yoga_formController from './yoga_form.controller.js';
import uploadPdf from '../../helpers/formUpload.js';
import authenticate from '../../middlewares/auth.middleware.js'; 
import { authorize } from '../../middlewares/authorize.middleware.js'; 

const router = Router();
const yoga_formController = new Yoga_formController();

router.get('/', authenticate, authorize(["Admin"]),yoga_formController.getAll);
router.post('/', uploadPdf.single("pdfFile"), yoga_formController.create);
router.delete('/:id', yoga_formController.delete);


export default router;