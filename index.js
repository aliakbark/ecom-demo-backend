const { config } = require("./src/configs");
const server = require("./src/server");
const repositories = require("./src/repositories");

process.on("uncaughtException", function (err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});

(async () => {
  try {
    let dbConn;
    const repo = await repositories.connect(dbConn);

    const allRepositories = {}; // Repository object to hold all connected repositories.
    const keys = Object.keys(repo);

    // Dynamically adding each Repository already connected to the DBs to a object
    keys.forEach(async (key, index) => {
      allRepositories[key] = repo[key](dbConn);
    });
    server.start(config.app.port, config.db, allRepositories);
  } catch (err) {
    console.error(err);
  }
}).call();
