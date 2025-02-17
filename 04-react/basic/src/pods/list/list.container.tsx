import { useQuery } from "@tanstack/react-query";
import { Container, Typography, TextField, Button, Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { useListState } from "@/core/list-state";
import { Spinner } from "@/core/components";
import { GithubMemberApi, Member } from "./list.model";
import { Pagination } from "./pagination.component";
import { MemberList } from "./list.component";

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
          <MemberList members={members} />
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
