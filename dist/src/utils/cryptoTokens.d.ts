declare const tokenExpiration: number;
declare const hashToken: (token: string) => string;
declare const generateToken: () => string;
declare const verifyToken: (token: string, hashedToken: string, expiration: Date) => boolean;
export { generateToken, hashToken, verifyToken, tokenExpiration };
//# sourceMappingURL=cryptoTokens.d.ts.map