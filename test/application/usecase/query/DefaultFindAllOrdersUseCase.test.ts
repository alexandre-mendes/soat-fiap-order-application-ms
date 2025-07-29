import { OrderRepository } from "../../../../src/application/repository/OrderRepository";
import { FindAllOrdersUseCase } from '../../../../src/application/usecase/FindAllOrdersUseCase';
import { DefaultFindAllOrdersUseCase } from "../../../../src/application/usecase/implementations/query/DefaultFindAllOrdersUseCase";
import { Order, Status } from "../../../../src/domain/entity/Order";

describe('Testa consulta de pedidos', () => {

    let findAllOrdersUseCase: FindAllOrdersUseCase;
    let mockOrderRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockOrderRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<OrderRepository>;
    
        findAllOrdersUseCase = new DefaultFindAllOrdersUseCase(mockOrderRepository);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar os pedidos com sucesso', async () => {
        mockOrderRepository.findAll.mockResolvedValue([{status: Status.READY} as any as Order])

        await findAllOrdersUseCase.execute();

        expect(mockOrderRepository.findAll).toHaveBeenCalled();
    })
})