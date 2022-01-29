const { productController } = require("../controllers/product-controller");
const { database } = require("../configs");

const repositories = require("../repositories");

const productRoute = async (router, dbConfig, repositories) => {
  console;
  const productControllerConn = await productController(repositories);

  router.get("/products", async (req, res) => {
    let dbConn;
    let response;
    let status;

    try {
      status = 200;
      dbConn = await database.getDbConnection(dbConfig);
      response = await productControllerConn.fetchProductList(dbConn);
    } catch (e) {
      console.log(e);
      status = 400;
    } finally {
      if (dbConn) await dbConn.end();
    }
    res.status(status).json(response);
  });
};

module.exports = { productRoute };
