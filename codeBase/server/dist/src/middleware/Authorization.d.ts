import { Request, Response, NextFunction } from "express";
import { jwtPayload } from "../types/auth.types";
export declare const Authorize: (...allowedRoles: jwtPayload['role'][]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=Authorization.d.ts.map