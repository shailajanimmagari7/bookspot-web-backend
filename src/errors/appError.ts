export class AppError extends Error {
    public statusCode: number;
    public details?: any;
  
    constructor(message: string, statusCode: number, details?: any) {
      super(message);
      this.name = this.constructor.name;  
      this.statusCode = statusCode;
      this.details = details;
      Error.captureStackTrace(this, this.constructor); 
    }
  }
  