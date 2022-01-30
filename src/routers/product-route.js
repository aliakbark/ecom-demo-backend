const { productController } = require("../controllers/product-controller");
const { database } = require("../configs");

const productRoute = async (router, dbConfig, repositories) => {
  const productControllerConn = await productController(repositories);

  router.get("/products", async (req, res) => {
    let dbConn;
    const response = { status: "", message: "", data: null, error_type: "" };
    let status;

    try {
      status = 200;
      dbConn = await database.getDbConnection(dbConfig);
      let products = await productControllerConn.fetchProductList(dbConn);
      if (products) {
        response.data = products;
        response.message = "Products successfully retreived.";
        response.status = "success";
      }
    } catch (e) {
      console.log(e);
      status = 400;
      response.status = "error";
      response.message = e?.message ?? "";
    } finally {
      if (dbConn) await dbConn.end();
    }
    res.status(status).json(response);
  });
};

module.exports = { productRoute };
