const mariaDb = require("mariadb");

async function getDbConnection(dbConfig) {
  const connection = await mariaDb.createConnection(dbConfig);
  return connection;
}

module.exports = { getDbConnection };
