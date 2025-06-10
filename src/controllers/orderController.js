import { Order, OrderItem } from '../models/index.js';

export const createOrder = async (req, res, next) => {
  try {
    const { customer_name, items } = req.body;
    const order = await Order.create({ customer_name });
    const itemsWithOrder = items.map(item => ({ ...item, order_id: order.id }));
    await OrderItem.bulkCreate(itemsWithOrder);
    res.status(201).json({ message: 'Order created', orderId: order.id });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: { model: OrderItem, as: 'items' }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
