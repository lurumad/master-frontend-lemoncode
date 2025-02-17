import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/core/cart";
import { Spinner } from "@/core/components";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";

export const KittiesContainer = () => {
  const { cartItems, updateCart } = useCart();
  const { data: kittiesData, isLoading, isError } = useGetCats();
  const [kitties, setKitties] = useState<PictureInfoViewModel[]>([]);

  useEffect(() => {
    if (kittiesData) {
      setKitties(kittiesData);
    }
  }, [kittiesData]);

  useEffect(() => {
    setKitties((prevKitties) =>
      prevKitties.map((prevKitty) => ({
        ...prevKitty,
        selected: cartItems.some((item) => item.id === prevKitty.id),
      }))
    );
  }, [cartItems]);

  const handleBuy = (kitty: PictureInfoViewModel) => {
    updateCart({
      id: kitty.id,
      name: kitty.title,
      pictureUrl: kitty.picUrl,
    });
  };

  return (
    <Container maxWidth="md">
      {isLoading && <Spinner />}
      {isError && <Typography>Error loading kitties</Typography>}
      {!isLoading && !isError && (
        <>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {kitties.map((kitty) => (
              <Grid2 component="div" size={{ xs: 12, md: 3 }} key={kitty.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={kitty.picUrl}
                    alt={kitty.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{kitty.title}</Typography>
                    <Checkbox
                      checked={kitty.selected}
                      onChange={() => handleBuy(kitty)}
                    />
                    Buy
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </>
      )}
    </Container>
  );
};

const useGetCats = () => {
  return useQuery<PictureInfoViewModel[]>({
    queryKey: ["kitties"],
    queryFn: async () => {
      const response = await fetch(`https://api.images.com/kitties`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json().then((data) => {
        return data.map((kitty: PictureInfo) => ({
          id: kitty.id,
          picUrl: kitty.picUrl,
          title: kitty.title,
          selected: false,
        }));
      });
    },
  });
};
