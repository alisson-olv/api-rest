import { Router } from 'express';
import { CitiesController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

router.post(
  '/cities',
  CitiesController.createBodyValidator,
  CitiesController.create
);

export { router };
