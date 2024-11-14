import crypto from 'node:crypto';

export class CryptoHelper {


    constructor(secret) {
        this.algorithm = 'aes-128-cbc';
        this.secretKey = crypto
            .createHash("sha256")
            .update(secret)
            .digest("hex")
            .substring(0, 16);
    }


    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

        const encrypted = Buffer.concat([
            cipher.update(text, 'utf8'),
            cipher.final()
        ]);

        // IV[hex]:DATA[hex]
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }


    decrypt(hash) {
        const [iv, encryptedText] = hash
            .split(':')
            .map((part) => Buffer.from(part, 'hex'));

        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);

        const decrypted = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final()
        ]);

        return decrypted.toString('utf8');
    }
}



export default CryptoHelper;