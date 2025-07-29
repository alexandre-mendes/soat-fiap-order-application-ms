import { OrderRepository } from "../../../../src/application/repository/OrderRepository";
import { DefaultProgressOrderUseCase } from "../../../../src/application/usecase/implementations/command/DefaultProgressOrderUseCase";
import { ProgressOrderUseCase } from "../../../../src/application/usecase/ProgressOrderUseCase";
import { Order } from "../../../../src/domain/entity/Order";

describe('Testa progresso de status do pedido', () => {

    let progressOrderUseCase: ProgressOrderUseCase;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<OrderRepository>;
    
        progressOrderUseCase = new DefaultProgressOrderUseCase(mockOrderRepository);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve realizar progresso do pedido com sucesso', async () => {
        mockOrderRepository.findById.mockResolvedValue({paymentPending: false, progress: jest.fn()} as any as Order)

        await progressOrderUseCase.execute('123');

        expect(mockOrderRepository.findById).toHaveBeenCalled();
        expect(mockOrderRepository.save).toHaveBeenCalled();
    })
})