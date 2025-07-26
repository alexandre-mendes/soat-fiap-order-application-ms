import { Order } from "../../domain/entity/Order";


export interface FindAllOrdersUseCase {
    execute(): Promise<OutputList>;
}

export interface OutputList {
    ready: Order[],
    received: Order[],
    inPreparation: Order[]
}