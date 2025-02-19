import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Character } from "./list.model";

interface CharacterListItemProps {
  character: Character;
}

export const CharacterListItem = ({ character }: CharacterListItemProps) => {
  return (
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
        <Typography color={character.status === "Alive" ? "lightgreen" : "red"}>
          {character.status} - {character.species}
        </Typography>
        <Typography variant="body2" color="gray">
          Last known location:
        </Typography>
        <Typography variant="body1">{character.location.name}</Typography>
        <Typography variant="body2" color="gray" mt={1}>
          Gender:
        </Typography>
        <Typography variant="body1">{character.gender}</Typography>
      </CardContent>
    </Card>
  );
};
