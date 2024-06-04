import { Router } from 'express';
import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

router.get(
  '/cities',
  CitiesController.getAllValidation,
  CitiesController.getAll
);

router.post(
  '/cities',
  CitiesController.createValidation,
  CitiesController.create
);

export { router };
