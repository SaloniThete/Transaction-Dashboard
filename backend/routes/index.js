import express from 'express';
import transactionsRoutes from './transactions.js';  // Import routes from transactions.js

const router = express.Router();

router.use('/api/transactions', transactionsRoutes); // Prefix all routes with /api/transactions

export default router;
