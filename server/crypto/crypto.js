const crypto = require('crypto');

module.exports = {
    algorithm: 'aes-256-cbc',
    // salt: 'encodingsalt',
    key: 'encodingKey',
    iv: crypto.randomBytes(32), // 초기화 벡터 랜덤 생성
}