import React, { useCallback, useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName } from "../state/actions";
import { PrimaryButton, SupportButton, Input, Paragraph, HeaderLarge } from "../components";
import { BoardDataState } from '../types/types'
import { auth } from '../firebase'

type NavPropsType = {
    loggedIn: boolean
}

enum Log {
    in = "loggedIn",
    out = "loggedOut",
    reg = 'register'
}


export const LoginHeader = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
    const userName = useSelector((state: BoardDataState) => state.appData.name)
    const [error, setError] = useState("")

    const handleReg = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault()

        const { target: {
            userName: { value: userName },
            email: { value: email },
            password: { value: pass },
            repPassword: { value: repPass }
        } } = e
        if (pass !== repPass) {
            return
        } else {
            auth.createUserWithEmailAndPassword(email, pass)
                .then(() => {
                    dispatch(setLogin(Log.in));
                    dispatch(setUserName(userName))
                })
                .catch(e => console.log(e.message))
        }
    }, [dispatch]);

    const handleLogin = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault()
        const { target: {
            email: { value: email },
            password: { value: pass }
        } } = e
        auth.signInWithEmailAndPassword(email, pass)
            .then(() => dispatch(setLogin(Log.in)))
            .catch(e => setError(e.message))
    }, [dispatch]);

    const handleLogout = (() => {
        auth.signOut()
            .then(() => dispatch(setLogin(Log.out)))
            .catch(e => console.log(e.message))
    });

    const handleRegState = () => {
        dispatch(setLogin(Log.reg))
        setError("")
    }
    const handleLoginState = () => {
        dispatch(setLogin(Log.out))
        setError("")
    }

    return (<>
        <Nav loggedIn={loginStatus === Log.in}>
            {loginStatus === Log.reg &&
                <form onSubmit={handleReg}>
                    <Input
                        type="text"
                        name="userName"
                        label="enter user name"
                    />
                    <Input
                        type="email"
                        name="email"
                        label="enter your email"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="enter password"
                    />
                    <Input
                        type="password"
                        name="repPassword"
                        label="repeat password"
                    />
                    <SupportButton type="submit">
                        Register
                    </SupportButton>

                    <PrimaryButton onClick={handleLoginState}>
                        Login
                    </PrimaryButton>
                </form>
            }

            {loginStatus === Log.out &&
                <form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        name="email"
                        label="enter your email"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="enter password"
                    />
                    <SupportButton type="submit">
                        Login
                    </SupportButton>

                    <PrimaryButton onClick={handleRegState}>
                        Register
                    </PrimaryButton>
                </form>
            }

            {loginStatus === Log.in && <>
                <PrimaryButton onClick={handleLogout}>
                    logout
                </PrimaryButton>

                <Paragraph>
                    user: {userName}
                </Paragraph>
            </>
            }
        </Nav>

        {loginStatus === Log.out &&
            <CenterBlock>
                <Paragraph>
                    {error && error}
                </Paragraph>
                {!error &&
                    <HeaderLarge>
                        To use the application you have to login.
                        Register if you dont have an account.
                    </HeaderLarge>
                }
            </CenterBlock>
        }
    </>);
}

const Nav = styled.div<NavPropsType>`
 text-align: center;
 position: absolute;
 z-index: 1;
 right: ${({ loggedIn }) => loggedIn ? "0%" : "50%"};
 top: ${({ loggedIn }) => loggedIn ? "0" : "10vh"};
 transform: ${({ loggedIn }) => loggedIn ? "translate(0, 0)" : "translate(50%, 0)"}; 
 padding: 15px;
 transition: all ease-in-out 0.3s, top ease-in-out 0.3s 0.3s;
`
const CenterBlock = styled.div`
 position:absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 text-align: center;
 width: 30vw;
 z-index: 2;
`