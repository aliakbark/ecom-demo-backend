const env = process.env.NODE_ENV || "dev"; // 'prod' or 'dev' or 'test'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 4001,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    user: process.env.DEV_DB_USER || "root",
    password: process.env.DEV_DB_PASSWORD || "root",
    port: parseInt(process.env.DEV_DB_PORT) || 3306,
    database: process.env.DEV_DB_NAME || "ecom_demo_db",
    connectionLimit: process.env.DEV_DB_NAME || "ecom_demo_db",
  },
};

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 4001,
  },
  db: {
    host: process.env.TEST_DB_HOST || "localhost",
    user: process.env.TEST_DB_USER || "root",
    password: process.env.TEST_DB_PASSWORD || "root",
    port: parseInt(process.env.TEST_DB_PORT) || 3306,
    database: process.env.TEST_DB_NAME || "ecom_demo_db",
    connectionLimit: process.env.TEST_DB_NAME || "ecom_demo_db",
  },
};

const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT) || 4001,
  },
  db: {
    host: process.env.PROD_DB_HOST || "localhost",
    user: process.env.PROD_DB_USER || "root",
    password: process.env.PROD_DB_PASSWORD || "root",
    port: parseInt(process.env.PROD_DB_PORT) || 3306,
    database: process.env.PROD_DB_NAME || "ecom_demo_db",
    connectionLimit: process.env.PROD_DB_NAME || "ecom_demo_db",
  },
};

const config = Object.assign(
  {},
  {
    dev,
    test,
    prod,
  }
);

module.exports = config[env];
