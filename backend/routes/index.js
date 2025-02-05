import express from 'express';
import transactionsRoutes from './transactions.js';  

const router = express.Router();

router.use('/api/transactions', transactionsRoutes); 

export default router;
