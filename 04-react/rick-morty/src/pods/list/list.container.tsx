import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "./list.model";
import {
  Container,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid2,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Margin } from "@mui/icons-material";

interface GetCharactersRequest {
  page: number;
  name: string;
}

export const ListContainer = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [value] = useDebounce(name, 500);
  const {
    data: response,
    isLoading,
    isError,
  } = useGetCharacters({ page, name: value });

  const onPaginationChange = (event: React.ChangeEvent, page: number) => {
    setPage(page);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        The Rick and Morty API
      </Typography>

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
              setName(e.target.value);
            }}
          />
        </Grid2>
      </Grid2>

      {isLoading && (
        <Container
          maxWidth="sm"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Container>
      )}
      {!isLoading && !isError && (
        <>
          <Grid2 container spacing={2} sx={{ mt: 2 }} justifyContent="center">
            <Pagination
              count={response.info.pages}
              onChange={onPaginationChange}
              page={page}
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Grid2>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {response.results.map((character, index) => (
              <Grid2 component="div" size={{ xs: 12, md: 6 }} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#282c34",
                    color: "white",
                  }}
                >
                  <CardMedia
                    component="img"
                    src={character.image}
                    sx={{ objectFit: "cover", height: 200, width: 200 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {character.name}
                    </Typography>
                    <Typography
                      color={
                        character.status === "Alive" ? "lightgreen" : "red"
                      }
                    >
                      {character.status} - {character.species}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      Last known location:
                    </Typography>
                    <Typography variant="body1">
                      {character.location.name}
                    </Typography>
                    <Typography variant="body2" color="gray" mt={1}>
                      Gender:
                    </Typography>
                    <Typography variant="body1">{character.gender}</Typography>
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

const useGetCharacters = ({ page, name }: GetCharactersRequest) => {
  return useQuery<ApiResponse>({
    queryKey: ["characters", page, name],
    queryFn: async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
};
