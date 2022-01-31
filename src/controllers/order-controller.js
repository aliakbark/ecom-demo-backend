const orderController = async (repositories) => {
  const orderRepository = await repositories.orderRepo;

  async function _calculateProdDiscounts(cartItems) {
    let appliedProdDiscounts = [];

    for (let item of cartItems) {
      let discount = item.product_discounts.reduce((sum, currentDisc) => {
        let appliedDiscAmount = 0;
        switch (parseInt(currentDisc.promotion_type_id)) {
          case 5:
            if (currentDisc.order_value_unit_id == 1) {
              const discMultiples =
                Math.floor(item.quantity / currentDisc.min_order_value) ?? 0;
              // const remainingQuantity = quantity % minValue;

              if (discMultiples > 0) {
                let priceToBeDiscounted =
                  parseFloat(currentDisc.discount_value) * discMultiples;
                let maxPriceToBeDiscounted = currentDisc?.max_discount_amount;
                if (
                  maxPriceToBeDiscounted &&
                  maxPriceToBeDiscounted > 0 &&
                  priceToBeDiscounted > maxPriceToBeDiscounted
                ) {
                  appliedDiscAmount = maxPriceToBeDiscounted;
                } else {
                  appliedDiscAmount = priceToBeDiscounted;
                }
              }
            }
            break;

          default:
            break;
        }
        Object.assign(currentDisc, { applied_disc_amount: appliedDiscAmount });
        if (appliedDiscAmount > 0) appliedProdDiscounts.push(currentDisc);
        return sum + appliedDiscAmount;
      }, 0);
      item.discount = discount;
      item.total_price = item.quantity * item.price - discount;
    }

    let totalProdDiscount = cartItems.reduce((sum, current) => {
      return sum + current.discount;
    }, 0);

    return { appliedProdDiscounts, totalProdDiscount };
  }

  async function _calculateCartDiscounts(
    cartDiscounts,
    totalItems,
    totalItemsQuantity,
    totalCartPrice
  ) {
    let appliedCartDiscounts = [];
    let cartDiscount = cartDiscounts.reduce((sum, currentDisc) => {
      let appliedDiscAmount = 0;

      switch (parseInt(currentDisc.promotion_type_id)) {
        case 2:
          if (currentDisc.order_value_unit_id == 2) {
            if (totalCartPrice >= currentDisc.min_order_value) {
              let priceToBeDiscounted = parseFloat(currentDisc.discount_value);
              let maxPriceToBeDiscounted = currentDisc?.max_discount_amount;
              if (
                maxPriceToBeDiscounted &&
                maxPriceToBeDiscounted > 0 &&
                priceToBeDiscounted > maxPriceToBeDiscounted
              ) {
                appliedDiscAmount = maxPriceToBeDiscounted;
              } else {
                appliedDiscAmount = priceToBeDiscounted;
              }
            }
          }
          break;

        default:
          break;
      }

      Object.assign(currentDisc, {
        applied_disc_amount: appliedDiscAmount,
      });
      if (appliedDiscAmount > 0) appliedCartDiscounts.push(currentDisc);

      return sum + appliedDiscAmount;
    }, 0);

    return { appliedCartDiscounts, cartDiscount };
  }
  ``;
  async function _getCartSummary(cartDetails) {
    let { appliedProdDiscounts, totalProdDiscount } =
      await _calculateProdDiscounts(cartDetails.cart_items);

    let totalItems = cartDetails.cart_items.length;
    let totalItemsQuantity = cartDetails.cart_items.reduce((sum, current) => {
      return sum + current.quantity;
    }, 0);
    let totalCartPrice = cartDetails.cart_items.reduce((sum, current) => {
      return sum + current.total_price;
    }, 0);

    let { appliedCartDiscounts, cartDiscount } = await _calculateCartDiscounts(
      cartDetails.cart_discounts,
      totalItems,
      totalItemsQuantity,
      totalCartPrice
    );

    let appliedDiscounts = [].concat(
      appliedProdDiscounts,
      appliedCartDiscounts
    );

    let totalAmountPay = totalCartPrice - cartDiscount;
    let totalSaved = totalProdDiscount + cartDiscount;

    return {
      total_items: totalItems,
      total_items_quantity: totalItemsQuantity,
      total_cart_price: totalCartPrice,
      amount_pay: totalAmountPay,
      total_saved: totalSaved,
      discounts_applied: appliedDiscounts,
    };
  }

  async function addToCart(dbConn, userId, productId, quantity) {
    let addedItem = await orderRepository
      .createCartEntry(dbConn, userId, productId, quantity)
      .catch((err) => {
        throw Error(err);
      });
    return addedItem;
  }

  async function clearCart(dbConn, userId) {
    let clearCart = await orderRepository
      .removeAllProductsFromCart(dbConn, userId)
      .catch((err) => {
        throw Error(err);
      });
    return clearCart;
  }

  async function fetchCart(dbConn, userId) {
    let cartDetails = await orderRepository
      .getCartDetails(dbConn, userId)
      .catch((err) => {
        throw Error(err);
      });

    let cartSummary = await _getCartSummary(cartDetails);

    return {
      cart_details: cartDetails,
      cart_summary: cartSummary,
    };
  }

  return (obj = {
    addToCart,
    clearCart,
    fetchCart,
    getCartSummary: _getCartSummary,
  });
};

module.exports = { orderController };
