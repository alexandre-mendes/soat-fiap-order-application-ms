import { CostumerGateway } from "../../application/gateway/CostumerGateway";
import { CostumerVO } from "../../domain/vo/CostumerVO";
import { HttpClient } from "./httpclient/HttpClient";

export class DefaultCostumerGateway implements CostumerGateway {

    constructor(private costumerHttpClient: HttpClient) {}
    
    async findById(costumerId: string): Promise<CostumerVO> {
        return this.costumerHttpClient.get(`/costumers/${costumerId}`)
    }
}