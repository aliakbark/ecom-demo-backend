const { productRepo } = require("./product-repo");
const { orderRepo } = require("./order-repo");
const allRepo = (dbConn) => {
  console.log("All repositories connected");

  return {
    productRepo,
    orderRepo,
  };
};

const connect = async (dbConn) => {
  // if (dbConn) {
  const repo = allRepo(dbConn);
  return repo;
  // } else {
  //   console.log("DB Connection not established!");
  // }
};

module.exports = Object.assign({}, { connect });
