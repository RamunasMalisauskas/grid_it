import React, { useEffect } from "react";
import { LoginMenu, SideBarMenu, Grid, ClassMenu } from "../components";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/actions";
import { storageItems, log } from "../types/types";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const localStatus = sessionStorage.getItem(storageItems.status);

  const userLoginStatus = () => {
    if (!localStatus) return;
    if (localStatus === log.in) {
      dispatch(setLogin(localStatus));
    }
  };

  useEffect(() => userLoginStatus());

  return (
    <>
      <LoginMenu />

      <ClassMenu />

      <Grid />

      <SideBarMenu />
    </>
  );
};
