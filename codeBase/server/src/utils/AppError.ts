

export class AppError extends Error {
     statusCode: number;
     status: string;
     constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 500 ? 'error' : 'fail';
        Object.setPrototypeOf(this, AppError.prototype);
     }
}