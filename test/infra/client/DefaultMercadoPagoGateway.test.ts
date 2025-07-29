import { PaymentOrderUpdateUseCase } from "../../../src/application/usecase/PaymentOrderUpdateUseCase";
import { DefaultMercadoPagoGateway } from "../../../src/infra/client/DefaultMercadoPagoGateway";

describe('Testa integração com o mercado pago', () => {

    let defaultMercadoPagoGateway: DefaultMercadoPagoGateway;
    let mockPaymentOrderUpdateUseCase: jest.Mocked<PaymentOrderUpdateUseCase>;

    beforeEach(() => {
        mockPaymentOrderUpdateUseCase = {
            execute: jest.fn()
        } as jest.Mocked<PaymentOrderUpdateUseCase>;

        defaultMercadoPagoGateway = new DefaultMercadoPagoGateway(mockPaymentOrderUpdateUseCase);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve integrar com mercado pago com sucesso', () => {
        mockPaymentOrderUpdateUseCase.execute.mockResolvedValue(Promise.resolve());

        defaultMercadoPagoGateway.generateQrCode('123', 200);

        expect(mockPaymentOrderUpdateUseCase.execute).toHaveBeenCalled();
    })
})