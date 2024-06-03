import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface ICities {
  name: string;
  state: string;
}

const bodyValidation: yup.ObjectSchema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    yupError.inner.map((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }
};

export const createValidation = validation();

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.send('Create');
};
