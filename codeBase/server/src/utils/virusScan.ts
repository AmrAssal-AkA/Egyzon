import NodeClam from 'clamscan';
import {Readable} from 'stream'

let clamscan: NodeClam | null = null;

async function initClamScan() {
    if (!clamscan) {
        const clamscanInstance = await new NodeClam().init({
            clamdscan: {
                host: 'localhost',
                port: 3310,
                timeout: 60000,
            }
        })
        clamscan = clamscanInstance;
    }
    return clamscan;
}

export async function scanFile(fileBuffer: Buffer): Promise<{isInfected: boolean, viruses: string[]}> {
    const scanner = await initClamScan();
    const stream = Readable.from(fileBuffer);
    const { isInfected, viruses } = await scanner.scanStream(stream);
    return { isInfected, viruses };
}