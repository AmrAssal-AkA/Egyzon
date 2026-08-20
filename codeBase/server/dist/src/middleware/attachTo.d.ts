import type { Request, Response, NextFunction } from "express";
import type { Server } from "socket.io";
export declare function attachTo(io: Server): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=attachTo.d.ts.map