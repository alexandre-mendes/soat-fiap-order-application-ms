import { MercadoPagoGateway } from "../../application/gateway/MercadoPagoGateway";

export class DefaultMercadoPagoGateway implements MercadoPagoGateway {
    
    generateQrCode(id: string, total: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}