import { OrderItem, OrderItemStatus, SupplierOrder } from "./domain";

export interface SupplierOrderApi {
  id: number;
  supplier: string;
  date: string;
  items: OrderItemApi[];
}

export interface OrderItemApi {
  id: number;
  description: string;
  amount: number;
  status: OrderStatusApi;
}

export enum OrderStatusApi {
  Valid = "Valid",
  Pending = "Pending",
}

export class SupplierOrderApiFactory {
  constructor(private orderItemFactory: OrderItemApiFactory) { }

  build(arg: SupplierOrder): SupplierOrderApi {
    const items = arg.items.map((item) => this.orderItemFactory.build(item));
    return {
      id: arg.id,
      supplier: arg.supplier,
      date: arg.date,
      items: items
    };
  }
}

export class OrderItemApiFactory {
  build(arg: OrderItem): OrderItemApi {
    return {
      id: arg.id,
      description: arg.description,
      amount: arg.amount,
      status: mapOrderStatus(arg.status),
    };
  }
}

function mapOrderStatus(status: OrderItemStatus): OrderStatusApi {
  switch (status) {
    case OrderItemStatus.Valid:
      return OrderStatusApi.Valid;
    case OrderItemStatus.Pending:
      return OrderStatusApi.Pending;
    default:
      return null;
  }
}
