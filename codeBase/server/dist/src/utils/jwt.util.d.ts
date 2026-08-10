import { jwtPayload } from "../types/auth.types";
export declare const signAccessToken: (payload: jwtPayload) => Promise<string>;
export declare const signRefreshToken: (payload: jwtPayload) => Promise<string>;
export declare const verifyAccessToken: (token: string) => jwtPayload;
export declare const verifyRefreshToken: (token: string) => jwtPayload;
//# sourceMappingURL=jwt.util.d.ts.map