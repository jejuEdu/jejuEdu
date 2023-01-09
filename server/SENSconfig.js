const LRU = require("lru-cache");
//SMS 인증 1분제한
function SENSrequired(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key}`);
  }
  return value;
}
module.exports = {
  sens: {
    accessKey: SENSrequired("NCP_SENS_ACCESS"),
    secretKey: SENSrequired("NCP_SENS_SECRET"),
    serviceId: SENSrequired("NCP_SENS_ID"),
    callNumber: SENSrequired("NCP_SENS_NUMBER"),
  },
  createRandomNumber: (num) => {
    let secNm = "";

    for (var i = 0; i < num; i++) {
      secNm += Math.floor(Math.random() * 9 + 1).toString();
    }

    return secNm;
  },
  cache: new LRU({
    max: 500,
    maxSize: 5000,
    sizeCalculation: (value, key) => {
      return 1;
    },
    dispose: (value, key) => {},
    ttl: 60000,
  }),
};
