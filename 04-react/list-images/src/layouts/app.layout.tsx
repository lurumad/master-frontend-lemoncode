import { Cart } from "@/core/components/cart.component";
import { Grid2 } from "@mui/material";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 component="div" size={{ xs: 9 }}>
        {children}
      </Grid2>
      <Grid2 component="div" size={{ xs: 3 }}>
        <Cart />
      </Grid2>
    </Grid2>
  );
};
