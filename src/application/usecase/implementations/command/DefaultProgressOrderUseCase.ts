import { Order } from "../../../../domain/entity/Order";
import { DomainError } from "../../../../domain/error/DomainError";
import { OrderRepository } from "../../../repository/OrderRepository";
import { ProgressOrderUseCase } from "../../ProgressOrderUseCase";

export class DefaultProgressOrderUseCase implements ProgressOrderUseCase {

    constructor(private orderRepository: OrderRepository) {}

    async execute(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);

        if (!order)
            throw new DomainError('Pedido não encontrado.');

        if (order.paymentPending)
            throw new DomainError('Pedido com pagamento pendente.');

        order.progress();
        return await this.orderRepository.save(order);
    }
}