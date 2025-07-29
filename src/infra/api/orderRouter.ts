import { Router } from 'express';
import { orderController } from '../config/di-config';
import { errorHandler } from './errorHandler';

const orderRouter = Router();

orderRouter.post('/api/orders/checkout',        errorHandler(orderController.checkout.bind(orderController)));
orderRouter.get('/api/orders',                  errorHandler(orderController.findAll.bind(orderController)));
orderRouter.put('/api/orders/:id/progress',     errorHandler(orderController.progress.bind(orderController)));
orderRouter.put('/api/orders/:id/payment',      errorHandler(orderController.payment.bind(orderController)))
orderRouter.get('/api/orders/:id/payment-info', errorHandler(orderController.paymentDetail.bind(orderController)));

export default orderRouter;