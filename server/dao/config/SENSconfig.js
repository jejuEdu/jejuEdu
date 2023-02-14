const LRU = require("lru-cache");
var defaultKey = {
  ACCESS_SECRET_KEY: "accessKey",
  REFRESH_SECRET_KEY: "secretKey",
  NCP_SENS_ACCESS: "QKlhgcIXEXKDhxNiay2d",
  NCP_SENS_SECRET: "anbHiCJCAIMZocnhOQN2yaPGvSUsewooTzCKD8rJ",
  NCP_SENS_ID: "ncp:sms:kr:297655669204:dhaparksns",
  NCP_SENS_NUMBER: "01057371087",
};

//SMS 인증 1분제한
function SENSrequired(key, defaultValue = defaultKey) {
  const value = process.env[key] || defaultValue[key];
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
