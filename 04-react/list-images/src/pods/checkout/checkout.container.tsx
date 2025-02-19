import { Cart } from "@/core/components";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Input,
} from "@mui/material";

export const CheckoutContainer = () => {
  return (
    <Container sx={{ flex: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 component="div" size={{ xs: 6 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <h1>Card details</h1>
              <Input
                placeholder="Cardholder's name"
                sx={{ width: "100%", p: 1 }}
              />
              <Input placeholder="Card number" sx={{ width: "100%", p: 1 }} />
              <Grid2 container spacing={1}>
                <Grid2 component="div" size={{ xs: 6 }}>
                  <Input
                    placeholder="Expiration date"
                    sx={{ width: "100%", p: 1 }}
                  />
                </Grid2>
                <Grid2 component="div" size={{ xs: 6 }}>
                  <Input placeholder="CVV" sx={{ width: "100%", p: 1 }} />
                </Grid2>
              </Grid2>
              <div style={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                sx={{ width: "100%", background: "black", mt: 2 }}
              >
                Proceed to checkout
              </Button>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 component="div" size={{ xs: 6 }}>
          <Cart showButtons={false} />
        </Grid2>
      </Grid2>
    </Container>
  );
};
