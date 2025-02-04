const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the sequelize instance to be used in models
module.exports = sequelize;
