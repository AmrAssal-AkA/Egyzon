import { Request, Response, NextFunction } from "express";
import { jwtPayload } from "../types/auth.types";
export interface AutheRequest extends Request {
    user?: jwtPayload;
}
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=Auth.middleware.d.ts.map