import React, { useCallback } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName } from "../../state/actions";
import { PrimaryButton, SupportButton, Input, Paragraph } from "../../components";
import { CellDataType } from '../../apis/get'
import { auth } from '../../firebase'

type BoardDataState = {
    appData: {
        name: string
        sideBarState: string
        login: string
        loginMenu: boolean
        canvasData: CellDataType[]
    }
}

type NavPropsType = {
    loggedIn: boolean
}


export const LoginHeader = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
    const userName = useSelector((state: BoardDataState) => state.appData.name)

    const handleReg = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault()
        const { target: {
            "user name": { value: userName },
            email: { value: email },
            password: { value: pass },
            "repPassword": { value: repPass }
        } } = e
        if (pass !== repPass) {
            return
        } else {
            auth.createUserWithEmailAndPassword(email, pass)
                .then(() => {
                    dispatch(setLogin("loggedIn"));
                    dispatch(setUserName(userName))
                })
                .catch(e => console.log(e))
        }
    }, [dispatch]);

    const handleLogin = useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault()
        const { target: {
            email: { value: email },
            password: { value: pass }
        } } = e
        auth.signInWithEmailAndPassword(email, pass)
            .then(() => dispatch(setLogin("loggedIn")))
            .catch(e => console.log(e))
    }, [dispatch]);

    const handleLogout = useCallback(() => { console.log("logout"); dispatch(setLogin("loggedOut")) }, [dispatch])

    const handleRegState = useCallback(() => { console.log("register"); dispatch(setLogin("Register")) }, [dispatch])

    return (
        <Nav loggedIn={loginStatus === "loggedIn"}>
            {loginStatus === "Register" &&
                <form onSubmit={handleReg}>
                    <Input
                        type="text"
                        name="user name"
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
                </form>
            }
            {loginStatus === "loggedOut" &&
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

            {loginStatus === "loggedIn" && <>
                <PrimaryButton onClick={handleLogout}>
                    logout
                </PrimaryButton>

                <Paragraph>
                    user: {userName}
                </Paragraph>
            </>
            }
        </Nav>
    );
}

const Nav = styled.div<NavPropsType>`
 text-align: center;
 position: absolute;
 z-index: 1;
 right: ${({ loggedIn }) => loggedIn ? "0%" : "50%"};
 top: ${({ loggedIn }) => loggedIn ? "0" : "10vh"};
 transform: ${({ loggedIn }) => loggedIn ? "translate(0, 0)" : "translate(50%, 0)"}; 
 padding: 15px;
 opacity:1;
 transition: all ease-in-out 0.3s, top ease-in-out 0.3s 0.3s;
`