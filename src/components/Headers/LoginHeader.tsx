import React from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName, setLoginMenu } from "../../state/actions";
import { PrimaryButton, SupportButton, Input, Paragraph } from "../../components";
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

type NavPropsType = {
        open: boolean
}


export const LoginHeader = () => {
        const dispatch = useDispatch()
        const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
        const loginMenu = useSelector((state: BoardDataState) => state.appData.loginMenu)
        const userName = useSelector((state: BoardDataState) => state.appData.name)
        console.log(loginMenu)

        const handleLogin = (name: string, login: string): void => {
                dispatch(setUserName(name));
                dispatch(setLogin(login))
                localStorage.setItem("userName", name);
                localStorage.setItem("login", login);
        };

        return (<Nav open={loginMenu}>

                {loginStatus === "loggedOut" && <>

                        <form onSubmit={(e: React.SyntheticEvent): void => {
                                e.preventDefault()
                                handleLogin(userName, "loggedIn")

                        }}>
                                <ControlBlock>
                                        <Input
                                                type="text"
                                                name="enter your user name"
                                                value={userName}
                                                onChange={(e) => dispatch(setUserName(e.target.value))}
                                        />
                                </ControlBlock>

                                <SupportButton type="submit" onClick={() => dispatch(setLoginMenu(false))} >
                                        login
                                                </SupportButton>
                        </form>

                </>

                }

                {loginStatus === "loggedIn" && <>
                        <PrimaryButton onClick={() => {
                                handleLogin("", "loggedOut")
                                dispatch(setLoginMenu(true))
                        }}>
                                logout
                                </PrimaryButton>
                        <Paragraph>user: {userName}</Paragraph>
                </>

                }
        </Nav>
        );
}

const Nav = styled.div<NavPropsType>`
text-align: center;
position: absolute;
z-index: 1;
left: ${({ open }) => open ? "50%" : ""};
right: ${({ open }) => open ? "" : "0%"};
top: ${({ open }) => !open ? "0px" : "-115px"};
opacity: ${({ open }) => open ? "1" : "0"};
transform: translate(-50%, 0);
padding: 15px;
opacity:1;
transition: all ease-in-out 0.3s;
`

const ControlBlock = styled.div`
margin-top: 115px;
`