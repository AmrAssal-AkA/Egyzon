import crypto from "crypto";


const Algorithm ="aes-256-gcm";
const key = Buffer.from(process.env.BANK_ENCRYPTION_KEY!, "hex");

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(12);
    const cypther = crypto.createCipheriv(Algorithm, key, iv);

    const encrypted = Buffer.concat([cypther.update(text, "utf8"), cypther.final()]);
    const authTag = cypther.getAuthTag();

    return Buffer.concat([iv, encrypted, authTag]).toString("base64")
}

export function dycrypt(payload: string): string {
    const data = Buffer.from(payload, "base64");

    const iv = data.subarray(0, 12);
    const authTag = data.subarray(12, 28);
    const encrypted = data.subarray(28);

    const decypther = crypto.createDecipheriv(Algorithm, key, iv);
    decypther.setAuthTag(authTag);

    return Buffer.concat([decypther.update(encrypted), decypther.final()]).toString("utf8");
}