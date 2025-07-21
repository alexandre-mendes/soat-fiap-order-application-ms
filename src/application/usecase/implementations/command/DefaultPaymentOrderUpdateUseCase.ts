import { DomainError } from "../../../../domain/error/DomainError";
import { OrderRepository } from "../../../repository/OrderRepository";
import { PaymentOrderUpdateUseCase } from "../../PaymentOrderUpdateUseCase";

export class DefaultPaymentOrderUpdateUseCase implements PaymentOrderUpdateUseCase {

    constructor(private orderRepository: OrderRepository) { }

    async execute(id: string, approved: boolean): Promise<void> {
        const order = await this.orderRepository.findById(id);

        if (!order)
            throw new DomainError('Pedido não localizado')

        if (approved) {
            order?.paymentApproved();
            this.orderRepository.save(order);
        }
    }

}