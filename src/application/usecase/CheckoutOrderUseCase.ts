import { Order } from "../../domain/entity/Order";


export interface CheckoutOrderUseCase {
    execute(input: Input): Promise<Order>;
}

export interface Input {
    clientId: string;
    items: ItemInput[];
}

interface ItemInput {
    productId: string; 
    quantity: number; 
    observation: string;
}