import { AppError } from './appError';

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, details);  
  }
}
