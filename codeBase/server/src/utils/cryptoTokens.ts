import crypto from "crypto";


const tokenBytes = 32;
const tokenExpiration = 60 * 60 * 1000;

const hashToken = (token: string): string => {
    return crypto.createHash("sha256").update(token).digest("hex");
};



const generateToken = (): string => {
    const token = crypto.randomBytes(tokenBytes).toString("hex");
    const haashedToken = hashToken(token);
    const expiration = new Date(Date.now() + tokenExpiration);
    
    return JSON.stringify({ token, haashedToken, expiration });
}


const verifyToken = (token: string, hashedToken: string, expiration: Date): boolean => {
    if (!token || !hashedToken) {
        return false;
    }
    if (new Date(expiration).getTime() < Date.now()){
        return false;
    }
    const isComingHashedToken = hashToken(token);

    const a = Buffer.from(isComingHashedToken);
    const b = Buffer.from(hashedToken);
    if (a.length !== b.length) {
        return false
    }
    return crypto.timingSafeEqual(a, b);
}

export { generateToken, hashToken, verifyToken, tokenExpiration };