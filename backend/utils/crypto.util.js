import fs from 'fs';
import crypto from 'crypto';

// Generar o cargar claves RSA
const initializeKeys = () => {
    if (!fs.existsSync("private.pem") || !fs.existsSync("public.pem")) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
        });

        fs.writeFileSync("public.pem", publicKey);
        fs.writeFileSync("private.pem", privateKey);
    }

    return {
        publicKey: fs.readFileSync("public.pem", "utf8"),
        privateKey: fs.readFileSync("private.pem", "utf8")
    };
};

const { publicKey, privateKey } = initializeKeys();

// Generar clave AES aleatoria
const generateAESKey = () => crypto.randomBytes(32); // 256 bits

// Encriptar datos con AES
const encryptAES = (data, key) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return { iv: iv.toString("base64"), data: encrypted };
};

// Desencriptar datos con AES
const decryptAES = (encryptedData, key) => {
    const iv = Buffer.from(encryptedData.iv, "base64");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedData.data, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

// Encriptar datos (usa RSA para la clave AES y AES para los datos)
export const encryptData = (data) => {
    const aesKey = generateAESKey();
    const encryptedData = encryptAES(data, aesKey);
    const encryptedKey = crypto.publicEncrypt(publicKey, aesKey).toString("base64");
    
    return JSON.stringify({
        key: encryptedKey,
        data: encryptedData
    });
};

// Desencriptar datos
export const decryptData = (encryptedData) => {
    const encryptedObj = JSON.parse(encryptedData);
    const aesKey = crypto.privateDecrypt(
        privateKey, 
        Buffer.from(encryptedObj.key, "base64")
    );
    return decryptAES(encryptedObj.data, aesKey);
};