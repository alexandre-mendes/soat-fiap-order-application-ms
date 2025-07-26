import { OrderRepository } from "../../application/repository/OrderRepository";
import { Order, OrderItem, Status } from "../../domain/entity/Order";
import { DBCriteria, DBOperation, DBQuery, IDatabase } from "./dynamo/IDatabase";
import { IOrder } from "./dynamo/OrderDynamoDatabase";

export class DefaultOrderRepository implements OrderRepository {

    constructor(private database: IDatabase<IOrder>) { }

    async findAll(): Promise<Order[]> {
        const query = new DBQuery();
        query.add(new DBCriteria('paymentPending', false, DBOperation.EQUALS));
        query.add(new DBCriteria('status', 'FINALIZADO', DBOperation.NOT_EQUALS));
        query.orderBy('createdAt', 'asc');
        const orders = await this.database.findAllByQuery(query);
        return orders.map(this.parseToEntity);
    }

    async findById(orderId: string): Promise<Order | undefined> {
        const order = await this.database.findById(orderId);

        if (order)
            return this.parseToEntity(order);
        return undefined;
    }

    async save(order: Order): Promise<Order> {
        const db = this.parseToDB(order);

        let saved = null;

        if (db.id)
            saved = await this.database.update(db);
        else
            saved = await this.database.save(db);

        return this.parseToEntity(saved as IOrder);
    }

    private parseToEntity(db: IOrder): Order {
        const items = db.items.map(i => new OrderItem(i.product, i.quantity, i.observation));

        const entity = new Order(db.client, items);
        entity.id = db.id;
        entity.createdAt = new Date(db.createdAt);
        entity.status = db.status as Status;
        entity.number = db.number;
        entity.paymentPending = db.paymentPending;
        return entity;
    }

    private parseToDB(entity: Order): IOrder {
        return {
            id: entity.id,
            number: entity.number,
            client: entity.client,
            items: entity.items.map(i => {
                return {
                    product: {
                        id: i.product.id as string,
                        name: i.product.name,
                        price: i.product.price,
                    },
                    quantity: i.quantity,
                    observation: i.observation,
                }
            }),
            total: entity.total,
            paymentPending: entity.paymentPending,
            status: entity.status,
            createdAt: entity.createdAt?.toISOString()
        } as IOrder;
    }
}