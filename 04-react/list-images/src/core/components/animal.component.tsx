import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/core/cart";
import { ErrorMessage, Spinner } from "@/core/components";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
} from "@mui/material";
import { useCallback } from "react";

const useGetAnimals = (type: string) => {
  return useQuery<PictureInfo[]>({
    queryKey: [type],
    queryFn: async () => {
      console.log(`https://api.images.com/${type}`);
      const response = await fetch(`https://api.images.com/${type}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
};

const AnimalCard = ({
  animal,
  isChecked,
  onToggle,
}: {
  animal: PictureInfo;
  isChecked: boolean;
  onToggle: () => void;
}) => (
  <Grid2 component="div" size={{ xs: 12, md: 3 }} key={animal.id}>
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={animal.picUrl}
        alt={animal.title}
      />
      <CardContent>
        <Typography variant="h6">{animal.title}</Typography>
        <Checkbox checked={isChecked} onChange={onToggle} />
        Buy
      </CardContent>
    </Card>
  </Grid2>
);

interface AnimalGridProps {
  type: string;
}

export const AnimalGrid = ({ type }: AnimalGridProps) => {
  const { cartItems, updateCart } = useCart();
  const { data: animals, isLoading, isError } = useGetAnimals(type);

  const handleBuy = useCallback(
    (animal: PictureInfo) => {
      updateCart({
        id: animal.id,
        name: animal.title,
        pictureUrl: animal.picUrl,
      });
    },
    [updateCart]
  );

  return (
    <Container maxWidth="md">
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              isChecked={cartItems.some((item) => item.id === animal.id)}
              onToggle={() => handleBuy(animal)}
            />
          ))}
        </Grid2>
      )}
    </Container>
  );
};
