import { CircularProgress, Container, Typography } from "@mui/material";

export const Spinner = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", textAlign: "center" }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Container>
  );
};
