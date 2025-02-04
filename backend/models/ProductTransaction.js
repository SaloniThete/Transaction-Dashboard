


import { DataTypes } from 'sequelize';
import sequelize from './index.js';  // Sequelize instance

const ProductTransaction = sequelize.define('ProductTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('long'), 
  },
  
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  dateOfSale: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sold: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: DataTypes.STRING,
  },
});

export default ProductTransaction;