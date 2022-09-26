"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto = __importStar(require("crypto"));
// algorithm - AES 256 GCM Mode
const algorithm = 'aes-256-gcm';
// iterations: It must be a number and should be set as high as possible.
// So, the more is the number of iterations, the more secure the derived key will be,
// but in that case it takes greater amount of time to complete.
// number of interation - the value of 2145 is randomly chosen
const iterations = 2145;
// keylen: It is the key of the required byte length and it is of type number.
// derive encryption key: 32 byte key length
const keylen = 32;
// digest: It is a digest algorithms of string type.
const digest = 'sha512';
// salt
const salt = crypto.randomBytes(64);
const encrypt = (data, secretKey) => {
    try {
        // constant to encrypt the data
        const inputEncoding = 'utf8';
        const outputEncoding = 'base64';
        // random initialization vector
        const iv = crypto.randomBytes(12);
        // The method gives an asynchronous Password-Based Key Derivation
        const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);
        // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
        // @algorithm - AES 256 GCM Mode
        // @key
        // @iv
        // @options
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
        // @algorithm - AES 256 GCM Mode
        // @key
        // @iv
        // @options
        const enc1 = cipher.update(data, inputEncoding);
        // Return the buffer containing the value of cipher object.
        // @outputEncoding: Output encoding format
        // const enc2 = cipher.final();
        const enc2 = cipher.final();
        // extract the auth tag
        const tag = cipher.getAuthTag();
        // return [enc1, enc2, iv, tag];
        const encryptedData = Buffer.concat([enc1, enc2, iv, tag]).toString(outputEncoding);
        // return the result
        return encryptedData;
    }
    catch (exception) {
        throw new Error(exception);
    }
};
exports.encrypt = encrypt;
const decrypt = (data, secretKey) => {
    try {
        // constant to decrypt the data
        const inputEncoding = 'base64';
        const outputEncoding = 'utf8';
        // Creates a new Buffer containing the given JavaScript string {str}
        // eslint-disable-next-line no-param-reassign
        const bufferData = Buffer.from(data, inputEncoding);
        // derive key using; 32 byte key length
        const key = crypto.pbkdf2Sync(secretKey, salt, iterations, keylen, digest);
        // extract iv from encrypted data
        const iv = bufferData.slice(bufferData.length - 28, bufferData.length - 16);
        // extract tag from encrypted data
        const tag = bufferData.slice(bufferData.length - 16);
        // extract encrypted text from encrypted data
        const text = bufferData.slice(0, bufferData.length - 28);
        // AES 256 GCM Mode
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        // set the auth tag
        decipher.setAuthTag(tag);
        // Used to update the cipher with data according to the given encoding format.
        // @data: It is used to update the cipher by new content
        // @inputEncoding: Input encoding format
        // @outputEncoding: Output encoding format
        let str = decipher.update(text, null, outputEncoding);
        // Return the buffer containing the value of cipher object.
        // @outputEncoding: Output encoding format
        str += decipher.final(outputEncoding);
        // parse the string decrypted data
        return str;
    }
    catch (exception) {
        throw new Error(exception);
    }
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.js.map