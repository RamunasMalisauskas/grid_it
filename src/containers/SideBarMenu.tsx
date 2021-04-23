import React, { useCallback } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../state/actions";
import { addToBoard } from "../apis";
import { BoardDataState } from '../types/types'
import { Input, PrimaryButton, SupportButton } from '../components'
import { usersDB, auth, timeStamp } from '../firebase/firebase'

interface SideBarProps {
    open: string
}

export const SideBar: React.FC = () => {
    const dispatch = useDispatch()
    const randomColor = require("randomcolor");
    const sideBar = useSelector((state: BoardDataState) => state.appData.sideBarState);
    const userName = useSelector((state: BoardDataState) => state.appData.name);

    const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        e.preventDefault()
        const user = auth.currentUser
        const { target: {
            number: { value: number },
            data: { value: data },
            info: { value: info }
        } } = e

        addToBoard({
            userName: userName,
            userColor: randomColor(),
            x: parseInt(number),
            y: parseInt(number),
            cellData: { value: parseInt(data), info: info },
        });

        if (user) {
            try {
                const { uid } = user
                const userDoc = usersDB.doc(uid)
                const userData = await userDoc.get()

                if (userData.exists) {
                    const data = userData.data()
                    console.log(data)
                    await userDoc.update({ userName: userName, lastVisit: timeStamp })
                } else {
                    await userDoc.set({ userID: uid, userName: userName, firstVisit: timeStamp, lastVisit: timeStamp })
                }
            }
            catch (e) {
                console.log(e)
            }
        }

    }, [userName, randomColor])

    return (
        <SideBlock open={sideBar}>
            <SideBarContainer>
                <SupportButton onClick={() => dispatch(setSideBar(sideBar === "close" ? "open" : "close"))}>
                    {sideBar === "close" ? "menu" : "x"}
                </SupportButton>

                {sideBar === "open" &&
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="number"
                            name="number"
                            placeholder="X"
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
                            placeholder="extra info"
                            label="enter aditional data"
                        />
                        <PrimaryButton type="submit">
                            add cell
                         </PrimaryButton>
                    </form>
                }
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