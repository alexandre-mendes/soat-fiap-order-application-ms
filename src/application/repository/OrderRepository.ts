import { Order } from "../../domain/entity/Order";

export interface OrderRepository {
    findAll(): Promise<Order[]>;
    findById(orderId: string): Promise<Order|undefined>;
    save(order: Order): Promise<Order>;
    
}