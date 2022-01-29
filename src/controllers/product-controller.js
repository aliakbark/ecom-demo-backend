const productController = async (repositories) => {
  const productRepository = await repositories.productRepo;

  async function fetchProductList(dbConn) {
    let products = await productRepository
      .getProductList(dbConn)
      .catch((err) => {
        throw err;
      });
    return products;
  }

  return (obj = {
    fetchProductList,
  });
};

module.exports = { productController };
