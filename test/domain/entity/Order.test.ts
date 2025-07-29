import { Order, OrderItem, Status } from "../../../src/domain/entity/Order"
import { CostumerVO } from "../../../src/domain/vo/CostumerVO"
import { ProductVO } from "../../../src/domain/vo/ProductVO"

describe('Testa criação de pedido', () => {

    const costumer: CostumerVO = { id: '123', name: 'Alexandre' }
    const product: ProductVO = { id: '123', name: 'Sanduba', price: 22.5 };
    const orderItem = new OrderItem(product, 2, 'Sem obs');

    test('Deve criar um pedido com sucesso', () => {


        const order = new Order(costumer, [orderItem])

        expect(order.number).toBeDefined();
        expect(order.createdAt).toBeDefined();
        expect(order.client).toEqual(costumer);
        expect(order.items[0]).toEqual(orderItem);
        expect(order.total).toEqual(45);
        expect(order.paymentPending).toEqual(true);
    })

    test('Deve aprovar o pagamento do pedido', () => {
        const order = new Order(costumer, [orderItem])
        order.paymentApproved();

        expect(order.paymentPending).toEqual(false);
        expect(order.status).toEqual(Status.RECEIVED);
    })

    test('Deve progredir o status do pedido', () => {
        const order = new Order(costumer, [orderItem])
        order.paymentApproved();

        order.progress();
        expect(order.status).toEqual(Status.IN_PREPARATION);

        order.progress();
        expect(order.status).toEqual(Status.READY);

        order.progress();
        expect(order.status).toEqual(Status.FINALIZED);
    })

    test('Deve retornar o tempo de espera do pedido', () => {
        const order = new Order(costumer, [orderItem]);
        order.createdAt = new Date('2025-07-01T21:09:33.467Z');

        expect(order.waitingTime).toBeDefined();
    })

    test('Não deve criar pedido sem itens', () => {
        expect(() => new Order(costumer, [])).toThrow('O pedido não pode ser finalizado sem itens.');
    })

    test('Não deve criar pedido com produto invalido', () => {
        expect(() => new Order(costumer, [new OrderItem({} as ProductVO, 2, 'Sem obs')])).toThrow('Informe um produto válido.');
    })

    test('Não deve criar pedido com quantidade invalido', () => {
        expect(() => new Order(costumer, [new OrderItem(product, 0, 'Sem obs')])).toThrow('Informe uma quantidade válida para o produto Sanduba.');
    })

})