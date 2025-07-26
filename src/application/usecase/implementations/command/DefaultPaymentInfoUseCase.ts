import { DomainError } from "../../../../domain/error/DomainError";
import { OrderRepository } from "../../../repository/OrderRepository";
import { PaymentInfoOutput, PaymentInfoUseCase } from "../../PaymentInfoUseCase";

export class DefaultPaymentInfoUseCase implements PaymentInfoUseCase {

    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: string): Promise<PaymentInfoOutput> {
                const order = await this.orderRepository.findById(orderId);
        
        if (!order)
            throw new DomainError('Pedido não localizado');

        return { id: order.id || '', number: order.number, approved: !order.paymentPending }
    }
    
}