import express from 'express';
import { getTransactions, initializeDatabase } from '../controllers/transactionsController.js'; // Controller import

const router = express.Router();

// Initialize DB with third-party data
router.get('/initialize', initializeDatabase);

// Get transactions with search, pagination, and statistics
router.get('/combined-data', getTransactions);

export default router;
