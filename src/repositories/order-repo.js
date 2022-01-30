const orderRepo = async (dbConn) => {
  function createCartEntry(conn, userId, productId, quantity) {
    return new Promise(async (resolve, reject) => {
      await conn
        .query(
          "INSERT INTO `cart_item`(`user_id`, `product_id`, `quantity`) VALUES (?, ?, ?)",
          [userId, productId, quantity]
        )
        .then((addItemToCartRes) => {
          if (addItemToCartRes.affectedRows > 0) {
            return resolve({ userId, productId, quantity });
          } else {
            return reject(`Item not added to cart, Please try again!`);
          }
        })
        .catch((err) => {
          if (err.code == "ER_DUP_ENTRY") {
            return reject(`Item already added in the cart.`);
          }
          return reject(err.text ?? err);
        });
    });
  }

  function getCartItems(conn, userId) {
    return new Promise(async (resolve, reject) => {
      let cartItems = [];
      cartItems = await conn
        .query(
          "SELECT ci.`user_id`, ci.`product_id`, prod.`title`, prod.`desc`, prod.`sku`, prod.`price`, ci.`quantity` FROM `cart_item` ci INNER JOIN `product` prod ON ci.`product_id` = prod.`id` AND prod.`is_active` = 1 WHERE ci.`user_id` = ?",
          [userId]
        )
        .catch((err) => {
          return reject(err.text ?? err);
        });

      for (let i = 0; i < cartItems.length; i++) {
        let productDiscounts = await conn.query(
          "SELECT pd.`product_id`, pd.`discount_id`, disc.`promotion_type_id`, disc.`discount_type_id`, disc.`discount_unit_id`, disc.`discount_value`, disc.`valid_from`, disc.`valid_until`, disc.`min_order_value`, disc.`max_discount_amount` FROM `product_discount` pd INNER JOIN `discount` disc ON disc.`id` = pd.`discount_id` AND disc.`is_active` = 1 AND NOW() <= disc.`valid_until` WHERE pd.`product_id` = ?",
          [cartItems[i].product_id]
        );
        cartItems[i].discounts =
          productDiscounts != null && productDiscounts.length > 0
            ? productDiscounts
            : [];
      }

      return resolve(cartItems);
    });
  }

  return (obj = {
    createCartEntry,
    getCartItems,
  });
};

module.exports = { orderRepo };
