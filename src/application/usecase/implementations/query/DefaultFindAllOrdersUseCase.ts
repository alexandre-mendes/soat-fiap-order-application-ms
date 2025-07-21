import { Status } from "../../../../domain/entity/Order";
import { OrderRepository } from "../../../repository/OrderRepository";
import { FindAllOrdersUseCase, OutputList } from "../../FindAllOrdersUseCase";

export class DefaultFindAllOrdersUseCase implements FindAllOrdersUseCase {

    constructor(private orderRepository: OrderRepository) { }

    async execute(): Promise<OutputList> {
        const orders = await this.orderRepository.findAll()

        const ready = orders.filter(o => Status.READY === o.status);
        const received = orders.filter(o => Status.RECEIVED === o.status);
        const inPreparation = orders.filter(o => Status.IN_PREPARATION === o.status);

        return { ready, received, inPreparation }
    }

}