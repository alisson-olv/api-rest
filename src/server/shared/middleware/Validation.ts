import { RequestHandler } from 'express';

type TValidation = () => RequestHandler;

export const validation: TValidation = () => {
  return () => {
    console.log('teste');
  };
};
