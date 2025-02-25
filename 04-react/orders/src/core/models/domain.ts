import { OrderItemApi, OrderStatusApi, SupplierOrderApi } from "./api";

export enum OrderItemStatus {
  Valid = "Valid",
  Pending = "Pending",
}

export interface OrderItem {
  id: number;
  description: string;
  amount: number;
  status: OrderItemStatus;
}

export interface SupplierOrder {
  id: number;
  supplier: string;
  date: string;
  items: OrderItem[];
  validPercentage: number;
  totalAmount: number;
}

export class OrderItemFactory {
  build(arg: OrderItemApi): OrderItem {
    return {
      id: arg.id,
      description: arg.description,
      amount: arg.amount,
      status: mapOrderStatus(arg.status),
    };
  }
}

export class SupplierOrderFactory {
  constructor(private orderItemFactory: OrderItemFactory) { }

  build(arg: SupplierOrderApi): SupplierOrder {
    const items = arg.items.map((item) => this.orderItemFactory.build(item));
    const validPercentage = calculateValidPercentage(items);
    return {
      id: arg.id,
      supplier: arg.supplier,
      date: arg.date,
      items: items,
      validPercentage,
      totalAmount: calculateTotalAmount(items),
    };
  }
}

function mapOrderStatus(status: OrderStatusApi): OrderItemStatus {
  switch (status) {
    case OrderStatusApi.Valid:
      return OrderItemStatus.Valid;
    case OrderStatusApi.Pending:
      return OrderItemStatus.Pending;
    default:
      return null;
  }
}

export const calculateTotalAmount = (items: OrderItem[]): number => {
  return items.reduce((acc, item) => acc + item.amount, 0);
}

export const calculateValidPercentage = (items: OrderItem[]): number => {
  if (!items.length) return 0;
  const itemsValidated = items.filter(
    (item) => item.status === OrderItemStatus.Valid
  ).length;
  return (itemsValidated / items.length) * 100;
}


