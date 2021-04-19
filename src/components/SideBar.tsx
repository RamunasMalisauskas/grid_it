import React, { useState } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../state/actions";
import { addToBoard } from "../apis";
import { CellDataType } from '../apis/get'

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
    console.log(sideBar)


    return (
        <SideBlock open={sideBar}>
            {sideBar === "open" && <>
                <input type="number" value={x} onChange={(e): void => setX(e.target.value)} />
                <input type="number" value={y} onChange={(e): void => setY(e.target.value)} />
                <input type="number" value={data} onChange={(e) => setData(e.target.value)} />

                <button
                    onClick={() => {
                        addToBoard({
                            userName: "rami",
                            userColor: randomColor(),
                            x: parseInt(x),
                            y: parseInt(y),
                            cellData: { value: parseInt(data) },
                        });
                    }}
                >
                    add cell
             </button>

                <button onClick={() => dispatch(setSideBar("close"))}>X
            </button>
            </>}

            {sideBar === "close" &&
                <button onClick={() => dispatch(setSideBar("open"))}>X
            </button>}
        </SideBlock >
    );
}

const SideBlock = styled.div<SideBarProps>`
 position: absolute;
 top: 0;
 left:  ${({ open }) => open === "open" ? "0" : "-200px"};
 width: 250px;
 height: 100%; 
 text-align: right;
 background: ${({ open }) => open === "open" ? "rgba(104, 104, 104, 0.3)" : "rgba(0, 0, 0, 0)"}; 
 transition: all ease-in-out 0.3s;
`