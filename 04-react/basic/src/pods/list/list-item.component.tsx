import { Card, Avatar, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Member } from "./list.model";

interface MemberListItemProps {
  member: Member;
}

export const MemberListItem = ({ member }: MemberListItemProps) => {
  return (
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
      <Avatar src={member.avatar_url} sx={{ width: 50, height: 50, mr: 2 }} />
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
  );
};
