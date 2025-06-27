import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (isCelebrateError(err)) {
    const message = 'Ошибка валидации данных';
    return res.status(400).json({ message });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'На сервере произошла ошибка'
    : err.message;

  return res.status(statusCode).json({ message });
};

export default errorHandler;
