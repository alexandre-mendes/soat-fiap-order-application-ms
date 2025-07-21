import { Order } from "../../domain/entity/Order";


export interface ProgressOrderUseCase {
    execute(id: string): Promise<Order>;
}