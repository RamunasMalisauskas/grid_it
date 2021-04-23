import React, { useEffect } from "react";
import { SideBar, LoginHeader, Grid } from '../containers'
import { useDispatch } from "react-redux";
import { setLogin, setUserName } from "../state/actions";
import { log, localStorageItems } from '../constants/stateConstants'

export const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const localName = localStorage.getItem(localStorageItems.name)
  const localStatus = localStorage.getItem(localStorageItems.status)

  const userLoginStatus = () => {
    if (!localStatus) return
    if (localStatus === log.in) {
      dispatch(setLogin(localStatus))
      dispatch(setUserName(localName))
    }
  }

  useEffect(() => userLoginStatus())

  return (
    <>
      <LoginHeader />

      <Grid />

      <SideBar />
    </>
  );
};

