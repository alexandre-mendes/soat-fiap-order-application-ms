import { Order, OrderItem } from "../../../src/domain/entity/Order";
import { DefaultOrderRepository } from "../../../src/infra/database/DefaultOrderRepository";
import { IDatabase } from "../../../src/infra/database/dynamo/IDatabase";
import { IOrder } from "../../../src/infra/database/dynamo/OrderDynamoDatabase";



describe('Testa repository de cliente', () => {

    let defaultOrderRepository: DefaultOrderRepository;
    let database: jest.Mocked<IDatabase<IOrder>>;
    let order: IOrder = {
        id: '123',
        number: 1233,
        client: { id: 'abc', name: 'Joao', },
        items: [{
            product: { id: 'xpto', name: 'Pastel', price: 15 },
            quantity: 2,
            observation: '',
        }],
        total: 30,
        paymentPending: false,
        status: '',
        createdAt: '2025-07-29T21:30:56.415Z'
    }

    beforeEach(() => {
        database = {
            save: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
            findById: jest.fn(),
            findByQuery: jest.fn(),
            findAllByQuery: jest.fn(),
        } as jest.Mocked<IDatabase<IOrder>>;

        defaultOrderRepository = new DefaultOrderRepository(database);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve retornar listar pedidos', () => {
        database.findAllByQuery.mockResolvedValue([order]);

        defaultOrderRepository.findAll();

        expect(database.findAllByQuery).toHaveBeenCalled()
    })

    test('Deve retornar pedido por id', () => {
        database.findById.mockResolvedValue(order);

        defaultOrderRepository.findById('123');

        expect(database.findById).toHaveBeenCalled()
    });

    test('Deve salvar pedido', () => {
        database.save.mockResolvedValue(order);

        defaultOrderRepository.save({ items: [] } as any as Order);

        expect(database.save).toHaveBeenCalled()
    })
})