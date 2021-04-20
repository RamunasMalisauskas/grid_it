import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName, setLoginMenu } from "../../state/actions";
import { PrimaryButton, SupportButton, Input } from "../../components";
import { CellDataType } from '../../apis/get'

type BoardDataState = {
        appData: {
                name: string
                sideBarState: string
                login: string
                loginMenu: boolean
                canvasData: CellDataType[]
        }
}



export const LoginHeader = () => {
        const dispatch = useDispatch()
        const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
        const loginMenu = useSelector((state: BoardDataState) => state.appData.loginMenu)
        const userName = useSelector((state: BoardDataState) => state.appData.name)

        const [name, setName] = useState(userName)

        const handleLogin = (name: string, login: string): void => {
                dispatch(setLoginMenu(!loginMenu))
                dispatch(setUserName(name));
                dispatch(setLogin(login))
                localStorage.setItem("userName", name);
                localStorage.setItem("login", login);
        };

        return (
                <Nav>

                        {loginStatus === "loggedOut" && <>
                                {!loginMenu &&
                                        <SupportButton onClick={() => dispatch(setLoginMenu(!loginMenu))}>
                                                login
                                        </SupportButton>
                                }

                                {loginMenu &&
                                        <form onSubmit={(e: React.SyntheticEvent): void => {
                                                e.preventDefault()
                                                handleLogin(name, "loggedIn")
                                        }}>
                                                <Input
                                                        type="text"
                                                        name="enter your user name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                />
                                                <SupportButton type="submit" >
                                                        login
                                                </SupportButton>
                                        </form>
                                }
                        </>

                        }

                        {loginStatus === "loggedIn" && <>
                                <PrimaryButton onClick={() => {
                                        handleLogin("", "loggedOut")
                                }}>
                                        logout
                                </PrimaryButton>
                                <h3>user: {name}</h3>
                        </>

                        }


                </Nav>

        );
}

const Nav = styled.div`
text-align: center;
position: absolute;
z-index: 1;
left: 50%;
transform: translate(-50%, 0);
padding: 15px;
`