import { ProgressBar } from "@/core/components";
import { SupplierOrder } from "@/core/models";
import { Box, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface OrderListProps {
  orders: SupplierOrder[];
  isLoading: boolean;
  onOrderSelected: (order: SupplierOrder) => void;
}

export const OrderList = ({
  orders,
  isLoading,
  onOrderSelected: onRowClick,
}: OrderListProps) => {
  return (
    <DataGrid
      getRowClassName={() => "clickable-row"}
      rows={orders ?? []}
      columns={buildColumns()}
      pageSizeOptions={[5, 100]}
      loading={isLoading}
      sx={{
        "& .clickable-row": {
          cursor: "pointer",
        },
      }}
      onRowClick={(params) => onRowClick(params.row as SupplierOrder)}
    />
  );
};

const buildColumns = (): GridColDef[] => [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "supplier", headerName: "Supplier", flex: 2 },
  { field: "date", headerName: "Date", flex: 1 },
  {
    field: "totalAmount",
    headerName: "Total (€)",
    flex: 1,
    type: "number",
  },
  {
    field: "validPercentage",
    headerName: "Valid %",
    flex: 1,
    renderCell: (params) => {
      const percentage = Number(params.value) || 0;
      return <ProgressBar value={percentage} width={100} />;
    },
  },
];
