import { DefaultCostumerGateway } from '../../../src/infra/client/DefaultCostumerGateway';
import { HttpClient } from '../../../src/infra/client/httpclient/HttpClient';
describe('Testa consulta de cliente', () => {

    let defaultCostumerGateway: DefaultCostumerGateway;
    let mockCostumerHttpClient: jest.Mocked<HttpClient>;

    beforeEach(() => {
        mockCostumerHttpClient = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<HttpClient>;

        defaultCostumerGateway = new DefaultCostumerGateway(mockCostumerHttpClient);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve consultar cliente por id com sucesso', async () => {
        mockCostumerHttpClient.get.mockResolvedValue(Promise.resolve());

        await defaultCostumerGateway.findById('123');

        expect(mockCostumerHttpClient.get).toHaveBeenCalled();
    })
})