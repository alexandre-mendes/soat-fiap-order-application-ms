import { ProductGateway } from "../../application/gateway/ProductGateway";
import { ProductVO } from "../../domain/vo/ProductVO";
import { HttpClient } from "./httpclient/HttpClient";

export class DefaultProductGateway implements ProductGateway {

    constructor(private productHttpClient: HttpClient) {}
    
    findById(productId: string): Promise<ProductVO> {
        return this.productHttpClient.get(`/products/${productId}`);
    }
    
}