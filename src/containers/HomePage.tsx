import React from "react";
import {
  LoginMenu,
  SideBarMenu,
  Grid,
  ClassMenu,
  WelcomeModal,
} from "../components";

export const HomePage: React.FC = () => {
  return (
    <>
      <WelcomeModal />

      <LoginMenu />

      <ClassMenu />

      <Grid />

      <SideBarMenu />
    </>
  );
};
