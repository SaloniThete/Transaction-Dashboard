import express from 'express';
import cors from 'cors';  // Import cors
import routes from './routes/index.js'; // Import all routes
import sequelize from './models/index.js';  // Import Sequelize DB connection

const app = express();
const port = 5000;

// CORS configuration to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173'  // Allow requests from this frontend domain
}));

// Middleware
app.use(express.json());

// Use the routes
app.use('/', routes);

// Sync Sequelize models with DB
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.log('Error syncing database: ', err));
