
import axios from 'axios';
import ProductTransaction from '../models/ProductTransaction.js';
import { Sequelize, Op } from 'sequelize';


export const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    await ProductTransaction.bulkCreate(transactions);

    res.json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error initializing database' });
  }
};

export const getTransactions = async (req, res) => {
    const { month, year = new Date().getFullYear(), search = '', page = 1, perPage = 10 } = req.query;
  
    const whereClause = {};
    

    if (month) {
      const monthNumber = new Date(Date.parse(`${month} 1, 2021`)).getMonth() + 1;  // Convert month to a number
  
      whereClause[Op.and] = [
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dateOfSale')), monthNumber),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dateOfSale')), year)
      ];
    }
  

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { price: { [Op.like]: `%${search}%` } },
      ];
    }
  
    try {
      const transactions = await ProductTransaction.findAll({
        where: whereClause,
        offset: (page - 1) * parseInt(perPage, 10),
        limit: parseInt(perPage, 10),
      });
  
      const totalCount = await ProductTransaction.count({ where: whereClause });
      const totalPages = Math.ceil(totalCount / perPage);
  
      if (page > totalPages) {
        return res.status(400).json({ error: 'Page number exceeds total pages' });
      }
  
      const totalSaleAmount = await ProductTransaction.sum('price', { where: whereClause });
      const totalSoldItems = await ProductTransaction.count({
        where: { ...whereClause, sold: true },
      });
  
      const totalNotSoldItems = await ProductTransaction.count({
        where: { ...whereClause, sold: false },
      });
  
      res.json({
        transactions,
        totalCount,
        totalPages,
        statistics: {
          totalSaleAmount: totalSaleAmount || 0, 
          totalSoldItems,
          totalNotSoldItems,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  };
  