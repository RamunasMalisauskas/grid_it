import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName, setErrorMsg } from "../../state/actions";
import { Subtitle, FormTemplate } from "..";
import { StateType, log, storageItems, error } from "../../types/types";
import { auth, firestoreReg, firestoreLogin } from "../../firebase";
import { loginFormInputs, regFormInputs } from "../../utils/formData";
import { SupportButton } from "../buttons/SupportButton";

type NavPropsType = {
  loggedIn: boolean;
};

export const LoginMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorMsg } = useSelector((state: StateType) => state.appState);
  const { userName, loginStatus } = useSelector(
    (state: StateType) => state.userState
  );

  const handleReg = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!e) return;
      e.preventDefault();
      const {
        target: {
          userName: { value: userName },
          email: { value: email },
          password: { value: pass },
          repPassword: { value: repPass },
        },
      } = e;
      if (pass !== repPass) {
        dispatch(setErrorMsg(error.missedPass));
        return;
      } else {
        try {
          dispatch(setLogin(log.in));
          dispatch(setUserName(userName));
          localStorage.setItem(storageItems.name, userName);
          sessionStorage.setItem(storageItems.status, log.in);
          dispatch(setErrorMsg(error.empty));
          firestoreReg(email, pass, userName);
        } catch (e) {
          dispatch(setErrorMsg(e.message));
        }
      }
    },
    [dispatch]
  );

  const handleLogin = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!e) return;
      e.preventDefault();
      const {
        target: {
          email: { value: email },
          password: { value: pass },
        },
      } = e;
      try {
        firestoreLogin(email, pass, userName);
        dispatch(setLogin(log.in));
        localStorage.setItem(storageItems.name, userName);
        sessionStorage.setItem(storageItems.status, log.in);
        dispatch(setErrorMsg(error.empty));
      } catch (e) {
        dispatch(setErrorMsg(e.message));
      }
    },
    [dispatch, userName]
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setLogin(log.out));
      sessionStorage.setItem(storageItems.status, log.out);
      sessionStorage.setItem("X", "");
      dispatch(setErrorMsg(error.empty));
    } catch (e) {
      dispatch(setErrorMsg(e.message));
    }
  };

  const handleTableState = () => {
    dispatch(setLogin(loginStatus === log.reg ? log.out : log.reg));
    dispatch(setErrorMsg(error.empty));
  };

  return (
    <>
      <LoginTable loggedIn={loginStatus === log.in}>
        {loginStatus === log.reg && (
          <>
            <FormTemplate
              handleSubmit={handleReg}
              inputs={regFormInputs}
              buttonText="Register"
              supportBtn={true}
              handleClick={handleTableState}
              supportText="Login"
            />

            <Subtitle>{errorMsg}</Subtitle>
          </>
        )}

        {loginStatus === log.out && (
          <>
            <FormTemplate
              handleSubmit={handleLogin}
              inputs={loginFormInputs}
              buttonText="Login"
              supportBtn={true}
              handleClick={handleTableState}
              supportText="Register"
            />

            <Subtitle>{errorMsg}</Subtitle>

            {!errorMsg && (
              <Subtitle>
                To use the application you have to login. Register if you dont
                have an account.
              </Subtitle>
            )}
          </>
        )}

        {loginStatus === log.in && (
          <>
            <SupportButton onClick={handleLogout}>logout</SupportButton>

            <UserButton onClick={() => history.push(`/user/${userName}`)}>
              user: {userName.charAt(0)}
            </UserButton>
          </>
        )}
      </LoginTable>
    </>
  );
};

const LoginTable = styled.div<NavPropsType>`
  text-align: center;
  position: absolute;
  z-index: 1;
  max-width: 285px;
  min-width: 135px;
  right: ${({ loggedIn }) => (loggedIn ? "0%" : "50%")};
  top: ${({ loggedIn }) => (loggedIn ? "0" : "10vh")};
  transform: ${({ loggedIn }) =>
    loggedIn ? "translate(0, 0)" : "translate(50%, 0)"};
  padding: 15px;
  transition: all ease-in-out 0.3s, top ease-in-out 0.3s 0.3s;
`;

const UserButton = styled.div`
  color: #d15585;
  padding: 5px 2px;
  margin: 5px 0;
  border-radius: 10px;
  font-family: "Reenie Beanie", cursive;
  font-size: 40px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all ease-in-out 0.1s;
  overflow: hidden;
  &:hover {
    color: white;
    background: #d15585;
    border: 2px solid #d15585;
    box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transform: scale(1.05);
  }
`;
