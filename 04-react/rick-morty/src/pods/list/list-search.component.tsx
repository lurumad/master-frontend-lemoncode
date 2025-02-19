import { Grid2, TextField } from "@mui/material";

interface ListSearchProps {
  setName: (name: string) => void;
  setPage: (page: number) => void;
}

export const ListSearch = ({ setName, setPage }: ListSearchProps) => {
  return (
    <Grid2 container spacing={2} component="div">
      <Grid2 component="div" size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search characters"
          sx={{ mb: 3 }}
          size="small"
          defaultValue=""
          onChange={(e) => {
            setPage(1);
            setName(e.target.value);
          }}
        />
      </Grid2>
    </Grid2>
  );
};
