import { Grid2 } from "@mui/material";
import { Character } from "./list.model";
import { CharacterListItem } from "./list-item.component";

interface CharacterListProps {
  characters: Character[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {characters.map((character, index) => (
          <Grid2 component="div" size={{ xs: 12, md: 6 }} key={index}>
            <CharacterListItem character={character} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};
