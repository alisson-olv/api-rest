import { Router } from 'express';
import {
  CitiesController,
  PersonsController,
  UsersController,
} from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

// /CITIES
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

// /PERSONS
router.post(
  '/persons',
  PersonsController.createValidation,
  PersonsController.create
);

router.get(
  '/persons',
  PersonsController.getAllValidation,
  PersonsController.getAll
);

router.get(
  '/persons/:id',
  PersonsController.getByIdValidation,
  PersonsController.getById
);

router.put(
  '/persons/:id',
  PersonsController.updateByIdValidation,
  PersonsController.updateById
);

router.delete(
  '/persons/:id',
  PersonsController.deleteByIdValidation,
  PersonsController.deleteById
);

// /USERS
router.post(
  '/users/signup',
  UsersController.signUpValidation,
  UsersController.signUp
);

router.post(
  '/users/signin',
  UsersController.signInValidation,
  UsersController.signIn
);

export { router };
