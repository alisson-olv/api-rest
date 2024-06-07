import { Router } from 'express';
import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

router.post(
  '/cities',
  CitiesController.createValidation,
  CitiesController.create
);

router.get(
  '/cities',
  CitiesController.getAllValidation,
  CitiesController.getAll
);

router.get(
  '/cities/:id',
  CitiesController.getByIdValidation,
  CitiesController.getById
);

router.put(
  '/cities/:id',
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);

router.delete(
  '/cities/:id',
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

export { router };
