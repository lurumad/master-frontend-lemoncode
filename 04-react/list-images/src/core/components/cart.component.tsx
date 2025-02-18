import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid2,
  CardMedia,
  Container,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem, useCart } from "../cart";
import { Link } from "react-router-dom";

interface CartProps {
  showButtons: boolean;
}

export const Cart = ({ showButtons }: CartProps) => {
  const { cartItems, updateCart, emptyCart } = useCart();

  const handleDelete = (item: CartItem) => {
    updateCart(item);
  };

  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 component="div">
          <ShoppingCartIcon />
        </Grid2>
        <Grid2 component="div">
          <Typography variant="h6">Cart</Typography>
        </Grid2>
      </Grid2>
      {cartItems.length === 0 && (
        <Typography sx={{ m: 1 }}>Your cart is empty</Typography>
      )}
      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{ display: "flex", alignItems: "center", p: 1, mt: 1 }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "5px",
            }}
            image={item.pictureUrl}
            alt={item.name}
          />

          <CardContent sx={{ flex: 1, textAlign: "center" }}>
            <Typography variant="body1">{item.name}</Typography>
          </CardContent>

          <IconButton onClick={() => handleDelete(item)}>
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}

      {showButtons && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{ background: "black" }}
            component={Link}
            to="/checkout"
          >
            Proceed to checkout
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderColor: "black", color: "black" }}
            onClick={() => emptyCart()}
          >
            Empty cart
          </Button>
        </Stack>
      )}
    </Container>
  );
};
