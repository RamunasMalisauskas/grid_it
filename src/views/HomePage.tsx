import React from "react";
import { Grid, SideBar, LoginHeader } from "../components";

export const HomePage: React.FC = () => {
  return (
    <>
      <LoginHeader />

      <Grid />

      <SideBar />
    </>
  );
};

