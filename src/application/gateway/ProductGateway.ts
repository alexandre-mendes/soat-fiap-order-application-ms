import { ProductVO } from "../../domain/vo/ProductVO";

export interface ProductGateway {
    findById(productId: string): Promise<ProductVO>;
}