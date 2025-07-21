import { CostumerGateway } from "../../application/gateway/CostumerGateway";
import { CostumerVO } from "../../domain/vo/CostumerVO";

export class DefaultCostumerGateway implements CostumerGateway {
    
    findById(clientId: string): Promise<CostumerVO> {
        throw new Error("Method not implemented.");
    }
    
}