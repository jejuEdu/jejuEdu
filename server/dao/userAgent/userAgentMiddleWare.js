const serverLoggingDB = require('../../models/serverLoggingDB');

module.exports = function userAgentMiddleWare(serverLog) {
  return async (req, res, next) => {
    try {
      await serverLoggingDB.create({
        serverLog: req.header('User-Agent') + serverLog,
      });
    } catch (err) {
      await serverLoggingDB.create({
        serverLog: `error occured : ${req.header('User-Agent') + serverLog} err : ${err}`,
      });
    }
    next();
  };
};
