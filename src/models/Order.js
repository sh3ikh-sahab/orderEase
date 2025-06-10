import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const Order = sequelize.define('Order', {
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Order;
