import React from "react";
import { LoginMenu, SideBarMenu, Grid, ClassMenu } from "../components";

export const HomePage: React.FC = () => {
  return (
    <>
      <LoginMenu />

      <ClassMenu />

      <Grid />

      <SideBarMenu />
    </>
  );
};
