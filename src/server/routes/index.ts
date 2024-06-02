import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

router.post('/', (req, res) => {
  console.log(req.body);

  return res.status(StatusCodes.CREATED).json(req.body);
});

export { router };
