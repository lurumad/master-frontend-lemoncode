import { Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export const NavigationTabs = () => {
  const location = useLocation();
  return (
    <Tabs value={location.pathname} sx={{ p: 2 }}>
      <Tab label="Kitties" component={Link} to="/kitties" value="/kitties" />
      <Tab label="Puppies" component={Link} to="/puppies" value="/puppies" />
    </Tabs>
  );
};
