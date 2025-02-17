import { useQuery } from "@tanstack/react-query";
import { GithubMemberApi, Member } from "./list.model";
import {
  Container,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid2,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListState } from "@/core/list-state";
import { Spinner } from "@/core/components";
import { Pagination } from "./pagination.component";

interface GetMembersRequest {
  organization: string;
  perPage: number;
  page: number;
}

export const ListContainer = () => {
  const PER_PAGE = 10;
  const { listState, setListState } = useListState();
  const [request, setRequest] = useState({
    organization: listState.organization,
    perPage: PER_PAGE,
    page: listState.page,
  });
  const { data: members, isLoading, isError } = useGetMembers(request);

  useEffect(() => {
    if (members?.length === PER_PAGE) {
      setListState({ ...request, count: request.page + 1 });
    } else {
      setListState({ ...request, count: request.page });
    }
  }, [members, request.page]);

  const onSearch = () => {
    setListState({
      ...listState,
      page: 1,
      count: members?.length === PER_PAGE ? 2 : 1,
    });
    setRequest({ ...request, page: 1, organization: listState.organization });
  };

  const onPaginationChange = (event: React.ChangeEvent, page: number) => {
    setRequest({ ...request, page });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Github Members of {listState.organization}
      </Typography>

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

      {isLoading && <Spinner />}
      {!isLoading && !isError && (
        <>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {members.map((member, index) => (
              <Grid2 component="div" size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 3,
                    ":hover": { cursor: "pointer" },
                  }}
                  component={Link}
                  to={`/detail/${member.id}`}
                >
                  <Avatar
                    src={member.avatar_url}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
                    <Typography
                      noWrap
                      sx={{
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                      variant="h6"
                    >
                      {member.login}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </>
      )}

      <Pagination
        count={listState.count}
        onChange={onPaginationChange}
        page={request.page}
      />
    </Container>
  );
};

const useGetMembers = ({ organization, perPage, page }: GetMembersRequest) => {
  return useQuery<Member[]>({
    queryKey: ["members", organization, page],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/orgs/${organization}/members?per_page=${perPage}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json().then((data: GithubMemberApi[]) => {
        return data.map((member) => ({
          id: member.id.toString(),
          login: member.login,
          avatar_url: member.avatar_url,
        }));
      });
    },
  });
};
