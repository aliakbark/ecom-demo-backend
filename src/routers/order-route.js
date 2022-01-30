const { orderController } = require("../controllers/order-controller");
const { database } = require("../configs");

const orderRoute = async (router, dbConfig, repositories) => {
  const orderControllerConn = await orderController(repositories);
  router.post("/addtocart", async (req, res) => {
    let dbConn;
    const response = { status: "", message: "", data: null, error_type: "" };
    let status;

    try {
      status = 201;
      dbConn = await database.getDbConnection(dbConfig);
      let userId = req.body.user_id;
      let productId = req.body.product_id;
      let quantity = req.body.quantity;
      let itemAdded = await orderControllerConn.addToCart(
        dbConn,
        userId,
        productId,
        quantity
      );
      if (itemAdded) {
        response.data = itemAdded;
        response.message = "Item added to cart";
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

  router.get("/cart/:userid", async (req, res) => {
    let dbConn;
    const response = { status: "", message: "", data: null, error_type: "" };
    let status;

    try {
      status = 200;
      dbConn = await database.getDbConnection(dbConfig);
      let userId = req.params.userid;
      let cartDetails = await orderControllerConn.fetchCart(dbConn, userId);
      if (cartDetails) {
        response.data = cartDetails;
        response.message = "Cart details retreived successfully.";
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

module.exports = { orderRoute };
