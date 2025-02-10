import { AppError } from './appError';

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, details);
  }
}
