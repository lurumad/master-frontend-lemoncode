import { useQuery } from "@tanstack/react-query";
import { User, GithubUserApi } from "./detail.model";
import {
  Card,
  Avatar,
  Typography,
  Box,
  CardContent,
  Container,
  CardMedia,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface DetailContainerProps {
  id: string;
}

export const DetailContainer = (props: DetailContainerProps) => {
  const { id } = props;
  const { data: member, isLoading, isError } = useGetDetailMember(id);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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

      {isError && (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <ErrorOutline sx={{ fontSize: 64, color: "error.main" }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We are sorry, we couldn't load the user information
          </Typography>
          <Button variant="contained" color="error" component={Link} to="/">
            Back to home
          </Button>
        </Paper>
      )}

      {!isLoading && !isError && (
        <Card
          sx={{
            width: 400,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="100"
              image="https://pngimg.com/uploads/github/github_PNG23.png"
              alt="Profile background"
            />
            <Avatar
              src={member?.avatar_url}
              alt="Profile Avatar"
              sx={{
                width: 80,
                height: 80,
                position: "absolute",
                left: "50%",
                bottom: 0,
                transform: "translate(-50%, 50%)",
                border: "3px solid white",
              }}
            />
          </Box>

          <CardContent sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {member?.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {member?.login}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {member?.bio}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {member?.public_repos}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Repositories
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {member?.followers}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Followers
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {member?.following}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Following
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                fullWidth
              >
                Back to Members
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

const useGetDetailMember = (id: string) => {
  return useQuery<User>({
    queryKey: ["member", id],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/user/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json().then((data: GithubUserApi) => {
        return {
          id: data.id.toString(),
          name: data.name,
          bio: data.bio,
          login: data.login,
          avatar_url: data.avatar_url,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        };
      });
    },
  });
};
