import { CostumerGateway } from "../../application/gateway/CostumerGateway";
import { MercadoPagoGateway } from "../../application/gateway/MercadoPagoGateway";
import { ProductGateway } from "../../application/gateway/ProductGateway";
import { OrderRepository } from "../../application/repository/OrderRepository";
import { CheckoutOrderUseCase } from "../../application/usecase/CheckoutOrderUseCase";
import { FindAllOrdersUseCase } from "../../application/usecase/FindAllOrdersUseCase";
import { DefaultCheckoutOrderUseCase } from "../../application/usecase/implementations/command/DefaultCheckoutOrderUseCase";
import { DefaultPaymentInfoUseCase } from "../../application/usecase/implementations/command/DefaultPaymentInfoUseCase";
import { DefaultPaymentOrderUpdateUseCase } from "../../application/usecase/implementations/command/DefaultPaymentOrderUpdateUseCase";
import { DefaultProgressOrderUseCase } from "../../application/usecase/implementations/command/DefaultProgressOrderUseCase";
import { DefaultFindAllOrdersUseCase } from "../../application/usecase/implementations/query/DefaultFindAllOrdersUseCase";
import { PaymentInfoUseCase } from "../../application/usecase/PaymentInfoUseCase";
import { PaymentOrderUpdateUseCase } from "../../application/usecase/PaymentOrderUpdateUseCase";
import { ProgressOrderUseCase } from "../../application/usecase/ProgressOrderUseCase";
import { OrderController } from "../api/controller/OrderController";
import { DefaultCostumerGateway } from "../client/DefaultCostumerGateway";
import { DefaultMercadoPagoGateway } from "../client/DefaultMercadoPagoGateway";
import { DefaultProductGateway } from "../client/DefaultProductGateway";
import { DefaultOrderRepository } from "../database/DefaultOrderRepository";
import { DynamoDb } from "../database/dynamo/DynamoConfig";
import { IDatabase } from "../database/dynamo/IDatabase";
import { IOrder, OrderDynamoDatabase } from "../database/dynamo/OrderDynamoDatabase";



/*
    Dynamo
*/
const dynamo = new DynamoDb();

/*
    IDatabase - Dynamo
*/
const orderDatabase: IDatabase<IOrder> = new OrderDynamoDatabase(dynamo)

/*
    Repositories
*/
const orderRepository: OrderRepository = new DefaultOrderRepository(orderDatabase);

/*
    Gateway
*/
const costumerGateway: CostumerGateway = new DefaultCostumerGateway();
const productGateway: ProductGateway = new DefaultProductGateway();
const mercadoPagoGateway: MercadoPagoGateway = new DefaultMercadoPagoGateway();

/*
    Use Cases
*/
const checkoutOrderUseCase: CheckoutOrderUseCase = new DefaultCheckoutOrderUseCase(orderRepository, costumerGateway, productGateway, mercadoPagoGateway);
const findAllOrdersUseCase: FindAllOrdersUseCase = new DefaultFindAllOrdersUseCase(orderRepository);
const paymentInfoUseCase: PaymentInfoUseCase = new DefaultPaymentInfoUseCase(orderRepository);
const paymentOrderUpdateUseCase: PaymentOrderUpdateUseCase = new DefaultPaymentOrderUpdateUseCase(orderRepository);
const progressOrderUseCase: ProgressOrderUseCase = new DefaultProgressOrderUseCase(orderRepository);

/*
    Controllers
*/
const orderController = new OrderController(checkoutOrderUseCase, findAllOrdersUseCase, paymentInfoUseCase, paymentOrderUpdateUseCase, progressOrderUseCase);

export { orderController };
