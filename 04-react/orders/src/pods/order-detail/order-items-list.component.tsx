import { OrderItem } from "@/core/models";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";

interface OrderItemsListProps {
  orderItems: OrderItem[];
  selectedOrderItems: OrderItem[];
  onSelectedChange: (orderItemsId: OrderItem["id"][]) => void;
  onAmountChange: (orderItem: OrderItem) => void;
}

export const OrderItemsList = ({
  orderItems,
  selectedOrderItems,
  onSelectedChange,
  onAmountChange,
}: OrderItemsListProps) => {
  const onRowSelectionModelChange = (model: GridRowSelectionModel) => {
    onSelectedChange(model as OrderItem["id"][]);
  };

  const processRowUpdate = (updatedRow: OrderItem) => {
    onAmountChange(updatedRow);
    return updatedRow;
  };

  return (
    <DataGrid
      rows={orderItems ?? []}
      columns={buildColumns()}
      pageSizeOptions={[5, 100]}
      checkboxSelection
      rowSelectionModel={selectedOrderItems.map((item) => item.id)}
      onRowSelectionModelChange={onRowSelectionModelChange}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(error) => console.error("ERROR", error)}
    />
  );
};

const buildColumns = (): GridColDef[] => [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  {
    field: "amount",
    headerName: "Total (€)",
    type: "number",
    flex: 1,
    editable: true,
  },
];
