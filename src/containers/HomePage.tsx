import React, { useEffect } from "react";
import { LoginMenu, SideBarMenu, Grid } from "../components";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/actions";
import { log, storageItems } from "../constants/stateConstants";

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

      <Grid />

      <SideBarMenu />
    </>
  );
};
