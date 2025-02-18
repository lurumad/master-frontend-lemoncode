import { Pagination as MuiPagination, Grid2 } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent, page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { count, page } = props;

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }} justifyContent="center">
      <MuiPagination
        count={count}
        color="primary"
        onChange={props.onChange}
        page={page}
        showFirstButton
        showLastButton
      />
    </Grid2>
  );
};
