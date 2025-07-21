import { NextFunction, Router } from 'express';
import { costumerController } from '../config/di-config';

const costumerRouter = Router();

costumerRouter.get('/api/costumers/:cpf', costumerController.findByCpf.bind(costumerController));
costumerRouter.post('/api/costumers', costumerController.create.bind(costumerController));


export default costumerRouter;