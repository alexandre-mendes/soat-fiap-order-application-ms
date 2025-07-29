import { DefaultProductGateway } from '../../../src/infra/client/DefaultProductGateway';
import { HttpClient } from '../../../src/infra/client/httpclient/HttpClient';
describe('Testa consulta de produto', () => {

    let defaultProductGateway: DefaultProductGateway;
    let mockProductHttpClient: jest.Mocked<HttpClient>;

    beforeEach(() => {
        mockProductHttpClient = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<HttpClient>;

        defaultProductGateway = new DefaultProductGateway(mockProductHttpClient);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve consultar produto por id com sucesso', async () => {
        mockProductHttpClient.get.mockResolvedValue(Promise.resolve());

        await defaultProductGateway.findById('123');

        expect(mockProductHttpClient.get).toHaveBeenCalled();
    })
})