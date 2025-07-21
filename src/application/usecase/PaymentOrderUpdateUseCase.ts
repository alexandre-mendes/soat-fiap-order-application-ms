export interface PaymentOrderUpdateUseCase {

    execute(id: string, approved: boolean): Promise<void>;
}