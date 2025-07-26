import { Request, Response } from "express";
import { CheckoutOrderUseCase } from "../../../application/usecase/CheckoutOrderUseCase";
import { FindAllOrdersUseCase } from "../../../application/usecase/FindAllOrdersUseCase";
import { PaymentInfoOutput, PaymentInfoUseCase } from "../../../application/usecase/PaymentInfoUseCase";
import { PaymentOrderUpdateUseCase } from "../../../application/usecase/PaymentOrderUpdateUseCase";
import { ProgressOrderUseCase } from "../../../application/usecase/ProgressOrderUseCase";
import { Order } from "../../../domain/entity/Order";


export class OrderController {

    constructor(private checkoutOrderUseCase: CheckoutOrderUseCase, private findAllOrdersUseCase: FindAllOrdersUseCase,
        private paymentInfoUseCase: PaymentInfoUseCase, private paymentOrderUpdateUseCase: PaymentOrderUpdateUseCase,
        private progressOrderUseCase: ProgressOrderUseCase) { }

    async checkout(req: Request, res: Response) {
        const order = await this.checkoutOrderUseCase.execute(req.body);
        return res.json(this.parseToOutput(order)).status(201);
    }

    async findAll(_: Request, res: Response) {
        const outputList = await this.findAllOrdersUseCase.execute();
        const output = {
            ready: this.parseToOutputItem(outputList.ready),
            inPreparation: this.parseToOutputItem(outputList.inPreparation),
            received: this.parseToOutputItem(outputList.received) 
        };
        return res.json(output).status(200);
    }

    async progress(req: Request, res: Response) {
        const order = await this.progressOrderUseCase.execute(req.params.id);
        return res.json(this.parseToOutput(order)).status(200);
    }

    async payment(req: Request, res: Response) {
        await this.paymentOrderUpdateUseCase.execute(req.params.id, req.body.approved);
        return res.send().status(200);
    }

    async paymentDetail(req: Request, res: Response) {
        const info = await this.paymentInfoUseCase.execute(req.params.id);
        return res.json(this.parseOutputDetail(info)).status(200);
    }

    private parseToOutput(order: Order): Output {
        return { id: order.id, number: order.number };
    }

    private parseOutputDetail(info: PaymentInfoOutput) {
        return { id: info.id, number: info.number, approved: info.approved };
    }

    private parseToOutputItem(orders: Order[]): OutputItem[] {
        return orders.map(o => {
            return {
            id: o.id,
                number: o.number,
                clientName: o.client?.name,
                status: o.status,
                createdAt: o.createdAt,
                waitingTime: o.waitingTime
        } as OutputItem})
    }
}

export interface PaymentInput {
    approved: boolean
}

export interface Input {
    clientId: string;
    items: ItemInput[];
}

interface ItemInput {
    productId: string; 
    quantity: number; 
    observation: string;
}

export interface Output {
    id: string | undefined;
    number: number;
}

export interface OutputList {
    ready: OutputItem[],
    inPreparation: OutputItem[],
    received: OutputItem[]
}

export interface OutputItem {
    id: string,
    number: number,
    clientName: string,
    status: string,
    createdAt: Date
}

export interface PaymentDetailOutput {
    id: string,
    number: number,
    approved: boolean
}