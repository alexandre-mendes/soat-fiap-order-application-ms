import { Order, OrderItem } from "../../../../domain/entity/Order";
import { DomainError } from "../../../../domain/error/DomainError";
import { CostumerGateway } from "../../../gateway/CostumerGateway";
import { MercadoPagoGateway } from "../../../gateway/MercadoPagoGateway";
import { ProductGateway } from "../../../gateway/ProductGateway";
import { OrderRepository } from "../../../repository/OrderRepository";
import { CheckoutOrderUseCase, Input } from "../../CheckoutOrderUseCase";

export class DefaultCheckoutOrderUseCase implements CheckoutOrderUseCase {

    constructor(private orderRepository: OrderRepository, private costumerGateway: CostumerGateway, 
        private productGateway: ProductGateway, private mercadoPagoGateway: MercadoPagoGateway) {}

    async execute(input: Input): Promise<Order> {
        const costumer = await this.costumerGateway.findById(input.clientId);

        if (input.clientId && !costumer)
            throw new DomainError('Não foi possivel localizar um cliente para o id informado.');

        if (!input.items || input.items.length === 0)
            throw new DomainError('Pedido inválido, informe ao menos um item.');

        const items = await Promise.all(input.items.map(async i => {
            const product = await this.productGateway.findById(i.productId);

            if (!product)
                throw new DomainError(`Não foi possivel localizar um produto para o id ${i.productId}.`);

            return new OrderItem(product, i.quantity, i.observation);
        }));

        const order = new Order(costumer, items);
        const created = await this.orderRepository.save(order);

        if (created?.id)
            this.mercadoPagoGateway.generateQrCode(created?.id, created.total);

        return created;
    }
}