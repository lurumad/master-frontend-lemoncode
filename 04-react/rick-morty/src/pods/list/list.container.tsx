import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "./list.model";
import {
  Container,
  Typography,
  Grid2,
  Pagination,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { ErrorMessage, Spinner } from "@/core/components";
import { ListSearch } from "./list-search.component";
import { CharacterList } from "./list.component";

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

      <ListSearch setName={setName} setPage={setPage} />

      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <>
          {response.info.pages === 0 && (
            <Card
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  No results found
                </Typography>
              </CardContent>
            </Card>
          )}
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
          <CharacterList characters={response.results} />
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

      if (response.status === 404) {
        return { info: { pages: 0 }, results: [] };
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
};
