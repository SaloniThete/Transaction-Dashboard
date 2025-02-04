import { DataTypes } from 'sequelize';
export default {
  up: async (queryInterface) => {
    await queryInterface.createTable('ProductTransactions', {
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
        allowNull: true,
      },
      dateOfSale: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ProductTransactions');
  },
};
