/*
Funcionalidade: Finalizar um Pedido

  Como um usuário da plataforma de pedidos
  Eu quero finalizar meu pedido
  Para que eu possa prosseguir com o pagamento

  Cenario: Finalização de pedido com sucesso para cliente existente
    Dado que um cliente com ID "cliente-123" está cadastrado no sistema
    E que os produtos "produto-A" e "produto-B" existem com os preços 10.00 e 5.50
    Quando eu tento finalizar um pedido para o cliente "cliente-123" com os itens:
      | produtoId    | quantidade | observacao       |
      | "produto-A"  | 2          | "Sem picles"     |
      | "produto-B"  | 1          | "Adicionar bacon"|
    Então o pedido deve ser salvo com sucesso
    E o valor total do pedido deve ser 25.50
    E o sistema deve gerar um QR Code de pagamento para o pedido
*/

import { CostumerGateway } from "../../../../src/application/gateway/CostumerGateway";
import { MercadoPagoGateway } from "../../../../src/application/gateway/MercadoPagoGateway";
import { ProductGateway } from "../../../../src/application/gateway/ProductGateway";
import { OrderRepository } from "../../../../src/application/repository/OrderRepository";
import { CheckoutOrderUseCase } from "../../../../src/application/usecase/CheckoutOrderUseCase";
import { DefaultCheckoutOrderUseCase } from "../../../../src/application/usecase/implementations/command/DefaultCheckoutOrderUseCase";
import { Order } from "../../../../src/domain/entity/Order";
import { CostumerVO } from "../../../../src/domain/vo/CostumerVO";
import { ProductVO } from "../../../../src/domain/vo/ProductVO";

describe('Testa finalização de um Pedido', () => {

    let mockOrderRepository: jest.Mocked<OrderRepository>;
    let mockCostumerGateway: jest.Mocked<CostumerGateway>;
    let mockProductGateway: jest.Mocked<ProductGateway>
    let mockMercadoPagoGateway: jest.Mocked<MercadoPagoGateway>

    let checkoutOrderUseCase: CheckoutOrderUseCase;

    beforeEach(() => {
        mockOrderRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        } as jest.Mocked<OrderRepository>;
        mockCostumerGateway = { findById: jest.fn() } as jest.Mocked<CostumerGateway>;
        mockProductGateway = { findById: jest.fn() } as jest.Mocked<ProductGateway>;
        mockMercadoPagoGateway = { generateQrCode: jest.fn() } as jest.Mocked<MercadoPagoGateway>;

        checkoutOrderUseCase = new DefaultCheckoutOrderUseCase(mockOrderRepository, mockCostumerGateway, mockProductGateway, mockMercadoPagoGateway);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Finalização de pedido com sucesso para cliente existente', async () => {
        const input = {
            clientId: 'clientIdTest',
            items: [{
                productId: 'productIdTest',
                quantity: 3,
                observation: 'Sem obs'
            }]
        }

        mockCostumerGateway.findById.mockResolvedValue({ id: input.clientId, name: 'Joao' } as CostumerVO);
        mockProductGateway.findById.mockResolvedValue({ id: input.items[0].productId, name: 'Produto Test', price: 12.5 } as ProductVO);
        mockOrderRepository.save.mockResolvedValue({ id: '123' } as Order)

        await checkoutOrderUseCase.execute(input);
        
        expect(mockCostumerGateway.findById).toHaveBeenCalled();
        expect(mockProductGateway.findById).toHaveBeenCalled();
        expect(mockOrderRepository.save).toHaveBeenCalled();
        expect(mockMercadoPagoGateway.generateQrCode).toHaveBeenCalled();
    });
});