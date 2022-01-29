const { productRoute } = require("./product-route");
const { orderRoute } = require("./order-route");

let routes = (app, router, dbConfig, repositories) => {
  try {
    productRoute(router, dbConfig, repositories);
    orderRoute(router, dbConfig, repositories);
  } catch (err) {
    console.log(
      "Error thrown while mounting routes/APIs in the server file",
      err
    );
  }

  router.get("/", async (req, res) => {
    res.send("Hello World from Ecom demo app!");
  });

  app.use(router);
};

module.exports = routes;
