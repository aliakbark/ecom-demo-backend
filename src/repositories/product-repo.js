const productRepo = async (dbConn) => {
  function getProductList(conn) {
    return new Promise(async (resolve, reject) => {
      let products = await conn
        .query(
          "SELECT `id`, `sku`, `title`, `desc`, `price` FROM `product` WHERE `is_active` = 1"
        )
        .catch((err) => {
          return reject(err.text ?? err);
        });

      return resolve(products);
    });
  }
  return (obj = {
    getProductList,
  });
};

module.exports = { productRepo };
