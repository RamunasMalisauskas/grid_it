import React from "react";
import { Grid, SideBar } from "../components";

export const HomePage: React.FC = () => {
  return (
    <>
      <Grid />

      <SideBar visible={false} />
    </>
  );
};
