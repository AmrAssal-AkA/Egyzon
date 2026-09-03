"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanFile = scanFile;
const clamscan_1 = __importDefault(require("clamscan"));
const stream_1 = require("stream");
let clamscan = null;
async function initClamScan() {
    if (!clamscan) {
        const clamscanInstance = await new clamscan_1.default().init({
            clamdscan: {
                host: 'localhost',
                port: 3310,
                timeout: 60000,
            }
        });
        clamscan = clamscanInstance;
    }
    return clamscan;
}
async function scanFile(fileBuffer) {
    const scanner = await initClamScan();
    const stream = stream_1.Readable.from(fileBuffer);
    const { isInfected, viruses } = await scanner.scanStream(stream);
    return { isInfected, viruses };
}
//# sourceMappingURL=virusScan.js.map