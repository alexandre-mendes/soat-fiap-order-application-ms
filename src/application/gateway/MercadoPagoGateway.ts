export interface MercadoPagoGateway {
    generateQrCode(id: string, total: number): Promise<void>;
}