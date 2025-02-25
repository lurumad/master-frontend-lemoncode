import { OrderItem, OrderItemStatus, SupplierOrder } from "@/core";
import { ProgressBar } from "@/core/components";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface OrderDetailsProps {
  order: SupplierOrder;
  selectedOrderItems: OrderItem[];
  onChangeStatus: (
    orderId: number,
    status: OrderItemStatus,
    orderItems: OrderItem[]
  ) => void;
  onSend: (order: SupplierOrder) => void;
}

export const OrderDetails = (props: OrderDetailsProps) => {
  const { order, selectedOrderItems, onChangeStatus, onSend } = props;
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Supplier Order: {order?.supplier}
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Number"
          variant="outlined"
          value={order?.id ?? ""}
          inputMode="numeric"
          disabled
        />
        <TextField
          label="Supplier"
          variant="outlined"
          value={order?.supplier ?? ""}
          sx={{ width: "500px" }}
          inputMode="text"
          disabled
        />
        <DatePicker
          label="Date"
          value={new Date(order?.date) ?? new Date()}
          onChange={() => {}}
          disabled
        />
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2} mt={2}>
        <TextField
          label="Total Amount"
          variant="outlined"
          value={order?.totalAmount ? order.totalAmount.toFixed(2) : ""}
          inputMode="numeric"
          disabled
        />
        <ProgressBar value={order?.validPercentage ?? 0} width={100} />
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="primary"
          disabled={order?.validPercentage !== 100}
          onClick={() => onSend(order)}
        >
          Send
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            onChangeStatus(order.id, OrderItemStatus.Valid, selectedOrderItems)
          }
          disabled={!selectedOrderItems.length}
        >
          Validate
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            onChangeStatus(
              order.id,
              OrderItemStatus.Pending,
              selectedOrderItems
            )
          }
          disabled={!selectedOrderItems.length}
        >
          Invalidate
        </Button>
      </Stack>
    </>
  );
};
