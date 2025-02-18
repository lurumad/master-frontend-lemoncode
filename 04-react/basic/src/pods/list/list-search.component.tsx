import { Grid2, TextField, Button } from "@mui/material";

interface ListSearchProps {
  listState: {
    organization: string;
  };
  setListState: (state: { organization: string }) => void;
  onSearch: () => void;
}

export const ListSearch = (props: ListSearchProps) => {
  const { listState, setListState, onSearch } = props;

  return (
    <Grid2 container spacing={2} component="div">
      <Grid2 component="div" size={{ xs: 12, md: 10 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users"
          sx={{ mb: 3 }}
          size="small"
          value={listState.organization}
          onChange={(e) =>
            setListState({ ...listState, organization: e.target.value })
          }
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </Grid2>
      <Grid2 component="div">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSearch}
        >
          Search
        </Button>
      </Grid2>
    </Grid2>
  );
};
