import { Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig.js'; // Config file with DB details

const sequelize = new Sequelize(dbConfig);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

export default sequelize;
