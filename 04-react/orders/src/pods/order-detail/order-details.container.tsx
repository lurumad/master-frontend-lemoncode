import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  calculateTotalAmount,
  calculateValidPercentage,
  OrderItem,
  OrderItemApiFactory,
  OrderItemFactory,
  OrderItemStatus,
  SupplierOrder,
  SupplierOrderApiFactory,
  SupplierOrderFactory,
} from "@/core/models";
import { ErrorMessage, Spinner } from "@/core/components";
import { Box, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { OrderItemsList } from "./order-items-list.component";
import { useNavigate } from "react-router-dom";
import { OrderDetails } from "./order-details.component";

interface DetailContainerProps {
  id: number;
}

export const DetailContainer = ({ id }: DetailContainerProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateOrder = useUpdateOrder();
  const { data: order, isLoading, isError } = useGetOrderDetails(id);
  const onChangeStatus = useChangeOrderItemStatus();
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[]>([]);

  const onAmountChange = useCallback(
    (orderItem: OrderItem) => {
      queryClient.setQueryData<SupplierOrder>(["order-details", id], (prev) => {
        if (!prev) return prev;
        orderItem.status = OrderItemStatus.Pending;
        const updatedItems = prev.items.map((item) =>
          item.id === orderItem.id ? orderItem : item
        );

        return {
          ...prev,
          validPercentage: calculateValidPercentage(updatedItems),
          totalAmount: calculateTotalAmount(updatedItems),
          items: updatedItems,
        };
      });
    },
    [id, queryClient]
  );

  const onSelectedChange = useCallback(
    (orderItemsId: OrderItem["id"][]) => {
      if (!order) return;
      setSelectedOrderItems(
        orderItemsId.map(
          (itemId) => order.items.find((item) => item.id === itemId)!
        )
      );
    },
    [order]
  );

  const onSend = (order: SupplierOrder) => {
    updateOrder.mutate(order);
    navigate("/");
  };

  useEffect(() => {
    setSelectedOrderItems([]);
  }, [order]);

  return (
    <Container>
      {isError && <ErrorMessage />}
      {isLoading && <Spinner />}
      {!isLoading && !isError && (
        <Container sx={{ mt: 2 }}>
          <Box mt={4}>
            <OrderDetails
              order={order}
              selectedOrderItems={selectedOrderItems}
              onChangeStatus={onChangeStatus}
              onSend={onSend}
            />
          </Box>
          <Box mt={4}>
            <OrderItemsList
              orderItems={order?.items}
              selectedOrderItems={selectedOrderItems}
              onSelectedChange={onSelectedChange}
              onAmountChange={onAmountChange}
            />
          </Box>
        </Container>
      )}
    </Container>
  );
};

const useGetOrderDetails = (id: number) => {
  return useQuery<SupplierOrder>({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const response = await fetch(`http://api.acme.com/orders/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return supplierOrderFactory.build(await response.json());
    },
  });
};

const useUpdateOrder = () => {
  return useMutation({
    mutationFn: async (order: SupplierOrder) => {
      const response = await fetch(`http://api.acme.com/orders/${order.id}`, {
        method: "PUT",
        body: JSON.stringify(supplierOrderApiFactory.build(order)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return supplierOrderFactory.build(await response.json());
    },
  });
};

const useChangeOrderItemStatus = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (
      id: SupplierOrder["id"],
      status: OrderItemStatus,
      selectedOrderItems: OrderItem[]
    ) => {
      queryClient.setQueryData<SupplierOrder>(["order-details", id], (prev) => {
        if (!prev) return prev;
        const updatedItems = prev.items.map((item) =>
          selectedOrderItems.find((selectedItem) => selectedItem.id === item.id)
            ? { ...item, status }
            : item
        );

        return {
          ...prev,
          validPercentage: calculateValidPercentage(updatedItems),
          items: updatedItems,
        };
      });
    },
    [queryClient]
  );
};

const supplierOrderFactory = new SupplierOrderFactory(new OrderItemFactory());
const supplierOrderApiFactory = new SupplierOrderApiFactory(
  new OrderItemApiFactory()
);
