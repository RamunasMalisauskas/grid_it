import React, { useCallback, useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName } from "../state/actions";
import { PrimaryButton, SupportButton, Input, Paragraph, HeaderLarge } from "../components";
import { log, localStorageItems } from '../constants/constants'
import { BoardDataState } from '../types/types'
import { auth } from '../firebase'

type NavPropsType = {
    loggedIn: boolean
}


export const LoginHeader = () => {
    const dispatch = useDispatch()
    const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
    const userName = useSelector((state: BoardDataState) => state.appData.name)
    const [error, setError] = useState('')

    const handleReg = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        if (!e) return
        e.preventDefault()
        const { target: {
            userName: { value: userName },
            email: { value: email },
            password: { value: pass },
            repPassword: { value: repPass }
        } } = e
        if (pass !== repPass) {
            setError("passwords are mistmatched")
            return
        } else {
            try {
                await auth.createUserWithEmailAndPassword(email, pass);
                dispatch(setLogin(log.in));
                dispatch(setUserName(userName));
                localStorage.setItem(localStorageItems.name, userName);
                localStorage.setItem(localStorageItems.status, log.in);
                setError('');
            } catch (e) {
                setError(e.message)
            }

        }
    }, [dispatch]);

    const handleLogin = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        if (!e) return
        e.preventDefault()
        const { target: {
            email: { value: email },
            password: { value: pass }
        } } = e
        try {
            await auth.signInWithEmailAndPassword(email, pass);
            dispatch(setLogin(log.in));
            localStorage.setItem(localStorageItems.name, userName);
            localStorage.setItem(localStorageItems.status, log.in);
            setError('');
        } catch (e) {
            setError(e.message)
        }

    }, [dispatch, userName]);

    const handleLogout = (async () => {
        try {
            await auth.signOut()
            dispatch(setLogin(log.out))
            setError('')
        } catch (e) {
            setError(e.message)
        }

    });

    const handleTableState = () => {
        dispatch(setLogin(loginStatus === log.reg ? log.out : log.reg))
        setError('')
    }

    return (<>
        <Nav loggedIn={loginStatus === log.in}>
            {loginStatus === log.reg && <>
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

                    <PrimaryButton onClick={handleTableState}>
                        Login
                    </PrimaryButton>
                </form>
                <Paragraph>
                    {error && error}
                </Paragraph>
            </>
            }

            {loginStatus === log.out && <>
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

                    <PrimaryButton onClick={handleTableState}>
                        Register
                    </PrimaryButton>
                </form>
                <Paragraph>
                    {error && error}
                </Paragraph>
                {!error &&
                    <HeaderLarge>
                        To use the application you have to login.
                        Register if you dont have an account.
                 </HeaderLarge>
                }
            </>
            }

            {loginStatus === log.in && <>
                <PrimaryButton onClick={handleLogout}>
                    logout
                </PrimaryButton>

                <Paragraph>
                    user: {userName}
                </Paragraph>
            </>
            }
        </Nav>
    </>);
}

const Nav = styled.div<NavPropsType>`
 text-align: center;
 position: absolute;
 z-index: 1;
 max-width: 30vw;
 right: ${({ loggedIn }) => loggedIn ? "0%" : "50%"};
 top: ${({ loggedIn }) => loggedIn ? "0" : "10vh"};
 transform: ${({ loggedIn }) => loggedIn ? "translate(0, 0)" : "translate(50%, 0)"}; 
 padding: 15px;
 transition: all ease-in-out 0.3s, top ease-in-out 0.3s 0.3s;
`