import { NextFunction, Router } from 'express';
import { orderController } from '../config/di-config';
import { errorHandler } from './errorHandler';

const orderRouter = Router();

orderRouter.post('/orders/checkout',        errorHandler(orderController.checkout.bind(orderController)));
orderRouter.get('/orders',                  errorHandler(orderController.findAll.bind(orderController)));
orderRouter.put('/orders/:id/progress',     errorHandler(orderController.progress.bind(orderController)));
orderRouter.put('/orders/:id/payment',      errorHandler(orderController.payment.bind(orderController)))
orderRouter.get('/orders/:id/payment-info', errorHandler(orderController.paymentDetail.bind(orderController)));

export default orderRouter;