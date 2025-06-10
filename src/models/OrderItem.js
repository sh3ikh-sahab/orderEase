import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';

const OrderItem = sequelize.define('OrderItem', {
  product_name: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default OrderItem;
