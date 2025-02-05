import express from 'express';
import cors from 'cors';  
import routes from './routes/index.js'; 
import sequelize from './models/index.js';  

const app = express();
const port = 5000;


app.use(cors({
  origin: 'http://localhost:5173' 
}));


app.use(express.json());

app.use('/', routes);


sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.log('Error syncing database: ', err));
