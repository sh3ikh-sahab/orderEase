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

export const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { customer_name, items } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Update order
    await order.update({ customer_name });

    // Remove existing items
    await OrderItem.destroy({ where: { order_id: orderId } });

    // Add new items
    const itemsWithOrder = items.map(item => ({ ...item, order_id: orderId }));
    await OrderItem.bulkCreate(itemsWithOrder);

    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Delete associated items first (if cascade not configured)
    await OrderItem.destroy({ where: { order_id: orderId } });

    // Delete the order
    await order.destroy();

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};
