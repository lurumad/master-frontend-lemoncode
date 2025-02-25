import { delay, http, HttpResponse } from "msw";
import { OrderItemApi, OrderStatusApi, SupplierOrderApi } from "@/core/models";

const getRandomStatus = (): OrderStatusApi =>
  Math.random() > 0.5 ? OrderStatusApi.Valid : OrderStatusApi.Pending;

const generateOrderItems = (orderId: number): OrderItemApi[] => {
  const itemCount = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: itemCount }, (_, itemIndex) => ({
    id: itemIndex + 1 * 101,
    description: `Item ${itemIndex + 1} of Order ${orderId}`,
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    status: getRandomStatus(),
  }));
};

export const orders: SupplierOrderApi[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: index + 1,
    supplier: `Supplier ${index + 1}`,
    date: new Date(
      2025,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
      .toISOString()
      .split("T")[0],
    items: generateOrderItems(index + 1),
  })
);

export const handlers = [
  http.get("http://api.acme.com/orders", async () => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    return HttpResponse.json(orders);
  }),
  http.get("http://api.acme.com/orders/:id", async ({ params }) => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    const order = orders.find((order) => order.id === Number(params.id));
    if (!order) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(order);
  }),
  http.put("http://api.acme.com/orders/:id", async ({ params, request }) => {
    if (process.env.NODE_ENV !== "test") {
      await delay(200);
    }
    console.log("params", params);
    const body = (await request.json()) as SupplierOrderApi;

    const order = orders.find((order) => order.id === Number(params.id));

    if (!order) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const updatedOrder = { ...order, ...body };

    orders.splice(
      orders.findIndex((order) => order.id === updatedOrder.id),
      1,
      updatedOrder
    );

    return HttpResponse.json(body);
  }),
];
