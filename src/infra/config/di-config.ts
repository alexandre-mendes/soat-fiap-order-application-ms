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
import { AxiosHttpClient } from "../client/httpclient/AxiosHttpClient";
import { DefaultOrderRepository } from "../database/DefaultOrderRepository";
import { DynamoDb } from "../database/dynamo/DynamoConfig";
import { IDatabase } from "../database/dynamo/IDatabase";
import { IOrder, OrderDynamoDatabase } from "../database/dynamo/OrderDynamoDatabase";

/*
    Http Client
*/
const costumerHttpClient = new AxiosHttpClient(process.env.COSTUMER_BASE_URL || '');
const productHttpClient = new AxiosHttpClient(process.env.PRODUCT_BASE_URL || '')

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
const costumerGateway: CostumerGateway = new DefaultCostumerGateway(costumerHttpClient);
const productGateway: ProductGateway = new DefaultProductGateway(productHttpClient);


/*
    Use Cases
*/
const paymentOrderUpdateUseCase: PaymentOrderUpdateUseCase = new DefaultPaymentOrderUpdateUseCase(orderRepository);
const mercadoPagoGateway: MercadoPagoGateway = new DefaultMercadoPagoGateway(paymentOrderUpdateUseCase);
const checkoutOrderUseCase: CheckoutOrderUseCase = new DefaultCheckoutOrderUseCase(orderRepository, costumerGateway, productGateway, mercadoPagoGateway);
const findAllOrdersUseCase: FindAllOrdersUseCase = new DefaultFindAllOrdersUseCase(orderRepository);
const paymentInfoUseCase: PaymentInfoUseCase = new DefaultPaymentInfoUseCase(orderRepository);
const progressOrderUseCase: ProgressOrderUseCase = new DefaultProgressOrderUseCase(orderRepository);

/*
    Controllers
*/
const orderController = new OrderController(checkoutOrderUseCase, findAllOrdersUseCase, paymentInfoUseCase, paymentOrderUpdateUseCase, progressOrderUseCase);

export { orderController };
