const orderController = async (repositories) => {
  const orderRepository = await repositories.orderRepo;

  async function _getTotalDiscount(cartItems) {
    let totalDiscount;
    let discountDetails;

    let updatedCartItemsFromDiscount = cartItems;

    return { totalDiscount, discountDetails, updatedCartItemsFromDiscount };
  }

  async function addToCart(dbConn, userId, productId, quantity) {
    let addedItem = await orderRepository
      .createCartEntry(dbConn, userId, productId, quantity)
      .catch((err) => {
        throw Error(err);
      });
    return addedItem;
  }

  async function fetchCart(dbConn, userId) {
    let cartItems = await orderRepository
      .getCartItems(dbConn, userId)
      .catch((err) => {
        throw Error(err);
      });

    let totalItems = cartItems.length;
    let totalItemsQuantity = cartItems.reduce((sum, current) => {
      return sum + current.quantity;
    }, 0);

    let { totalDiscount, discountDetails, updatedCartItemsFromDiscount } =
      await _getTotalDiscount(cartItems);
    cartItems = updatedCartItemsFromDiscount;

    return {
      cart_items: cartItems,
      cart_summary: {
        total_items: totalItems,
        total_items_quantity: totalItemsQuantity,
      },
    };
  }

  return (obj = {
    addToCart,
    fetchCart,
  });
};

module.exports = { orderController };
