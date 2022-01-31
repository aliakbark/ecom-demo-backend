const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");

const initRoutes = require("./routers");

// Initializations
const app = express();

const start = (port, dbConfig, repositories) => {
  // middleware
  const middleware = [
    express.json(),
    express.urlencoded({ extended: false }),
    cors(),
  ];

  // settings
  app.set("port", port);

  app.use(express.static(path.join(__dirname, "/public")));
  app.use(middleware);

  initRoutes(app, router, dbConfig, repositories);

  //Error handlers
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });

  const server = app.listen(port, () => {
    console.log(`Ecom demo app listening on port ${port}!`);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
      console.log("Ecom demo app server closed.");
    });
  });
};

module.exports = Object.assign({}, { start, app });
