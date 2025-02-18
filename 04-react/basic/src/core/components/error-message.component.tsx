import { Container, Typography } from "@mui/material";

export const ErrorMessage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" color="error">
        ❌ Oops! Something went wrong. Please try again later.
      </Typography>
    </Container>
  );
};
