import React from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setUserName } from "../../state/actions";
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
        loggedIn: boolean

}


export const LoginHeader = () => {
        const dispatch = useDispatch()
        const loginStatus = useSelector((state: BoardDataState) => state.appData.login)
        const userName = useSelector((state: BoardDataState) => state.appData.name)
        console.log(loginStatus)

        const handleLogin = (name: string, login: string): void => {
                dispatch(setUserName(name));
                dispatch(setLogin(login))
                localStorage.setItem("userName", name);
                localStorage.setItem("login", login);
        };

        return (
                <Nav loggedIn={loginStatus === "loggedIn"}>

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

                                        <SupportButton type="submit"  >
                                                login
                                                </SupportButton>
                                </form>

                        </>

                        }

                        {loginStatus === "loggedIn" && <>
                                <PrimaryButton onClick={() => {
                                        handleLogin("", "loggedOut")
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
right: ${({ loggedIn }) => loggedIn ? "0%" : "50%"};
top: ${({ loggedIn }) => loggedIn ? "0" : "115px"};
transform: ${({ loggedIn }) => loggedIn ? "translate(0, 0)" : "translate(50%, 0)"};
padding: 15px;
opacity:1;
transition: all ease-in-out 0.3s;
`

const ControlBlock = styled.div`
margin-top: -115px;
`