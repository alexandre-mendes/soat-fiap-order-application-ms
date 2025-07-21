import { CostumerVO } from "../../domain/vo/CostumerVO";

export interface CostumerGateway {
    findById(clientId: string): Promise<CostumerVO>;

}