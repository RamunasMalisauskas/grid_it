import React, { useCallback } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar, setErrorMsg } from "../../state/actions";
import { addToBoard } from "../../apis";
import { StateType } from '../../types/types'
import { Input, PrimaryButton, SupportButton, Subtitle } from '../'
import { sideBarState, log } from "../../constants/stateConstants"

interface SideBarProps {
    open: string
}

export const SideBarMenu: React.FC = () => {
    const dispatch = useDispatch()
    const randomColor = require("randomcolor");
    const { canvasPosition } = useSelector((state: StateType) => state.canvaState);
    const { errorMsg, sideBar } = useSelector((state: StateType) => state.appState);
    const { userName, loginStatus } = useSelector((state: StateType) => state.userState);

    const handleBarState = () => dispatch(setSideBar(sideBar === sideBarState.close ? sideBarState.open : sideBarState.close))

    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        if (!e) return
        if (!canvasPosition) return
        e.preventDefault()

        const { target: {
            class: { value: className },
            number: { value: number },
            data: { value: data },
            info: { value: info }
        } } = e

        if (className.length > 0 && number.length > 0 && data.length > 0) {
            dispatch(setErrorMsg(""))
            addToBoard({
                userName: userName,
                userColor: randomColor(),
                x: canvasPosition.x + parseInt(number),
                y: canvasPosition.y + parseInt(number),
                cellData: {
                    className: className,
                    value: parseInt(data),
                    info: info,
                },
            });
        } else {
            dispatch(setErrorMsg("Please enter required info to add a cell"))
        }

    }, [userName, randomColor, canvasPosition, dispatch])

    return (
        <SideBlock open={sideBar}>
            {loginStatus === log.in && <>
                <SideBarContainer>
                    <SupportButton onClick={handleBarState}>
                        {sideBar === sideBarState.close ? "menu" : "x"}
                    </SupportButton>

                    {sideBar === sideBarState.open && <>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                name="class"
                                placeholder="...class one"
                                label="enter class name"
                            />
                            <Input
                                type="number"
                                name="number"
                                placeholder="1... 2... 3..."
                                label="enter cell number"
                            />
                            <Input
                                type="number"
                                name="data"
                                placeholder="...123"
                                label="enter cell value"
                            />
                            <Input
                                type="text"
                                name="info"
                                placeholder="optional"
                                label="extra info"
                            />
                            <PrimaryButton type="submit">
                                add cell
                         </PrimaryButton>
                        </form>

                        <Subtitle>
                            {errorMsg}
                        </Subtitle>
                    </>
                    }
                </SideBarContainer>
            </>
            }
        </SideBlock >
    );
}

const SideBlock = styled.div<SideBarProps>`
 position: absolute;
 top: 0;
 left:  ${({ open }) => open === sideBarState.open ? "0" : "-200px"};
 height: 100%; 
 background: ${({ open }) => open === sideBarState.open ? "rgba(104, 104, 104, 0.3)" : "rgba(0, 0, 0, 0)"}; 
 transition: all ease-in-out 0.3s;
`

const SideBarContainer = styled.div`
 padding: 15px;
 margin: 0 auto;
 width: 285px;
 text-align: right;
`