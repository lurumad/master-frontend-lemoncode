import { useQuery } from "@tanstack/react-query";
import { Container, Typography } from "@mui/material";
import { ErrorMessage } from "@/core/components";
import {
  OrderItemFactory,
  SupplierOrder,
  SupplierOrderApi,
  SupplierOrderFactory,
} from "@/core/models";
import { OrderList } from "./order-list.component";
import { useNavigate, useNavigation } from "react-router-dom";

export const ListContainer = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useGetOrders();

  const onOrderSelected = (order: SupplierOrder) => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <Container>
      {isError && <ErrorMessage />}
      <Container>
        <Typography variant="h4" gutterBottom>
          Supplier Orders
        </Typography>
        <OrderList
          orders={orders}
          isLoading={isLoading}
          onOrderSelected={onOrderSelected}
        />
      </Container>
    </Container>
  );
};

const useGetOrders = () => {
  return useQuery<SupplierOrder[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(`http://api.acme.com/orders`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response
        .json()
        .then((data: SupplierOrderApi[]) =>
          data.map((order) => supplierOrderFactory.build(order))
        );
    },
  });
};

const supplierOrderFactory = new SupplierOrderFactory(new OrderItemFactory());
