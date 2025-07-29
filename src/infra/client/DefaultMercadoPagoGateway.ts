import { MercadoPagoGateway } from "../../application/gateway/MercadoPagoGateway";
import { PaymentOrderUpdateUseCase } from "../../application/usecase/PaymentOrderUpdateUseCase";

export class DefaultMercadoPagoGateway implements MercadoPagoGateway {

    constructor(private paymentOrderUpdateUseCase: PaymentOrderUpdateUseCase) {}
    
    async generateQrCode(id: string, total: number): Promise<void> {
        //Mock de chamada do Mercado Pago, aprova pedidos até 200 reais e reprova acima disso
        if (total > 200)
            await this.paymentOrderUpdateUseCase.execute(id, false);
        else
            await this.paymentOrderUpdateUseCase.execute(id, true);
    }
    
}