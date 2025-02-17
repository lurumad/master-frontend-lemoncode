import { Grid2 } from "@mui/material";
import { Member } from "./list.model";
import { MemberListItem } from "./list-item.component";

interface MemberListProps {
  members: Member[];
}

export const MemberList = ({ members }: MemberListProps) => {
  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      {members.map((member, index) => (
        <Grid2 component="div" size={{ xs: 12, md: 4 }} key={index}>
          <MemberListItem member={member} />
        </Grid2>
      ))}
    </Grid2>
  );
};
