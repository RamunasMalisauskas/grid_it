import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setClassName } from "../../state/actions";
import { StateType } from "../../types/types";
import { SupportButton, PrimaryButton } from "../";
import { usersDB, auth } from "../../firebase/firebase";

export const ClassMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { classNames } = useSelector((state: StateType) => state.canvaState);

  const handleGetClassNames = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      const { uid } = user;
      try {
        const snapshot = await usersDB.doc(uid).collection("classInfo").get();
        const nameArray = await snapshot.docs.map(
          (doc) => doc.data().class.name
        );
        dispatch(setClassName(nameArray));
      } catch (err) {
        console.log(err);
      }
    }
  }, [classNames]);

  const handleClassClick = (className: string) => {
    console.log("className ", className);
  };

  return (
    <ClassMenuBlock>
      <ControlBLock>
        <PrimaryButton onClick={handleGetClassNames}>Get Classes</PrimaryButton>
      </ControlBLock>
      {classNames &&
        classNames.map((className: string) => (
          <ControlBLock key={`btn_index_${className}`}>
            <SupportButton onClick={() => handleClassClick(className)}>
              {className}
            </SupportButton>
          </ControlBLock>
        ))}
    </ClassMenuBlock>
  );
};

const ClassMenuBlock = styled.div`
  z-index: 1;
  height: 100%;
  transition: all ease-in-out 0.3s;
`;
const ControlBLock = styled.div`
  width: 100%;
`;
