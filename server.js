import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import sequelize from './src/models/sequelize.js';
import createDatabaseIfNotExists from './src/config/createDatabase.js';

import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';

import errorHandler from './src/middlewares/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error Handler
app.use(errorHandler);

const init = async () => {
  await createDatabaseIfNotExists();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

init();