import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Not authenticated',
      },
    });
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid token type',
      },
    });
  }

  if (token !== 'teste.token') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid token',
      },
    });
  }

  return next();
};
