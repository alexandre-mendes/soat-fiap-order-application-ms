import { ProductGateway } from "../../application/gateway/ProductGateway";
import { ProductVO } from "../../domain/vo/ProductVO";

export class DefaultProductGateway implements ProductGateway {
    
    findById(productId: string): Promise<ProductVO> {
        throw new Error("Method not implemented.");
    }
    
}