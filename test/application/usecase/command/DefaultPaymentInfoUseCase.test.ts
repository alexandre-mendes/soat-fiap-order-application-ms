import { OrderRepository } from "../../../../src/application/repository/OrderRepository";
import { DefaultPaymentInfoUseCase } from "../../../../src/application/usecase/implementations/command/DefaultPaymentInfoUseCase";
import { PaymentInfoUseCase } from "../../../../src/application/usecase/PaymentInfoUseCase";
import { Order } from "../../../../src/domain/entity/Order";

describe('Testa busca de informação de pagamento do pedido', () => {

    let paymentInfoUseCase: PaymentInfoUseCase;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<OrderRepository>;
    
        paymentInfoUseCase = new DefaultPaymentInfoUseCase(mockOrderRepository);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve trazer informações de pagamento do pedido com sucesso', async () => {
        mockOrderRepository.findById.mockResolvedValue({} as Order)

        const result = await paymentInfoUseCase.execute('123');

        expect(result).toBeDefined();
        expect(mockOrderRepository.findById).toHaveBeenCalled();
    })
})