import React from "react";
import { SideBar, LoginHeader, Grid } from '../containers'

export const HomePage: React.FC = () => {
  return (
    <>
      <LoginHeader />

      <Grid />

      <SideBar />
    </>
  );
};

