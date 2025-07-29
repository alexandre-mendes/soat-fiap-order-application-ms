import { CheckoutOrderUseCase } from "../../../../src/application/usecase/CheckoutOrderUseCase";
import { FindAllOrdersUseCase, OutputList } from "../../../../src/application/usecase/FindAllOrdersUseCase";
import { PaymentInfoOutput, PaymentInfoUseCase } from "../../../../src/application/usecase/PaymentInfoUseCase";
import { PaymentOrderUpdateUseCase } from "../../../../src/application/usecase/PaymentOrderUpdateUseCase";
import { ProgressOrderUseCase } from "../../../../src/application/usecase/ProgressOrderUseCase";
import { Order } from "../../../../src/domain/entity/Order";
import { OrderController } from "../../../../src/infra/api/controller/OrderController";
import { Response, Request } from "express";

describe('Testa adição de produto', () => {

    let orderController: OrderController;

    let checkoutOrderUseCase: jest.Mocked<CheckoutOrderUseCase>
    let findAllOrdersUseCase: jest.Mocked<FindAllOrdersUseCase>
    let paymentInfoUseCase: jest.Mocked<PaymentInfoUseCase>
    let paymentOrderUpdateUseCase: jest.Mocked<PaymentOrderUpdateUseCase>
    let progressOrderUseCase: jest.Mocked<ProgressOrderUseCase>

    let mockResponse: jest.Mocked<Response>;

    beforeEach(() => {
        mockResponse = { json: jest.fn(), send: jest.fn(), status: jest.fn() } as unknown as jest.Mocked<Response>;
        mockResponse.json.mockReturnValue(mockResponse)
        mockResponse.send.mockReturnValue(mockResponse)

        checkoutOrderUseCase = { execute: jest.fn() } as jest.Mocked<CheckoutOrderUseCase>;
        findAllOrdersUseCase = { execute: jest.fn() } as jest.Mocked<FindAllOrdersUseCase>;
        paymentInfoUseCase = { execute: jest.fn() } as jest.Mocked<PaymentInfoUseCase>;
        paymentOrderUpdateUseCase = { execute: jest.fn() } as jest.Mocked<PaymentOrderUpdateUseCase>;
        progressOrderUseCase = { execute: jest.fn() } as jest.Mocked<ProgressOrderUseCase>;

        orderController = new OrderController(checkoutOrderUseCase, findAllOrdersUseCase, paymentInfoUseCase, paymentOrderUpdateUseCase, progressOrderUseCase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve executar criação do pedido com sucesso', async () => {
        checkoutOrderUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Order));

        await orderController.checkout({ body: {} } as Request, mockResponse);

        expect(checkoutOrderUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar listagem de pedidos com sucesso', async () => {
        findAllOrdersUseCase.execute.mockResolvedValueOnce(Promise.resolve({ ready: [{} as Order], inPreparation: [], received: [] } as OutputList));

        await orderController.findAll({ body: {} } as Request, mockResponse);

        expect(findAllOrdersUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar aprovação de pagamento do pedido com sucesso', async () => {
        paymentOrderUpdateUseCase.execute.mockResolvedValueOnce(Promise.resolve());

        await orderController.payment({ body: { approved: true }, params: { id: '123' } } as any as Request, mockResponse);

        expect(paymentOrderUpdateUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar consulta de detalhes de pagamento do peido com sucesso', async () => {
        paymentInfoUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as PaymentInfoOutput));

        await orderController.paymentDetail({ params: { id: '123' } } as any as Request, mockResponse);

        expect(paymentInfoUseCase.execute).toHaveBeenCalled();
    });

    test('Deve executar consulta de detalhes de pagamento do peido com sucesso', async () => {
        progressOrderUseCase.execute.mockResolvedValueOnce(Promise.resolve({} as Order));

        await orderController.progress({ params: { id: '123' } } as any as Request, mockResponse);

        expect(progressOrderUseCase.execute).toHaveBeenCalled();
    });
})