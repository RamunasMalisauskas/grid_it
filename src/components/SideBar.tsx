import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../state/actions";
import { addToBoard } from "../apis";
import { CellDataType } from '../apis/get'
import { Input, PrimaryButton, SupportButton } from '../components'

type BoardDataState = {
    appData: {
        color: string
        name: string
        sideBarState: string
        canvasData: CellDataType[]
    }
}
type StageType = string

type SideBarProps = {
    open: string
}

export const SideBar: React.FC = () => {
    const dispatch = useDispatch()
    const randomColor = require("randomcolor");
    const sideBar = useSelector((state: BoardDataState) => state.appData.sideBarState);

    const [x, setX] = useState<StageType>("");
    const [y, setY] = useState<StageType>("");
    const [data, setData] = useState<StageType>("");
    const [text, setText] = useState<StageType>("");

    return (
        <SideBlock open={sideBar}>
            <SideBarContainer>
                {sideBar === "open" && <>
                    <Input type="number" name="enter your cordiantions" value={x} onChange={(e) => setX(e.target.value)} />
                    <Input type="number" value={y} onChange={(e) => setY(e.target.value)} />
                    <Input type="number" name="enter main value" value={data} onChange={(e) => setData(e.target.value)} />
                    <Input type="text" placeholder="enter aditional info" value={text} onChange={(e) => setText(e.target.value)} />

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

                    <SupportButton onClick={() => dispatch(setSideBar("close"))}>X
                    </SupportButton>
                </>}

                {sideBar === "close" &&
                    <SupportButton onClick={() => dispatch(setSideBar("open"))}>X
                    </SupportButton>}
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
 width: 270px;
 text-align: right;
`