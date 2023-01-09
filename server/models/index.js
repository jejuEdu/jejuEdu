const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
//const config = require("../../../configs/config/config")[env];
const User = require("./user");
const Study = require("./study");
const JejuAreaDB = require("./jejuAreaDB");
const serverLoggingDB = require("./serverLoggingDB");
const StudyAllList = require("./studyAllList");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Study = Study;
db.jejuAreaDB = JejuAreaDB;
db.serverLoggingDB = serverLoggingDB;
db.StudyAllList = StudyAllList;

User.init(sequelize);
Study.init(sequelize);
JejuAreaDB.init(sequelize);
serverLoggingDB.init(sequelize);
StudyAllList.init(sequelize);

User.associate(db);
Study.associate(db);
JejuAreaDB.associate(db);
serverLoggingDB.associate(db);
StudyAllList.associate(db);

module.exports = db;
