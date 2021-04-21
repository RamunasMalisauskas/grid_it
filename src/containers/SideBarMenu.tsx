import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../state/actions";
import { addToBoard } from "../apis";
import { BoardDataState } from '../types/types'
import { Input, PrimaryButton, SupportButton } from '../components'

interface SideBarProps {
    open: string
}

export const SideBar: React.FC = () => {
    const dispatch = useDispatch()
    const randomColor = require("randomcolor");
    const sideBar = useSelector((state: BoardDataState) => state.appData.sideBarState);

    const [x, setX] = useState<string>("");
    const [y, setY] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [text, setText] = useState<string>("");

    return (
        <SideBlock open={sideBar}>
            <SideBarContainer>
                <SupportButton onClick={() => dispatch(setSideBar(sideBar === "close" ? "open" : "close"))}>
                    {sideBar === "close" ? "menu" : "x"}
                </SupportButton>

                {sideBar === "open" && <>
                    <Input
                        type="number"
                        placeholder="X"
                        name="x"
                        label="enter your coordinations"
                        value={x}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setX(e.target.value)}
                    />

                    <Input
                        type="number"
                        name="y"
                        placeholder="Y"
                        value={y}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setY(e.target.value)}
                    />

                    <Input
                        type="number"
                        placeholder="...123"
                        name="value"
                        label="enter main value"
                        value={data}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData(e.target.value)}
                    />

                    <Input
                        type="text"
                        name="info"
                        placeholder="enter aditional info"
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    />

                    <PrimaryButton
                        onClick={() => {
                            addToBoard({
                                userName: "rami",
                                userColor: randomColor(),
                                x: parseInt(x),
                                y: parseInt(y),
                                cellData: { value: parseInt(data), info: text },
                            });
                        }}
                    >
                        add cell
                    </PrimaryButton>
                </>}

            </SideBarContainer>
        </SideBlock >
    );
}

const SideBlock = styled.div<SideBarProps>`
 position: absolute;
 top: 0;
 left:  ${({ open }) => open === "open" ? "0" : "-200px"};
 height: 100%; 
 background: ${({ open }) => open === "open" ? "rgba(104, 104, 104, 0.3)" : "rgba(0, 0, 0, 0)"}; 
 transition: all ease-in-out 0.3s;
`

const SideBarContainer = styled.div`
 padding: 15px;
 margin: 0 auto;
 width: 285px;
 text-align: right;
`