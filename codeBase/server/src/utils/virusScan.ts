import NodeClam from 'clamscan';
import {Readable} from 'stream'
import logger from './logger';

let clamscan: NodeClam | null = null;

async function initClamScan() {
    if (!clamscan) {
        const clamscanInstance = await new NodeClam().init({
            clamdscan: {
                host: process.env.CLAMAV_HOST || 'localhost',
                port: parseInt(process.env.CLAMAV_PORT || '3310'),
                timeout: 60000,
            }
        })
        clamscan = clamscanInstance;
    }
    return clamscan;
}

export async function scanFile(fileBuffer: Buffer): Promise<{isInfected: boolean, viruses: string[]}> {
    try {
        const scanner = await initClamScan();
        const stream = Readable.from(fileBuffer);
        const { isInfected, viruses } = await scanner.scanStream(stream);
        return { isInfected, viruses };
    } catch (error) {
        logger.error(`Error scanning file for viruses: ${error}`);
        throw error;
    }
}