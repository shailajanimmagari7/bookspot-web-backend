import { AppError } from './appError';

export class NotFoundError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 404, details); 
  }
}
