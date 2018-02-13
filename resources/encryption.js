// Work in progress to be finished later into the project to encrypt/decrypt tokens and keys

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const iv = new Buffer(crypto.randomBytes(16));
const key = crypto.randomBytes(32);

let encrypt = (text) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

let decrypt = (text) => {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted
};

let hw = encrypt('Hello world');
console.log(hw);
console.log(decrypt(hw));