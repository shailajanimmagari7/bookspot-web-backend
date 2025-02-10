import { AppError } from './appError';

export class UnauthorizedError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 401, details);  
  }
}
