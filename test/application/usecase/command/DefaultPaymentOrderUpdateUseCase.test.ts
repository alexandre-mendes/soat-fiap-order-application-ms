import { OrderRepository } from "../../../../src/application/repository/OrderRepository";
import { DefaultPaymentOrderUpdateUseCase } from "../../../../src/application/usecase/implementations/command/DefaultPaymentOrderUpdateUseCase";
import { PaymentOrderUpdateUseCase } from "../../../../src/application/usecase/PaymentOrderUpdateUseCase";
import { Order } from "../../../../src/domain/entity/Order";

describe('Testa atualização de pagamento do pedido', () => {

    let paymentInfoUseCase: PaymentOrderUpdateUseCase;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<OrderRepository>;
    
        paymentInfoUseCase = new DefaultPaymentOrderUpdateUseCase(mockOrderRepository);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve realizar atualização do pagamento do pedido com sucesso', async () => {
        mockOrderRepository.findById.mockResolvedValue({paymentPending: true, status: null, paymentApproved: jest.fn() } as any as Order)

        await paymentInfoUseCase.execute('123', true);

        expect(mockOrderRepository.findById).toHaveBeenCalled();
        expect(mockOrderRepository.save).toHaveBeenCalled();
    })
})