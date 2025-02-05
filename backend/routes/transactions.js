import express from 'express';
import { getTransactions, initializeDatabase } from '../controllers/transactionsController.js'; 

const router = express.Router();

router.get('/initialize', initializeDatabase);

router.get('/combined-data', getTransactions);

export default router;
