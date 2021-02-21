import { Router } from 'express';
import PersonController from '../controllers/person.controller';

const router = Router();

router.post('/person', PersonController.create);
router.get('/person', PersonController.read);
router.put('/person', PersonController.update);
router.get('/getPeople', PersonController.getPeople);
router.post('/deletePerson', PersonController.delete);

export default router;
