import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";
export declare const validate: (Schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map