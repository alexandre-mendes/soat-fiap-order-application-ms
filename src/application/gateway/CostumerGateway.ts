import { CostumerVO } from "../../domain/vo/CostumerVO";

export interface CostumerGateway {
    findById(costumerId: string): Promise<CostumerVO>;

}