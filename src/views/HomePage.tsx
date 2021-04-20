import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName } from "../state/actions";
import { Grid, SideBar, PrimaryButton, SupportButton } from "../components";
import { CellDataType } from '../apis/get'

type BoardDataState = {
  appData: {
    color: string
    name: string
    sideBarState: string
    login: string
    canvasData: CellDataType[]
  }
}

export const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const login = useSelector((state: BoardDataState) => state.appData.login)

  const handleLogin = (name: string, login: string): void => {
    dispatch(setUserName(name));
    dispatch(setLogin(login))
    localStorage.setItem("userName", name);
    localStorage.setItem("login", login);
  };



  return (
    <>
      <Nav>
        {login === "loggedOut" &&

          <SupportButton onClick={() => {
            handleLogin("Rami", "loggedIn")
            console.log("loggin")
          }}>
            login
        </SupportButton>
        }

        {login === "loggedIn" &&
          <PrimaryButton onClick={() => {
            handleLogin("", "loggedOut")
            console.log("logout")
          }}>
            logout
          </PrimaryButton>
        }


      </Nav>
      <Grid />

      <SideBar />
    </>
  );
};

const Nav = styled.div`
text-align: center;
position: absolute;
z-index: 1;
left: 50%;
transform: translate(-50%, 0);
padding: 15px;
`