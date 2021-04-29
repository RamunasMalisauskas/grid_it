import React, { useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLogin,
  setUserName,
  setErrorMsg,
  setResetMenu,
} from "../../state/actions";
import { Subtitle, FormTemplate, EmptyButton } from "..";
import {
  StateType,
  log,
  storageItems,
  error,
  menuState,
} from "../../types/types";
import { auth, firestoreReg, firestoreLogin } from "../../firebase";
import {
  loginFormInputs,
  regFormInputs,
  passResetFomrInputs,
} from "../../utils/formData";
import { SupportButton } from "../buttons/SupportButton";

type NavPropsType = {
  loggedIn: boolean;
};

export const LoginMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorMsg, resetMenu } = useSelector(
    (state: StateType) => state.appState
  );
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
          await firestoreReg(email, pass, userName);
          dispatch(setLogin(log.in));
          dispatch(setUserName(userName));
          localStorage.setItem(storageItems.name, userName);
          sessionStorage.setItem(storageItems.status, log.in);
        } catch (e) {
          dispatch(setErrorMsg(e.message));
        } finally {
          dispatch(setErrorMsg(error.empty));
        }
      }
    },
    []
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
        await firestoreLogin(email, pass, userName);
        dispatch(setLogin(log.in));
        localStorage.setItem(storageItems.name, userName);
        sessionStorage.setItem(storageItems.status, log.in);
      } catch (e) {
        dispatch(setErrorMsg(e.message));
      } finally {
        dispatch(setErrorMsg(error.empty));
      }
    },
    []
  );

  const handleReset = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      if (!e) return;
      e.preventDefault();
      const {
        target: {
          email: { value: email },
          repEmail: { value: repEmail },
        },
      } = e;

      if (email !== repEmail) {
        dispatch(setErrorMsg(error.missedEmail));
        return;
      }
      try {
        if (email === repEmail) {
          await auth.sendPasswordResetEmail(email);
        }
      } catch (e) {
        dispatch(setErrorMsg(e.message));
      } finally {
        dispatch(setErrorMsg(error.passReset));
      }
    },
    []
  );

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setLogin(log.out));
      sessionStorage.setItem(storageItems.status, log.out);
      sessionStorage.removeItem("X");
    } catch (e) {
      dispatch(setErrorMsg(e.message));
    } finally {
      dispatch(setErrorMsg(error.empty));
    }
  };

  const handleTableState = () => {
    dispatch(setLogin(loginStatus === log.reg ? log.out : log.reg));
    dispatch(setErrorMsg(error.empty));
  };

  const handeRessetMenu = () => {
    dispatch(
      setResetMenu(
        resetMenu === menuState.close ? menuState.open : menuState.close
      )
    );
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

        {loginStatus === log.out && resetMenu === menuState.close && (
          <>
            <FormTemplate
              handleSubmit={handleLogin}
              inputs={loginFormInputs}
              buttonText="Login"
              supportBtn={true}
              handleClick={handleTableState}
              supportText="Register"
            />

            <EmptyButton onClick={handeRessetMenu}>
              forgot password?
            </EmptyButton>

            <Subtitle>{errorMsg}</Subtitle>

            {!errorMsg && (
              <Subtitle>
                To use the application you have to login. Register if you dont
                have an account.
              </Subtitle>
            )}
          </>
        )}

        {resetMenu === menuState.open && (
          <>
            <FormTemplate
              handleSubmit={handleReset}
              inputs={passResetFomrInputs}
              buttonText="Reset"
            />

            <EmptyButton onClick={handeRessetMenu}>go to login</EmptyButton>

            <Subtitle>{errorMsg}</Subtitle>
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
  color: ${({ theme }) => theme.colors.primary};
  padding: 5px 2px;
  margin: 5px 0;
  border-radius: ${({ theme }) => theme.size.s};
  font-family: ${({ theme }) => theme.fonts.family.support};
  font-size: ${({ theme }) => theme.fonts.size.large};
  font-weight: ${({ theme }) => theme.fonts.weigth.bold};
  text-transform: uppercase;
  transition: ${({ theme }) => theme.transition.allFast};
  overflow: hidden;
  &:hover {
    color: ${({ theme }) => theme.colors.light};
    cursor: pointer;
    transform: scale(1.05);
  }
`;
