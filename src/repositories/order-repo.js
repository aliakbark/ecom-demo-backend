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

  function removeAllProductsFromCart(conn, userId) {
    return new Promise(async (resolve, reject) => {
      await conn
        .query("DELETE FROM `cart_item` WHERE `user_id` = ?", [userId])
        .then((removeItemFromCartRes) => {
          return resolve({ user_id: userId });
        })
        .catch((err) => {
          return reject(err.text ?? err);
        });
    });
  }

  function getCartDetails(conn, userId) {
    return new Promise(async (resolve, reject) => {
      const cart = { cart_items: [], cart_discounts: [] };

      cart.cart_items = await conn
        .query(
          "SELECT ci.`user_id`, ci.`product_id`, prod.`title`, prod.`desc`, prod.`sku`, prod.`price`, ci.`quantity` FROM `cart_item` ci INNER JOIN `product` prod ON ci.`product_id` = prod.`id` AND prod.`is_active` = 1 WHERE ci.`user_id` = ?",
          [userId]
        )
        .catch((err) => {
          return reject(err.text ?? err);
        });

      for (let i = 0; i < cart.cart_items.length; i++) {
        let productDiscounts = await conn
          .query(
            "SELECT disc.`id`, disc.`promotion_type_id`, pt.title AS promotion_type, disc.`discount_type_id`, dt.`title` AS discount_type, disc.`discount_unit_id`, du.`title` AS discount_unit, disc.`discount_value`, disc.`valid_from`, disc.`valid_until`, disc.`order_value_unit_id`, ovu.`title` AS order_value_unit, disc.`min_order_value`, disc.`max_discount_amount` FROM `product_discount` pd INNER JOIN `discount` disc ON disc.`id` = pd.`discount_id` AND disc.`is_active` = 1 AND NOW() <= disc.`valid_until` LEFT JOIN `promotion_type` pt ON pt.`id` = disc.`promotion_type_id` LEFT JOIN `discount_type` dt ON dt.`id` = disc.`discount_type_id` LEFT JOIN `discount_unit` du ON du.`id` = disc.`discount_unit_id` LEFT JOIN `order_value_unit` ovu ON ovu.`id` = disc.`order_value_unit_id` WHERE pd.`product_id` = ?",
            [cart.cart_items[i].product_id]
          )
          .catch((err) => {
            return reject(err.text ?? err);
          });
        cart.cart_items[i].product_discounts =
          productDiscounts != null && productDiscounts.length > 0
            ? productDiscounts
            : [];
      }

      cart.cart_discounts = await conn
        .query(
          "SELECT disc.`id`, disc.`promotion_type_id`, pt.title AS promotion_type, disc.`discount_type_id`, dt.`title` AS discount_type, disc.`discount_unit_id`, du.`title` AS discount_unit, disc.`discount_value`, disc.`valid_from`, disc.`valid_until`, disc.`order_value_unit_id`, ovu.`title` AS order_value_unit, disc.`min_order_value`, disc.`max_discount_amount` FROM `discount` disc LEFT JOIN `promotion_type` pt ON pt.`id` = disc.`promotion_type_id` LEFT JOIN `discount_type` dt ON dt.`id` = disc.`discount_type_id` LEFT JOIN `discount_unit` du ON du.`id` = disc.`discount_unit_id` LEFT JOIN `order_value_unit` ovu ON ovu.`id` = disc.`order_value_unit_id` WHERE disc.`discount_type_id` = 2 AND disc.`is_active` = 1 AND NOW() <= disc.`valid_until`"
        )
        .catch((err) => {
          return reject(err.text ?? err);
        });

      return resolve(cart);
    });
  }

  return (obj = {
    createCartEntry,
    removeAllProductsFromCart,
    getCartDetails,
  });
};

module.exports = { orderRepo };
